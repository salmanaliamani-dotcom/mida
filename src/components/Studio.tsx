"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { api, MediaBox, mediaUrl, Progress, StatusPill, useToast } from "@/components/ui";
import {
  STAGE_LABELS,
  STAGE_ORDER,
  type Character,
  type Project,
  type ProjectSettings,
  type PublicSettings,
  type Scene,
  type StageName,
} from "@/lib/types";

type P = Project & { running: boolean };
type RunOpts = { sceneIds?: string[]; characterIds?: string[]; force?: boolean };

interface Ctx {
  p: P;
  settings?: PublicSettings;
  run: (stages: StageName[] | "all", opts?: RunOpts) => Promise<void>;
  patch: (b: Record<string, unknown>) => Promise<void>;
  upload: (kind: string, targetId: string, file: File) => Promise<void>;
  saveScene: (id: string, edit: Partial<Scene>) => Promise<void>;
}

const TABS = ["Pipeline", "Story", "Characters", "Scenes", "Images", "Animation", "Voice", "Audio", "Preview", "Export"] as const;
type Tab = (typeof TABS)[number];

export function Studio({ id }: { id: string }) {
  const [p, setP] = useState<P>();
  const [settings, setSettings] = useState<PublicSettings>();
  const [tab, setTab] = useState<Tab>("Pipeline");
  const [notFound, setNotFound] = useState(false);
  const { show, node } = useToast();

  const load = useCallback(async () => {
    try {
      setP(await api<P>(`/api/projects/${id}`));
    } catch (e) {
      if (/not found/i.test((e as Error).message)) setNotFound(true);
    }
  }, [id]);

  useEffect(() => {
    load();
    api<PublicSettings>("/api/settings").then(setSettings).catch(() => undefined);
  }, [load]);

  // poll quickly while a job runs, slowly otherwise
  useEffect(() => {
    const t = setInterval(load, p?.running ? 1500 : 6000);
    return () => clearInterval(t);
  }, [load, p?.running]);

  const run = useCallback(
    async (stages: StageName[] | "all", opts: RunOpts = {}) => {
      try {
        await api(`/api/projects/${id}/run`, { method: "POST", json: { stages, ...opts } });
        show("Started");
        await load();
      } catch (e) {
        show((e as Error).message, true);
      }
    },
    [id, load, show],
  );

  const patch = useCallback(
    async (b: Record<string, unknown>) => {
      try {
        setP(await api<P>(`/api/projects/${id}`, { method: "PATCH", json: b }));
      } catch (e) {
        show((e as Error).message, true);
      }
    },
    [id, show],
  );

  const saveScene = useCallback(
    async (sceneId: string, edit: Partial<Scene>) => {
      if (!p) return;
      await patch({ scenes: p.scenes.map((s) => (s.id === sceneId ? { ...edit, id: s.id } : { id: s.id })) });
    },
    [p, patch],
  );

  const upload = useCallback(
    async (kind: string, targetId: string, file: File) => {
      const form = new FormData();
      form.append("kind", kind);
      form.append("targetId", targetId);
      form.append("file", file);
      try {
        await api(`/api/projects/${id}/upload`, { method: "POST", body: form });
        show("Uploaded");
        await load();
      } catch (e) {
        show((e as Error).message, true);
      }
    },
    [id, load, show],
  );

  if (notFound) return <div className="card">Project not found. <Link href="/" className="btn sm">Back</Link></div>;
  if (!p) return <p className="muted">Loading project…</p>;
  const ctx: Ctx = { p, settings, run, patch, upload, saveScene };

  return (
    <>
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <div className="small dim"><Link href="/">Dashboard</Link> / project</div>
          <h1 dir="auto">{p.name}</h1>
          <p dir="auto">{p.story?.logline || p.idea}</p>
        </div>
        <div className="row">
          {p.running ? (
            <button className="btn danger" onClick={() => api(`/api/projects/${id}/cancel`, { method: "POST" }).then(load)}>■ Stop</button>
          ) : (
            <button className="btn primary" onClick={() => run("all")}>✦ Generate everything</button>
          )}
        </div>
      </div>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {tab === "Pipeline" && <PipelineTab {...ctx} go={setTab} />}
      {tab === "Story" && <StoryTab {...ctx} />}
      {tab === "Characters" && <CharactersTab {...ctx} />}
      {tab === "Scenes" && <ScenesTab {...ctx} />}
      {tab === "Images" && <AssetTab {...ctx} kind="image" />}
      {tab === "Animation" && <AssetTab {...ctx} kind="video" />}
      {tab === "Voice" && <VoiceTab {...ctx} />}
      {tab === "Audio" && <AudioTab {...ctx} />}
      {tab === "Preview" && <PreviewTab {...ctx} />}
      {tab === "Export" && <ExportTab {...ctx} />}
      {node}
    </>
  );
}

