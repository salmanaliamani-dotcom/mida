import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { AssetState, Character, Project, Scene, StageName } from "@/lib/types";
import { emptyAsset } from "@/lib/types";
import { buildCharacterSheetPrompt, buildImagePrompt, buildMotionPrompt, dims } from "@/lib/style";
import { logLine, newId, readProject, updateProject } from "./store";
import { ensureDir, projectDir, projectFile } from "./paths";
import { getProviders } from "./settings";
import { generateScenes, generateStory } from "./providers/llm";
import { generateImage } from "./providers/image";
import { animateImage } from "./providers/video";
import { generateMusic, generateSfx, synthesizeSpeech } from "./providers/audio";
import {
  AudioPlacement,
  concatVideos,
  mixSoundtrack,
  muxFinal,
  normalizeClip,
  probeDuration,
  thumbnail,
} from "./ffmpeg";
import { buildAss } from "./subtitles";

export interface RunContext {
  projectId: string;
  /** Limit per-scene stages to these scenes */
  sceneIds?: string[];
  /** Limit the characters stage to these characters */
  characterIds?: string[];
  /** Regenerate even if the asset already exists */
  force: boolean;
  isCancelled: () => boolean;
}

export class CancelledError extends Error {
  constructor() {
    super("Cancelled");
  }
}

const now = () => new Date().toISOString();
const mediaRel = (name: string) => `media/${name}`;

function setStage(p: Project, stage: StageName, patch: Partial<Project["stages"][StageName]>) {
  p.stages[stage] = { ...p.stages[stage], ...patch };
}

async function progress(ctx: RunContext, stage: StageName, done: number, total: number, message?: string) {
  await updateProject(ctx.projectId, (p) => setStage(p, stage, { progress: total ? done / total : 1, message }));
}

function exists(p: Project, a: AssetState) {
  return a.status === "done" && !!a.file && fs.existsSync(projectFile(p.id, a.file));
}

/** Run fn over items with limited concurrency; collects errors instead of failing fast. */
async function pool<T>(items: T[], limit: number, ctx: RunContext, fn: (item: T) => Promise<void>) {
  const errors: string[] = [];
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      if (ctx.isCancelled()) throw new CancelledError();
      const item = items[next++];
      try {
        await fn(item);
      } catch (e) {
        if (e instanceof CancelledError) throw e;
        errors.push((e as Error).message);
      }
    }
  });
  await Promise.all(workers);
  return errors;
}

function load(ctx: RunContext): Project {
  const p = readProject(ctx.projectId);
  if (!p) throw new Error("Project not found");
  return p;
}

const pick = (p: Project, ctx: RunContext) => (ctx.sceneIds?.length ? p.scenes.filter((s) => ctx.sceneIds!.includes(s.id)) : p.scenes);

async function setSceneAsset(ctx: RunContext, sceneId: string, key: "image" | "video" | "voice" | "sfxAudio", asset: AssetState) {
  await updateProject(ctx.projectId, (p) => {
    const s = p.scenes.find((x) => x.id === sceneId);
    if (s) s[key] = { ...asset, updatedAt: now() };
  });
}

/** Mark downstream assets stale when an upstream one is regenerated. */
async function invalidateVideo(ctx: RunContext, sceneId: string) {
  await updateProject(ctx.projectId, (p) => {
    const s = p.scenes.find((x) => x.id === sceneId);
    if (s && s.video.status === "done") s.video = { ...s.video, status: "idle", error: "Image changed — regenerate animation" };
  });
}

// ------------------------------------------------------------------ stages

async function stageStory(ctx: RunContext) {
  const p = load(ctx);
  if (p.story?.script && !ctx.force) return;
  await progress(ctx, "story", 0, 1, "Writing story with Claude…");
  const story = await generateStory(p);
  await updateProject(ctx.projectId, (q) => {
    q.story = story;
    if (!q.name || q.name === "Untitled project") q.name = story.title;
  });
}

