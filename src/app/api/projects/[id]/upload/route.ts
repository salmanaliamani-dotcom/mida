import fs from "node:fs";
import path from "node:path";
import { updateProject } from "@/lib/server/store";
import { projectFile } from "@/lib/server/paths";
import { probeDuration, toJpeg, toWav, ffmpeg } from "@/lib/server/ffmpeg";
import { fail, json } from "@/lib/server/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = 200 * 1024 * 1024;

/**
 * Upload your own media: background music, a character reference image,
 * or a replacement image / clip for a scene.
 * multipart fields: kind = music | character | scene-image | scene-video, targetId, file
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const form = await req.formData();
    const kind = String(form.get("kind") ?? "");
    const targetId = String(form.get("targetId") ?? "");
    const file = form.get("file");
    if (!(file instanceof File)) throw new Error("No file uploaded");
    if (file.size > MAX) throw new Error("File too large (max 200 MB)");
    const stamp = Date.now();
    const tmp = projectFile(id, `media/upload_${stamp}${path.extname(file.name).replace(/[^.\w]/g, "").slice(0, 8)}`);
    fs.writeFileSync(tmp, Buffer.from(await file.arrayBuffer()));
    const now = new Date().toISOString();
    try {
      if (kind === "music") {
        const rel = "media/music.wav";
        await toWav(tmp, projectFile(id, rel));
        const duration = await probeDuration(projectFile(id, rel));
        await updateProject(id, (p) => void (p.music = { status: "done", file: rel, provider: "upload", duration, updatedAt: now }));
      } else if (kind === "character" || kind === "scene-image") {
        const rel = kind === "character" ? `media/char_${targetId}.png` : `media/scene_${targetId}.png`;
        const jpg = tmp + ".jpg";
        await toJpeg(tmp, jpg, 2048);
        await ffmpeg(["-i", jpg, projectFile(id, rel)]);
        fs.rmSync(jpg, { force: true });
        await updateProject(id, (p) => {
          if (kind === "character") {
            const c = p.characters.find((x) => x.id === targetId);
            if (!c) throw new Error("Character not found");
            c.reference = { status: "done", file: rel, provider: "upload", updatedAt: now };
          } else {
            const s = p.scenes.find((x) => x.id === targetId);
            if (!s) throw new Error("Scene not found");
            s.image = { status: "done", file: rel, provider: "upload", updatedAt: now };
            if (s.video.status === "done") s.video = { ...s.video, status: "idle", error: "Image changed — regenerate animation" };
          }
        });
      } else if (kind === "scene-video") {
        const rel = `media/scene_${targetId}.mp4`;
        await ffmpeg(["-i", tmp, "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", projectFile(id, rel)]);
        const duration = await probeDuration(projectFile(id, rel));
        await updateProject(id, (p) => {
          const s = p.scenes.find((x) => x.id === targetId);
          if (!s) throw new Error("Scene not found");
          s.video = { status: "done", file: rel, provider: "upload", duration, updatedAt: now };
        });
      } else throw new Error("Unknown upload kind");
    } finally {
      fs.rmSync(tmp, { force: true });
    }
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
