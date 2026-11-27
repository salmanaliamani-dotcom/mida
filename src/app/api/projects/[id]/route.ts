import { deleteProject, newId, updateProject } from "@/lib/server/store";
import { cancelJob, isRunning, reconcile } from "@/lib/server/jobs";
import { body, fail, json } from "@/lib/server/http";
import { buildImagePrompt, buildMotionPrompt } from "@/lib/style";
import { emptyAsset, type Character, type Project, type ProjectSettings, type Scene, type StoryDraft } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const p = await reconcile(id);
    if (!p) return json({ error: "Project not found" }, 404);
    return json({ ...p, running: isRunning(id) });
  } catch (e) {
    return fail(e);
  }
}

type SceneEdit = Partial<Pick<Scene, "title" | "narration" | "visual" | "camera" | "mood" | "motion" | "sfx" | "characterIds" | "duration" | "imagePrompt" | "motionPrompt">> & { id?: string };
type CharacterEdit = Partial<Pick<Character, "name" | "appearance" | "role">> & { id?: string };

interface Patch {
  name?: string;
  idea?: string;
  settings?: Partial<ProjectSettings>;
  story?: StoryDraft;
  /** Full ordered list; scenes not listed are removed, entries without id are created */
  scenes?: SceneEdit[];
  characters?: CharacterEdit[];
  /** Rebuild image/motion prompts from scene fields using the style engine */
  rebuildPrompts?: boolean | string[];
}

const SCENE_FIELDS = ["title", "narration", "visual", "camera", "mood", "motion", "sfx", "characterIds", "duration", "imagePrompt", "motionPrompt"] as const;

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const b = await body<Patch>(req);
    const p = await updateProject(id, (q: Project) => {
      if (typeof b.name === "string") q.name = b.name.slice(0, 200);
      if (typeof b.idea === "string") q.idea = b.idea;
      if (b.settings) q.settings = { ...q.settings, ...b.settings };
      if (b.story) q.story = { title: String(b.story.title ?? ""), logline: String(b.story.logline ?? ""), script: String(b.story.script ?? "") };

      if (b.characters) {
        const old = new Map(q.characters.map((c) => [c.id, c]));
        q.characters = b.characters.map((c) => {
          const prev = c.id ? old.get(c.id) : undefined;
          return prev
            ? { ...prev, ...c, id: prev.id }
            : { id: newId("c_"), name: c.name ?? "New character", appearance: c.appearance ?? "", role: c.role ?? "", reference: emptyAsset() };
        });
        const ids = new Set(q.characters.map((c) => c.id));
        q.scenes.forEach((s) => (s.characterIds = s.characterIds.filter((x) => ids.has(x))));
      }

      if (b.scenes) {
        const old = new Map(q.scenes.map((s) => [s.id, s]));
        q.scenes = b.scenes.map((e, i) => {
          const prev = e.id ? old.get(e.id) : undefined;
          const s: Scene = prev ?? {
            id: newId("s_"), index: i, title: "New scene", narration: "", visual: "", camera: "medium shot, slow push-in",
            mood: "purple and pink neon glow, dark atmosphere", motion: "subtle breathing, drifting particles", sfx: "",
            characterIds: [], duration: 5, imagePrompt: "", motionPrompt: "",
            image: emptyAsset(), video: emptyAsset(), voice: emptyAsset(), sfxAudio: emptyAsset(),
          };
          for (const f of SCENE_FIELDS) if (e[f] !== undefined) (s as unknown as Record<string, unknown>)[f] = e[f];
          // narration changed -> old voiceover no longer matches
          if (prev && e.narration !== undefined && e.narration !== prev.narration && s.voice.status === "done") {
            s.voice = { ...s.voice, status: "idle", error: "Narration changed — regenerate voice" };
          }
          s.index = i;
          s.duration = Math.max(1, Math.min(30, Number(s.duration) || 5));
          if (!prev) {
            s.imagePrompt = buildImagePrompt(q, s);
            s.motionPrompt = buildMotionPrompt(s);
          }
          return s;
        });
      }

      if (b.rebuildPrompts) {
        const only = Array.isArray(b.rebuildPrompts) ? new Set(b.rebuildPrompts) : null;
        for (const s of q.scenes) {
          if (only && !only.has(s.id)) continue;
          s.imagePrompt = buildImagePrompt(q, s);
          s.motionPrompt = buildMotionPrompt(s);
        }
      }
    });
    return json({ ...p, running: isRunning(id) });
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    cancelJob(id);
    await deleteProject(id);
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