async function stageScenes(ctx: RunContext) {
  const p = load(ctx);
  if (p.scenes.length && !ctx.force) return;
  await progress(ctx, "scenes", 0, 1, "Planning scenes and characters…");
  const plan = await generateScenes(p);
  await updateProject(ctx.projectId, (q) => {
    // keep existing characters (and their reference images) when names match
    const byName = new Map(q.characters.map((c) => [c.name.toLowerCase(), c]));
    const characters: Character[] = plan.characters.map((c) => {
      const old = byName.get(c.name.toLowerCase());
      return old
        ? { ...old, appearance: c.appearance, role: c.role }
        : { id: newId("c_"), name: c.name, appearance: c.appearance, role: c.role, reference: emptyAsset() };
    });
    q.characters = characters;
    const idFor = (name: string) =>
      characters.find((c) => c.name.toLowerCase() === name.toLowerCase())?.id ??
      characters.find((c) => name.toLowerCase().includes(c.name.toLowerCase()))?.id;
    q.scenes = plan.scenes.map((s, i) => {
      const scene: Scene = {
        id: newId("s_"),
        index: i,
        title: s.title,
        narration: s.narration,
        visual: s.visual,
        camera: s.camera,
        mood: s.mood,
        motion: s.motion,
        sfx: s.sfx,
        characterIds: s.characters.map(idFor).filter((x): x is string => !!x),
        duration: Math.max(2, Math.min(15, s.duration || 5)),
        imagePrompt: "",
        motionPrompt: "",
        image: emptyAsset(),
        video: emptyAsset(),
        voice: emptyAsset(),
        sfxAudio: emptyAsset(),
      };
      scene.imagePrompt = buildImagePrompt(q, scene);
      scene.motionPrompt = buildMotionPrompt(scene);
      return scene;
    });
  });
}

async function stageCharacters(ctx: RunContext) {
  const p = load(ctx);
  const targets = p.characters.filter(
    (c) => (!ctx.characterIds?.length || ctx.characterIds.includes(c.id)) && (ctx.force || !exists(p, c.reference)),
  );
  let done = 0;
  await progress(ctx, "characters", 0, targets.length, targets.length ? "Generating character references…" : "Nothing to do");
  const errors = await pool(targets, 2, ctx, async (c) => {
    const rel = mediaRel(`char_${c.id}.png`);
    await updateProject(ctx.projectId, (q) => {
      const x = q.characters.find((y) => y.id === c.id);
      if (x) x.reference = { status: "running", updatedAt: now() };
    });
    try {
      const { provider } = await generateImage({
        prompt: buildCharacterSheetPrompt(c, p.settings.aspectRatio),
        aspect: p.settings.aspectRatio,
        references: [],
        output: projectFile(p.id, rel),
      });
      await updateProject(ctx.projectId, (q) => {
        const x = q.characters.find((y) => y.id === c.id);
        if (x) x.reference = { status: "done", file: rel, provider, updatedAt: now() };
      });
    } catch (e) {
      await updateProject(ctx.projectId, (q) => {
        const x = q.characters.find((y) => y.id === c.id);
        if (x) x.reference = { status: "error", error: (e as Error).message, updatedAt: now() };
      });
      throw new Error(`${c.name}: ${(e as Error).message}`);
    }
    await progress(ctx, "characters", ++done, targets.length, `${done}/${targets.length} characters`);
  });
  if (errors.length) throw new Error(errors.join("\n"));
}