// ---------------------------------------------------------------- Pipeline

const STAGE_TAB: Record<StageName, Tab> = {
  story: "Story", scenes: "Scenes", characters: "Characters", images: "Images", voice: "Voice", videos: "Animation", music: "Audio", render: "Preview",
};

function missingKeys(settings: PublicSettings | undefined) {
  if (!settings) return [];
  const pr = settings.providers;
  const need = new Set<string>(["ANTHROPIC_API_KEY"]);
  if (pr.image.provider === "fal") need.add("FAL_KEY"); else need.add("OPENAI_API_KEY");
  if (pr.video.provider === "fal") need.add("FAL_KEY");
  need.add({ elevenlabs: "ELEVENLABS_API_KEY", openai: "OPENAI_API_KEY", gemini: "GEMINI_API_KEY" }[pr.tts.provider]);
  if (pr.music.provider === "fal") need.add("FAL_KEY");
  if (pr.music.provider === "elevenlabs" || pr.sfx.provider === "elevenlabs") need.add("ELEVENLABS_API_KEY");
  return [...need].filter((k) => !settings.secrets[k as keyof PublicSettings["secrets"]]?.configured);
}

function PipelineTab({ p, run, settings, go }: Ctx & { go: (t: Tab) => void }) {
  const missing = missingKeys(settings);
  return (
    <>
      {missing.length > 0 && (
        <div className="notice" style={{ marginBottom: 16 }}>
          Missing API keys for the selected providers: <b>{missing.join(", ")}</b>. Stages that need them will stop with an error. <Link href="/settings" style={{ textDecoration: "underline" }}>Open Settings</Link>
        </div>
      )}
      {settings?.providers.video.provider === "local-motion" && (
        <div className="notice info" style={{ marginBottom: 16 }}>Animation is set to <b>local camera motion</b> (FFmpeg push-ins, pans and glow — not AI). Choose fal.ai image-to-video in Settings for AI animation.</div>
      )}
      <div className="pipeline">
        {STAGE_ORDER.map((s, i) => {
          const st = p.stages[s];
          return (
            <div key={s} className={`stage ${st.status}`}>
              <div className="row">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="spacer" />
                <StatusPill status={st.status} label={st.status === "idle" ? "Waiting" : undefined} />
              </div>
              <h3>{STAGE_LABELS[s]}</h3>
              <Progress value={st.status === "done" ? 1 : st.progress} />
              <div className="small muted" style={{ minHeight: 18 }}>{st.status === "error" ? <span className="err-text">{st.error}</span> : st.message}</div>
              <div className="row" style={{ marginTop: "auto" }}>
                <button className="btn sm" disabled={p.running} onClick={() => run([s])}>Run</button>
                <button className="btn sm ghost" disabled={p.running} onClick={() => run([s], { force: true })} title="Regenerate everything in this stage">Redo all</button>
                <span className="spacer" />
                <button className="btn sm ghost" onClick={() => go(STAGE_TAB[s])}>Open →</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-head">
          <h2>Activity</h2>
          <button className="btn sm" disabled={p.running} onClick={() => run(STAGE_ORDER.filter((s) => p.stages[s].status !== "done"))}>Resume unfinished stages</button>
        </div>
        <div className="log">
          {p.log.length === 0 && <div className="dim">No activity yet.</div>}
          {[...p.log].reverse().map((l, i) => (
            <div key={i} className={l.level}>{new Date(l.at).toLocaleTimeString()}  {l.message}</div>
          ))}
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------- Story

function StoryTab({ p, run, patch }: Ctx) {
  const [idea, setIdea] = useState(p.idea);
  const [title, setTitle] = useState(p.story?.title ?? "");
  const [script, setScript] = useState(p.story?.script ?? "");
  const [s, setS] = useState<ProjectSettings>(p.settings);
  const stamp = useRef(p.story?.script);
  useEffect(() => {
    if (p.story?.script !== stamp.current) {
      stamp.current = p.story?.script;
      setTitle(p.story?.title ?? "");
      setScript(p.story?.script ?? "");
    }
  }, [p.story]);
  const rtl = p.settings.language === "ar";
  const words = script.trim() ? script.trim().split(/\s+/).length : 0;
  const busy = p.running;

  return (
    <div className="grid grid-2">
      <div className="card stack">
        <div className="card-head"><h2>Story generator</h2><StatusPill status={p.stages.story.status} /></div>
        <label className="field">Idea<textarea dir="auto" rows={4} value={idea} onChange={(e) => setIdea(e.target.value)} /></label>
        <div className="grid grid-2">
          <label className="field">Duration: {s.targetDuration}s<input type="range" min={10} max={600} step={5} value={s.targetDuration} onChange={(e) => setS({ ...s, targetDuration: Number(e.target.value) })} /></label>
          <label className="field">Language
            <select value={s.language} onChange={(e) => setS({ ...s, language: e.target.value as ProjectSettings["language"] })}>
              <option value="ar">Arabic</option><option value="en">English</option>
            </select>
          </label>
        </div>
        <label className="field">Dialect / accent<input dir="auto" value={s.dialect} onChange={(e) => setS({ ...s, dialect: e.target.value })} /></label>
        <div className="row">
          <button className="btn" disabled={busy} onClick={() => patch({ idea, settings: s })}>Save</button>
          <button className="btn primary" disabled={busy} onClick={async () => { await patch({ idea, settings: s }); await run(["story"], { force: true }); }}>
            {p.story ? "Rewrite story with AI" : "Write story with AI"}
          </button>
        </div>
        {p.stages.story.error && <div className="err-text">{p.stages.story.error}</div>}
        <p className="small dim">Claude writes narration in your dialect, with numbers spelled out for TTS. You can also write or paste your own script on the right.</p>
      </div>
      <div className="card stack">
        <div className="card-head"><h2>Script</h2><span className="small dim">{words} words · ≈{Math.round((words / 130) * 60)}s spoken</span></div>
        <label className="field">Title<input dir="auto" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
        <label className="field">Narration
          <textarea className={rtl ? "rtl" : ""} rows={16} value={script} onChange={(e) => setScript(e.target.value)} placeholder="One sentence per line. Optional emotion cues like [whispering] or [scared] are understood by ElevenLabs v3 and Gemini." />
        </label>
        <div className="row">
          <button className="btn" disabled={busy} onClick={() => patch({ story: { title, logline: p.story?.logline ?? "", script } })}>Save script</button>
          <button className="btn primary" disabled={busy || !script.trim()} onClick={async () => { await patch({ story: { title, logline: p.story?.logline ?? "", script } }); await run(["scenes"], { force: true }); }}>
            Split into scenes →
          </button>
        </div>
        {p.scenes.length > 0 && <p className="small dim">Splitting again replaces the current {p.scenes.length} scenes (character references are kept by name).</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Characters

function CharactersTab({ p, run, patch, upload }: Ctx) {
  const [list, setList] = useState<Character[]>(p.characters);
  const key = p.characters.map((c) => c.id + c.reference.updatedAt + c.name).join();
  useEffect(() => setList(p.characters), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const save = (next = list) => patch({ characters: next.map(({ id, name, appearance, role }) => ({ id, name, appearance, role })), rebuildPrompts: true });

  return (
    <>
      <div className="card-head">
        <p className="muted">Each character&apos;s appearance text is inserted verbatim into every scene prompt, and its reference image is passed to reference-capable image models — this is what keeps characters consistent.</p>
        <div className="row">
          <button className="btn" onClick={() => { const next = [...list, { id: "", name: "New character", appearance: "tall black silhouette with glowing white eyes, long coat outline", role: "", reference: { status: "idle" as const } }]; setList(next); save(next); }}>+ Add character</button>
          <button className="btn primary" disabled={p.running || !list.length} onClick={() => run(["characters"])}>Generate missing references</button>
        </div>
      </div>
      {!list.length && <div className="card muted">Characters are created when the story is split into scenes. You can also add them manually.</div>}
      <div className="grid grid-auto" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {list.map((c, i) => (
          <div key={c.id || i} className="card stack">
            <MediaBox projectId={p.id} asset={c.reference} kind="image" aspect={p.settings.aspectRatio} empty="No reference image" />
            <div className="row"><StatusPill status={c.reference.status} />{c.reference.provider && <span className="small dim">{c.reference.provider}</span>}</div>
            {c.reference.error && <div className="err-text">{c.reference.error}</div>}
            <label className="field">Name<input dir="auto" value={c.name} onChange={(e) => setList(list.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} onBlur={() => save()} /></label>
            <label className="field">Canonical appearance (English)<textarea rows={3} value={c.appearance} onChange={(e) => setList(list.map((x, j) => (j === i ? { ...x, appearance: e.target.value } : x)))} onBlur={() => save()} /></label>
            <label className="field">Role<input value={c.role} onChange={(e) => setList(list.map((x, j) => (j === i ? { ...x, role: e.target.value } : x)))} onBlur={() => save()} /></label>
            <div className="row">
              <button className="btn sm" disabled={p.running || !c.id} onClick={() => run(["characters"], { characterIds: [c.id], force: true })}>{c.reference.status === "done" ? "Regenerate" : "Generate"}</button>
              <label className="btn sm ghost">Upload<input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && c.id && upload("character", c.id, e.target.files[0])} /></label>
              <span className="spacer" />
              <button className="btn sm ghost" onClick={() => { const next = list.filter((_, j) => j !== i); setList(next); save(next); }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- Scenes

function ScenesTab({ p, patch, run }: Ctx) {
  return (
    <>
      <div className="card-head">
        <p className="muted">Edit narration, visuals and camera per scene. Prompts are rebuilt by the Neon Shadow style engine, or edit them directly.</p>
        <div className="row">
          <button className="btn" onClick={() => patch({ scenes: [...p.scenes.map((s) => ({ id: s.id })), {}] })}>+ Add scene</button>
          <button className="btn" onClick={() => patch({ rebuildPrompts: true })}>Rebuild all prompts</button>
          <button className="btn primary" disabled={p.running || !p.scenes.length} onClick={() => run(["images", "voice", "videos"])}>Generate missing media</button>
        </div>
      </div>
      {!p.scenes.length && <div className="card muted">No scenes yet — write a story, then “Split into scenes”.</div>}
      <div className="stack" style={{ gap: 16 }}>
        {p.scenes.map((s) => <SceneEditor key={s.id} scene={s} p={p} patch={patch} />)}
      </div>
    </>
  );
}

function SceneEditor({ scene, p, patch }: { scene: Scene; p: P; patch: Ctx["patch"] }) {
  const [d, setD] = useState(scene);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (!dirty) setD(scene);
  }, [scene, dirty]);
  const f = <K extends keyof Scene>(k: K, v: Scene[K]) => {
    setD({ ...d, [k]: v });
    setDirty(true);
  };
  const save = async (rebuild: boolean) => {
    const { title, narration, visual, camera, mood, motion, sfx, characterIds, duration, imagePrompt, motionPrompt } = d;
    await patch({
      scenes: p.scenes.map((s) => (s.id === scene.id ? { id: s.id, title, narration, visual, camera, mood, motion, sfx, characterIds, duration, imagePrompt, motionPrompt } : { id: s.id })),
      ...(rebuild ? { rebuildPrompts: [scene.id] } : {}),
    });
    setDirty(false);
  };
  const move = (dir: -1 | 1) => {
    const ids = p.scenes.map((s) => s.id);
    const i = ids.indexOf(scene.id);
    const j = i + dir;
    if (j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    patch({ scenes: ids.map((id) => ({ id })) });
  };
  return (
    <div className="card">
      <div className="scene-card">
        <div className="stack">
          <span className="scene-index">SCENE {String(scene.index + 1).padStart(2, "0")}</span>
          <MediaBox projectId={p.id} asset={scene.video.status === "done" ? scene.video : scene.image} kind={scene.video.status === "done" ? "video" : "image"} aspect={p.settings.aspectRatio} />
          <div className="row">
            <button className="btn sm ghost" onClick={() => move(-1)} title="Move up">↑</button>
            <button className="btn sm ghost" onClick={() => move(1)} title="Move down">↓</button>
            <button className="btn sm ghost" onClick={() => confirm("Delete this scene?") && patch({ scenes: p.scenes.filter((s) => s.id !== scene.id).map((s) => ({ id: s.id })) })}>Delete</button>
          </div>
        </div>
        <div className="stack">
          <div className="grid grid-3">
            <label className="field">Title<input value={d.title} onChange={(e) => f("title", e.target.value)} /></label>
            <label className="field">Duration (s, voice overrides)<input type="number" min={1} max={30} step={0.5} value={d.duration} onChange={(e) => f("duration", Number(e.target.value))} /></label>
            <label className="field">Characters
              <select multiple value={d.characterIds} onChange={(e) => f("characterIds", Array.from(e.target.selectedOptions).map((o) => o.value))} style={{ height: 58 }}>
                {p.characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
          </div>
          <label className="field">Narration<textarea className={p.settings.language === "ar" ? "rtl" : ""} rows={3} value={d.narration} onChange={(e) => f("narration", e.target.value)} /></label>
          <div className="grid grid-2">
            <label className="field">Visual<textarea rows={3} value={d.visual} onChange={(e) => f("visual", e.target.value)} /></label>
            <label className="field">Motion<textarea rows={3} value={d.motion} onChange={(e) => f("motion", e.target.value)} /></label>
            <label className="field">Camera<input value={d.camera} onChange={(e) => f("camera", e.target.value)} /></label>
            <label className="field">Lighting &amp; mood<input value={d.mood} onChange={(e) => f("mood", e.target.value)} /></label>
            <label className="field">Sound effects<input value={d.sfx} onChange={(e) => f("sfx", e.target.value)} /></label>
          </div>
          <details>
            <summary className="small muted" style={{ cursor: "pointer" }}>Final prompts (sent to the image and video models)</summary>
            <div className="grid grid-2" style={{ marginTop: 10 }}>
              <label className="field">Image prompt<textarea rows={6} value={d.imagePrompt} onChange={(e) => f("imagePrompt", e.target.value)} /></label>
              <label className="field">Motion prompt<textarea rows={6} value={d.motionPrompt} onChange={(e) => f("motionPrompt", e.target.value)} /></label>
            </div>
          </details>
          <div className="row">
            <button className="btn sm" disabled={!dirty} onClick={() => save(false)}>Save</button>
            <button className="btn sm primary" disabled={!dirty} onClick={() => save(true)}>Save &amp; rebuild prompts</button>
            {dirty && <span className="small" style={{ color: "var(--warn)" }}>Unsaved changes</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Images / Animation

function AssetTab({ p, run, upload, settings, kind }: Ctx & { kind: "image" | "video" }) {
  const stage: StageName = kind === "image" ? "images" : "videos";
  const st = p.stages[stage];
  return (
    <>
      <div className="card-head">
        <div className="stack" style={{ gap: 4 }}>
          <p className="muted">
            {kind === "image"
              ? `Provider: ${settings?.providers.image.provider ?? "…"} — scenes with characters use their reference images for consistency.`
              : `Provider: ${settings?.providers.video.provider === "local-motion" ? "local camera motion (not AI)" : `fal.ai ${settings?.providers.video.falModel ?? ""}`}. Each clip animates the scene image.`}
          </p>
          {st.status === "running" && <div style={{ width: 320 }}><Progress value={st.progress} /><span className="small muted">{st.message}</span></div>}
          {st.status === "error" && <div className="err-text">{st.error}</div>}
        </div>
        <div className="row">
          <button className="btn primary" disabled={p.running || !p.scenes.length} onClick={() => run([stage])}>Generate missing</button>
          <button className="btn" disabled={p.running || !p.scenes.length} onClick={() => confirm(`Regenerate all ${p.scenes.length} ${kind === "image" ? "images" : "clips"}?`) && run([stage], { force: true })}>Regenerate all</button>
        </div>
      </div>
      <div className="grid grid-auto">
        {p.scenes.map((s) => {
          const asset = kind === "image" ? s.image : s.video;
          return (
            <div key={s.id} className="card stack">
              <div className="row"><span className="scene-index">SCENE {String(s.index + 1).padStart(2, "0")}</span><span className="spacer" /><StatusPill status={asset.status} /></div>
              <MediaBox projectId={p.id} asset={asset} kind={kind} aspect={p.settings.aspectRatio} />
              {asset.error && <div className={asset.status === "error" ? "err-text" : "small"} style={asset.status !== "error" ? { color: "var(--warn)" } : undefined}>{asset.error}</div>}
              {asset.provider && <span className="small dim">{asset.provider}</span>}
              <div className="row">
                <button className="btn sm" disabled={p.running} onClick={() => run([stage], { sceneIds: [s.id], force: true })}>{asset.status === "done" ? "Regenerate" : "Generate"}</button>
                <label className="btn sm ghost">Upload<input type="file" accept={kind === "image" ? "image/*" : "video/*"} hidden onChange={(e) => e.target.files?.[0] && upload(kind === "image" ? "scene-image" : "scene-video", s.id, e.target.files[0])} /></label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- Voice

function VoiceTab({ p, run, settings }: Ctx) {
  const st = p.stages.voice;
  return (
    <>
      <div className="card-head">
        <div className="stack" style={{ gap: 4 }}>
          <p className="muted">Provider: {settings?.providers.tts.provider ?? "…"}. Each scene&apos;s narration becomes one voice clip; scene length follows the voice.</p>
          {st.status === "error" && <div className="err-text">{st.error}</div>}
        </div>
        <div className="row">
          <button className="btn primary" disabled={p.running || !p.scenes.length} onClick={() => run(["voice"])}>Generate missing</button>
          <button className="btn" disabled={p.running || !p.scenes.length} onClick={() => run(["voice"], { force: true })}>Regenerate all</button>
        </div>
      </div>
      <div className="stack">
        {p.scenes.map((s) => (
          <div key={s.id} className="card">
            <div className="row" style={{ alignItems: "flex-start" }}>
              <span className="scene-index" style={{ width: 80 }}>SCENE {String(s.index + 1).padStart(2, "0")}</span>
              <p className={p.settings.language === "ar" ? "rtl" : ""} style={{ flex: 1, whiteSpace: "pre-wrap" }}>{s.narration || <span className="dim">(no narration)</span>}</p>
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <StatusPill status={s.voice.status} />
              {s.voice.duration ? <span className="small dim">{s.voice.duration.toFixed(1)}s</span> : null}
              {s.voice.status === "done" && <audio controls src={mediaUrl(p.id, s.voice)} style={{ height: 32 }} />}
              <span className="spacer" />
              <button className="btn sm" disabled={p.running || !s.narration.trim()} onClick={() => run(["voice"], { sceneIds: [s.id], force: true })}>{s.voice.status === "done" ? "Regenerate" : "Generate"}</button>
            </div>
            {s.voice.error && <div className={s.voice.status === "error" ? "err-text" : "small"} style={{ marginTop: 6 }}>{s.voice.error}</div>}
          </div>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- Audio

function AudioTab({ p, run, patch, upload, settings }: Ctx) {
  const [s, setS] = useState(p.settings);
  const prov = settings?.providers.music.provider;
  return (
    <div className="grid grid-2">
      <div className="card stack">
        <div className="card-head"><h2>Background music</h2><StatusPill status={p.music.status} /></div>
        <p className="small muted">Provider: {prov ?? "…"} (change in Settings). Music is looped under the video and ducked automatically while the narrator speaks.</p>
        <label className="field">Music prompt<textarea rows={3} value={s.musicPrompt} onChange={(e) => setS({ ...s, musicPrompt: e.target.value })} /></label>
        <label className="field">Music volume: {Math.round(s.musicVolume * 100)}%<input type="range" min={0} max={0.6} step={0.01} value={s.musicVolume} onChange={(e) => setS({ ...s, musicVolume: Number(e.target.value) })} /></label>
        {p.music.status === "done" && <audio controls src={mediaUrl(p.id, p.music)} />}
        {p.music.error && <div className="err-text">{p.music.error}</div>}
        <div className="row">
          <button className="btn" onClick={() => patch({ settings: s })}>Save</button>
          <button className="btn primary" disabled={p.running || prov === "none" || prov === "upload"} onClick={async () => { await patch({ settings: s }); await run(["music"], { force: true }); }}>Generate music</button>
          <label className="btn">Upload track<input type="file" accept="audio/*" hidden onChange={(e) => e.target.files?.[0] && upload("music", "", e.target.files[0])} /></label>
        </div>
      </div>
      <div className="card stack">
        <div className="card-head"><h2>Sound effects &amp; mix</h2></div>
        <label className="row"><input type="checkbox" checked={s.sfxEnabled} onChange={(e) => setS({ ...s, sfxEnabled: e.target.checked })} /> Generate a sound effect bed per scene ({settings?.providers.sfx.provider === "none" ? "provider not set" : "ElevenLabs"})</label>
        <label className="row"><input type="checkbox" checked={s.subtitles} onChange={(e) => setS({ ...s, subtitles: e.target.checked })} /> Burn-in subtitles</label>
        <label className="field">Transition (fade) between scenes: {s.transitionSeconds}s<input type="range" min={0} max={1.2} step={0.05} value={s.transitionSeconds} onChange={(e) => setS({ ...s, transitionSeconds: Number(e.target.value) })} /></label>
        <div className="row">
          <button className="btn" onClick={() => patch({ settings: s })}>Save</button>
          <button className="btn primary" disabled={p.running || !s.sfxEnabled} onClick={async () => { await patch({ settings: s }); await run(["music"]); }}>Generate missing SFX</button>
        </div>
        <div className="stack small">
          {p.scenes.filter((x) => x.sfx).map((x) => (
            <div key={x.id} className="row">
              <span className="dim" style={{ width: 70 }}>Scene {x.index + 1}</span>
              <span style={{ flex: 1 }}>{x.sfx}</span>
              <StatusPill status={x.sfxAudio.status} />
              {x.sfxAudio.status === "done" && <audio controls src={mediaUrl(p.id, x.sfxAudio)} style={{ height: 28, width: 180 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Preview / Export

function PreviewTab({ p, run }: Ctx) {
  const st = p.stages.render;
  const ready = p.scenes.length > 0 && p.scenes.every((s) => s.image.status === "done" || s.video.status === "done");
  return (
    <div className="grid" style={{ gridTemplateColumns: p.settings.aspectRatio === "9:16" ? "minmax(260px, 420px) 1fr" : "1fr", alignItems: "start" }}>
      <div className="card stack">
        <MediaBox projectId={p.id} asset={p.final} kind="video" aspect={p.settings.aspectRatio} empty="Render the final video to preview it here" poster={p.final.status === "done" ? `/api/projects/${p.id}/media/media/final_thumb.jpg?v=${encodeURIComponent(p.final.updatedAt ?? "")}` : undefined} />
        {p.final.status === "done" && <span className="small dim">{p.final.duration?.toFixed(1)}s · {p.settings.aspectRatio} · {p.settings.fps}fps · H.264/AAC</span>}
      </div>
      <div className="card stack">
        <h2>Final render</h2>
        <p className="muted small">FFmpeg normalizes every clip to {p.settings.aspectRatio === "9:16" ? "1080×1920" : "1920×1080"} at {p.settings.fps}fps, matches each scene to its voiceover length, adds fades, mixes narration + ducked music + SFX, burns subtitles and exports MP4.</p>
        {st.status === "running" && <><Progress value={st.progress} /><span className="small muted">{st.message}</span></>}
        {st.status === "error" && <div className="err-text">{st.error}</div>}
        {st.status === "done" && st.message && <span className="small muted">{st.message}</span>}
        {!ready && p.scenes.length > 0 && <div className="notice">Some scenes have neither an image nor an animation yet.</div>}
        <div className="row">
          <button className="btn primary" disabled={p.running || !ready} onClick={() => run(["render"])}>{p.final.status === "done" ? "Re-render" : "Render video"}</button>
          <button className="btn" disabled={p.running} onClick={() => run(STAGE_ORDER.filter((s) => p.stages[s].status !== "done"))}>Finish all remaining stages</button>
        </div>
        <h3 style={{ marginTop: 10 }}>Timeline</h3>
        <div className="stack small">
          {p.scenes.map((s) => (
            <div key={s.id} className="row">
              <span className="dim" style={{ width: 70 }}>Scene {s.index + 1}</span>
              <span style={{ flex: 1 }} dir="auto">{s.title}</span>
              <span className="dim">{(s.voice.duration ? s.voice.duration + 0.6 : s.duration).toFixed(1)}s</span>
              <StatusPill status={s.video.status === "done" ? "done" : s.image.status === "done" ? "queued" : "idle"} label={s.video.status === "done" ? "Animated" : s.image.status === "done" ? "Still image" : "Missing"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExportTab({ p }: Ctx) {
  const url = mediaUrl(p.id, p.final);
  return (
    <div className="grid grid-2">
      <div className="card stack">
        <h2>Export center</h2>
        {p.final.status === "done" && url ? (
          <>
            <p className="muted">MP4 · H.264 + AAC · {p.settings.aspectRatio === "9:16" ? "1080×1920" : "1920×1080"} · {p.settings.fps}fps · {p.final.duration?.toFixed(1)}s · rendered {new Date(p.final.updatedAt ?? "").toLocaleString()}</p>
            <div className="row">
              <a className="btn primary" href={`${url}&download`} download>⬇ Download MP4</a>
              <a className="btn" href={url} target="_blank" rel="noreferrer">Open in new tab</a>
            </div>
          </>
        ) : (
          <p className="muted">Nothing rendered yet. Go to Preview and render the video.</p>
        )}
      </div>
      <div className="card stack">
        <h2>Individual assets</h2>
        <p className="small muted">Download any generated image, clip or voice line.</p>
        <div className="stack small">
          {p.scenes.map((s) => (
            <div key={s.id} className="row">
              <span className="dim" style={{ width: 70 }}>Scene {s.index + 1}</span>
              {[["image", s.image], ["clip", s.video], ["voice", s.voice]].map(([label, a]) => {
                const asset = a as Scene["image"];
                const u = asset.status === "done" ? mediaUrl(p.id, asset) : undefined;
                return u ? <a key={label as string} className="btn sm ghost" href={`${u}&download`}>{label as string}</a> : <span key={label as string} className="btn sm ghost" style={{ opacity: 0.3 }}>{label as string}</span>;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