async function stageImages(ctx: RunContext) {
  const p = load(ctx);
  const targets = pick(p, ctx).filter((s) => ctx.force || !exists(p, s.image));
  let done = 0;
  await progress(ctx, "images", 0, targets.length, targets.length ? "Generating scene images…" : "Nothing to do");
  const errors = await pool(targets, 2, ctx, async (s) => {
    const rel = mediaRel(`scene_${s.id}.png`);
    await setSceneAsset(ctx, s.id, "image", { status: "running" });
    try {
      const fresh = load(ctx);
      const scene = fresh.scenes.find((x) => x.id === s.id)!;
      const refs = fresh.characters
        .filter((c) => scene.characterIds.includes(c.id) && exists(fresh, c.reference))
        .map((c) => projectFile(fresh.id, c.reference.file!));
      const { provider } = await generateImage({
        prompt: scene.imagePrompt || buildImagePrompt(fresh, scene),
        aspect: fresh.settings.aspectRatio,
        references: refs,
        output: projectFile(fresh.id, rel),
      });
      await setSceneAsset(ctx, s.id, "image", { status: "done", file: rel, provider });
      await invalidateVideo(ctx, s.id);
    } catch (e) {
      await setSceneAsset(ctx, s.id, "image", { status: "error", error: (e as Error).message });
      throw new Error(`Scene ${s.index + 1}: ${(e as Error).message}`);
    }
    await progress(ctx, "images", ++done, targets.length, `${done}/${targets.length} images`);
  });
  if (errors.length) throw new Error(errors.join("\n"));
}

async function stageVideos(ctx: RunContext) {
  const p = load(ctx);
  const targets = pick(p, ctx).filter((s) => ctx.force || !exists(p, s.video));
  const missing = targets.filter((s) => !exists(p, s.image));
  if (missing.length) throw new Error(`Generate images first for scene(s): ${missing.map((s) => s.index + 1).join(", ")}`);
  let done = 0;
  await progress(ctx, "videos", 0, targets.length, targets.length ? "Animating scenes…" : "Nothing to do");
  const cfg = getProviders().video;
  const errors = await pool(targets, cfg.provider === "local-motion" ? 2 : 3, ctx, async (s) => {
    const rel = mediaRel(`scene_${s.id}.mp4`);
    await setSceneAsset(ctx, s.id, "video", { status: "running" });
    try {
      const fresh = load(ctx);
      const scene = fresh.scenes.find((x) => x.id === s.id)!;
      const out = projectFile(fresh.id, rel);
      const { provider } = await animateImage({
        image: projectFile(fresh.id, scene.image.file!),
        prompt: scene.motionPrompt || buildMotionPrompt(scene),
        aspect: fresh.settings.aspectRatio,
        fps: fresh.settings.fps,
        seconds: Math.max(scene.duration, scene.voice.duration ? scene.voice.duration + 0.6 : 0, 3),
        variant: scene.index,
        output: out,
        onProgress: (m) => void progress(ctx, "videos", done, targets.length, `Scene ${scene.index + 1}: ${m}`),
      });
      await setSceneAsset(ctx, s.id, "video", { status: "done", file: rel, provider, duration: await probeDuration(out) });
    } catch (e) {
      await setSceneAsset(ctx, s.id, "video", { status: "error", error: (e as Error).message });
      throw new Error(`Scene ${s.index + 1}: ${(e as Error).message}`);
    }
    await progress(ctx, "videos", ++done, targets.length, `${done}/${targets.length} clips`);
  });
  if (errors.length) throw new Error(errors.join("\n"));
}

async function stageVoice(ctx: RunContext) {
  const p = load(ctx);
  const targets = pick(p, ctx).filter((s) => s.narration.trim() && (ctx.force || !exists(p, s.voice)));
  let done = 0;
  await progress(ctx, "voice", 0, targets.length, targets.length ? "Recording voiceover…" : "Nothing to do");
  const errors = await pool(targets, 3, ctx, async (s) => {
    const rel = mediaRel(`voice_${s.id}.wav`);
    await setSceneAsset(ctx, s.id, "voice", { status: "running" });
    try {
      const fresh = load(ctx).scenes.find((x) => x.id === s.id)!;
      const out = projectFile(ctx.projectId, rel);
      const { provider } = await synthesizeSpeech(fresh.narration, out);
      await setSceneAsset(ctx, s.id, "voice", { status: "done", file: rel, provider, duration: await probeDuration(out) });
    } catch (e) {
      await setSceneAsset(ctx, s.id, "voice", { status: "error", error: (e as Error).message });
      throw new Error(`Scene ${s.index + 1}: ${(e as Error).message}`);
    }
    await progress(ctx, "voice", ++done, targets.length, `${done}/${targets.length} lines`);
  });
  if (errors.length) throw new Error(errors.join("\n"));
}

async function stageMusic(ctx: RunContext) {
  const p = load(ctx);
  const cfg = getProviders();
  const errors: string[] = [];
  const total = Math.max(5, sceneTimeline(p).total);

  if (cfg.music.provider === "none" || cfg.music.provider === "upload") {
    await progress(ctx, "music", 0, 1, cfg.music.provider === "none" ? "Music disabled" : "Using uploaded music");
  } else if (ctx.force || !exists(p, p.music)) {
    await progress(ctx, "music", 0, 1, "Composing background music…");
    const rel = mediaRel("music.wav");
    await updateProject(ctx.projectId, (q) => void (q.music = { status: "running", updatedAt: now() }));
    try {
      const { provider } = await generateMusic(p.settings.musicPrompt, total, projectFile(p.id, rel));
      const d = await probeDuration(projectFile(p.id, rel));
      await updateProject(ctx.projectId, (q) => void (q.music = { status: "done", file: rel, provider, duration: d, updatedAt: now() }));
    } catch (e) {
      await updateProject(ctx.projectId, (q) => void (q.music = { status: "error", error: (e as Error).message, updatedAt: now() }));
      errors.push(`Music: ${(e as Error).message}`);
    }
  }

  if (p.settings.sfxEnabled && cfg.sfx.provider !== "none") {
    const targets = pick(p, ctx).filter((s) => s.sfx.trim() && (ctx.force || !exists(p, s.sfxAudio)));
    let done = 0;
    errors.push(
      ...(await pool(targets, 3, ctx, async (s) => {
        const rel = mediaRel(`sfx_${s.id}.wav`);
        await setSceneAsset(ctx, s.id, "sfxAudio", { status: "running" });
        try {
          const len = Math.max(s.duration, s.voice.duration ?? 0);
          const { provider } = await generateSfx(s.sfx, len, projectFile(p.id, rel));
          await setSceneAsset(ctx, s.id, "sfxAudio", { status: "done", file: rel, provider });
        } catch (e) {
          await setSceneAsset(ctx, s.id, "sfxAudio", { status: "error", error: (e as Error).message });
          throw new Error(`SFX scene ${s.index + 1}: ${(e as Error).message}`);
        }
        await progress(ctx, "music", ++done, targets.length, `${done}/${targets.length} sound effects`);
      })),
    );
  }
  if (errors.length) throw new Error(errors.join("\n"));
}

/** Scene start times and lengths. Narration drives timing when it exists. */
export function sceneTimeline(p: Project) {
  let t = 0;
  const items = p.scenes.map((s) => {
    const len = Math.max(2.5, s.voice.status === "done" && s.voice.duration ? s.voice.duration + 0.6 : s.duration);
    const item = { scene: s, start: t, length: len };
    t += len;
    return item;
  });
  return { items, total: t };
}

async function stageRender(ctx: RunContext) {
  const p = load(ctx);
  if (!p.scenes.length) throw new Error("No scenes to render.");
  const noVisual = p.scenes.filter((s) => !exists(p, s.video) && !exists(p, s.image));
  if (noVisual.length) throw new Error(`Scene(s) ${noVisual.map((s) => s.index + 1).join(", ")} have no image or animation yet.`);
  const stills = p.scenes.filter((s) => !exists(p, s.video));
  const { width, height } = dims(p.settings.aspectRatio);
  const fps = p.settings.fps;
  const work = ensureDir(path.join(projectDir(p.id), "render"));
  const { items, total } = sceneTimeline(p);
  const steps = items.length + 3;
  let step = 0;

  await progress(ctx, "render", 0, steps, stills.length ? `Note: ${stills.length} scene(s) use the still image (not animated)` : "Preparing clips…");
  const clips: string[] = [];
  for (const it of items) {
    if (ctx.isCancelled()) throw new CancelledError();
    const out = path.join(work, `clip_${String(it.scene.index).padStart(3, "0")}.mp4`);
    const hasVideo = exists(p, it.scene.video);
    await normalizeClip(projectFile(p.id, (hasVideo ? it.scene.video.file : it.scene.image.file)!), out, {
      width,
      height,
      fps,
      seconds: Number(it.length.toFixed(3)),
      fade: p.settings.transitionSeconds,
      isImage: !hasVideo,
    });
    clips.push(out);
    await progress(ctx, "render", ++step, steps, `Prepared clip ${it.scene.index + 1}/${items.length}`);
  }

  const video = path.join(work, "video.mp4");
  await concatVideos(clips, video, work);
  await progress(ctx, "render", ++step, steps, "Mixing soundtrack…");

  const voices: AudioPlacement[] = items
    .filter((it) => exists(p, it.scene.voice))
    .map((it) => ({ file: projectFile(p.id, it.scene.voice.file!), start: it.start + 0.25 }));
  const sfx: AudioPlacement[] = p.settings.sfxEnabled
    ? items.filter((it) => exists(p, it.scene.sfxAudio)).map((it) => ({ file: projectFile(p.id, it.scene.sfxAudio.file!), start: it.start, volume: 0.35 }))
    : [];
  const music = exists(p, p.music) ? { file: projectFile(p.id, p.music.file!), volume: p.settings.musicVolume } : undefined;
  const audio = path.join(work, "audio.wav");
  await mixSoundtrack(audio, { duration: Number(total.toFixed(3)), voices, sfx, music });
  await progress(ctx, "render", ++step, steps, "Encoding final video…");

  let subs: string | undefined;
  if (p.settings.subtitles && items.some((it) => it.scene.narration.trim())) {
    subs = path.join(work, "captions.ass");
    fs.writeFileSync(
      subs,
      buildAss(
        items.map((it) => ({
          start: it.start + 0.25,
          voiceDuration: it.scene.voice.duration ?? Math.max(1, it.length - 0.6),
          narration: it.scene.narration,
        })),
        { width, height, rtl: p.settings.language === "ar" },
      ),
    );
  }
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const rel = mediaRel(`final_${stamp}.mp4`);
  const finalPath = projectFile(p.id, rel);
  await muxFinal(video, audio, finalPath, { subtitles: subs, fontsDir: path.join(process.cwd(), "assets", "fonts") });
  await thumbnail(finalPath, projectFile(p.id, mediaRel("final_thumb.jpg")), Math.min(1.5, total / 2));
  const duration = await probeDuration(finalPath);
  await updateProject(ctx.projectId, (q) => {
    if (q.final.file && q.final.file !== rel) fs.rmSync(projectFile(q.id, q.final.file), { force: true });
    q.final = { status: "done", file: rel, provider: "ffmpeg", duration, updatedAt: now() };
  });
  await progress(ctx, "render", steps, steps, `Rendered ${duration.toFixed(1)}s`);
}

const STAGES: Record<StageName, (ctx: RunContext) => Promise<void>> = {
  story: stageStory,
  scenes: stageScenes,
  characters: stageCharacters,
  images: stageImages,
  videos: stageVideos,
  voice: stageVoice,
  music: stageMusic,
  render: stageRender,
};

export async function runStage(stage: StageName, ctx: RunContext) {
  await updateProject(ctx.projectId, (p) => {
    setStage(p, stage, { status: "running", progress: 0, error: undefined, message: "Starting…", startedAt: now(), finishedAt: undefined });
    logLine(p, "info", `▶ ${stage} started`);
  });
  try {
    await STAGES[stage](ctx);
    await updateProject(ctx.projectId, (p) => {
      setStage(p, stage, { status: "done", progress: 1, finishedAt: now() });
      logLine(p, "info", `✓ ${stage} finished`);
    });
  } catch (e) {
    const cancelled = e instanceof CancelledError;
    await updateProject(ctx.projectId, (p) => {
      setStage(p, stage, { status: cancelled ? "idle" : "error", error: cancelled ? undefined : (e as Error).message, message: cancelled ? "Cancelled" : undefined, finishedAt: now() });
      logLine(p, cancelled ? "info" : "error", cancelled ? `■ ${stage} cancelled` : `✗ ${stage}: ${(e as Error).message}`);
    });
    throw e;
  }
}
