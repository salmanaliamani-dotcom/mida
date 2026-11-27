/**
 * End-to-end test of the rendering half of the pipeline without any paid API.
 *
 * It creates a temporary project, writes test fixtures with FFmpeg (scene
 * images, narration-like audio and a music bed), then runs the real `videos`
 * stage with the local-motion provider and the real `render` stage, and checks
 * the final MP4 (resolution, fps, duration, audio stream).
 *
 * Run: npm run test:render
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

// TEST_KEEP=1 writes the demo project into ./data so it shows up in the app
const keep = !!process.env.TEST_KEEP;
const tmp = keep ? path.join(process.cwd(), "data") : fs.mkdtempSync(path.join(os.tmpdir(), "neon-test-"));
process.env.DATA_DIR = tmp;

async function main() {
  const { createProject, updateProject, readProject } = await import("../src/lib/server/store");
  const { saveSettings } = await import("../src/lib/server/settings");
  const { runStage } = await import("../src/lib/server/pipeline");
  const { projectFile } = await import("../src/lib/server/paths");
  const { probeDuration } = await import("../src/lib/server/ffmpeg");

  saveSettings({ providers: { video: { provider: "local-motion", falModel: "", clipSeconds: 5 }, music: { provider: "upload", falModel: "" } } });

  const p = createProject("المصعد — render test", "An elevator stops every night at a 13th floor that does not exist (pipeline test with local fixtures).", { aspectRatio: "9:16", targetDuration: 12, language: "ar", subtitles: true, transitionSeconds: 0.3 });
  const ff = (args: string[]) => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args]);
  const narr = [
    "الساعة الطناش وأربعين دقيقة ديال الليل.",
    "المصعد طلع بشوية، وما وقفش.",
    "والباب تحل، على طابق ما كاينش.",
  ];
  const colors = ["0x2a0f4a", "0x3a0b3d", "0x14183f"];
  const scenes = narr.map((n, i) => {
    const img = `media/scene_t${i}.png`;
    // neon gradient + a black silhouette with two white eyes
    ff([
      "-f", "lavfi", "-i", `gradients=s=864x1536:c0=${colors[i]}:c1=0xff4fb8:x0=0:y0=0:x1=864:y1=1536:d=1`,
      "-vf",
      "drawbox=x=330:y=600:w=200:h=700:color=black:t=fill,drawbox=x=370:y=480:w=120:h=140:color=black:t=fill," +
        "drawbox=x=395:y=530:w=16:h=10:color=white:t=fill,drawbox=x=450:y=530:w=16:h=10:color=white:t=fill",
      "-frames:v", "1", projectFile(p.id, img),
    ]);
    const voice = `media/voice_t${i}.wav`;
    ff(["-f", "lavfi", "-i", `sine=frequency=${220 + i * 60}:duration=${2 + i * 0.5}`, "-ar", "48000", "-ac", "2", projectFile(p.id, voice)]);
    return { img, voice, n, i };
  });
  ff(["-f", "lavfi", "-i", "anoisesrc=d=4:c=pink:a=0.2", "-ar", "48000", "-ac", "2", projectFile(p.id, "media/music.wav")]);

  const now = new Date().toISOString();
  await updateProject(p.id, (q) => {
    q.story = { title: "Test", logline: "", script: narr.join("\n") };
    q.music = { status: "done", file: "media/music.wav", provider: "fixture", duration: 4, updatedAt: now };
    q.scenes = scenes.map(({ img, voice, n, i }) => ({
      id: `s_t${i}`, index: i, title: `Scene ${i + 1}`, narration: n, visual: "", camera: "", mood: "", motion: "", sfx: "",
      characterIds: [], duration: 4, imagePrompt: "", motionPrompt: "",
      image: { status: "done", file: img, provider: "fixture", updatedAt: now },
      video: { status: "idle" },
      voice: { status: "done", file: voice, provider: "fixture", duration: 2 + i * 0.5, updatedAt: now },
      sfxAudio: { status: "idle" },
    }));
  });

  const ctx = { projectId: p.id, force: false, isCancelled: () => false };
  console.time("videos (local motion)");
  await runStage("videos", ctx);
  console.timeEnd("videos (local motion)");
  console.time("render");
  await runStage("render", ctx);
  console.timeEnd("render");

  const final = readProject(p.id)!;
  if (final.final.status !== "done" || !final.final.file) throw new Error("render did not produce a final video: " + JSON.stringify(final.stages.render));
  const file = projectFile(p.id, final.final.file);
  const info = JSON.parse(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate", "-of", "json", file], { encoding: "utf8" }),
  ) as { streams: { codec_type: string; width?: number; height?: number; r_frame_rate?: string }[] };
  const v = info.streams.find((s) => s.codec_type === "video")!;
  const a = info.streams.find((s) => s.codec_type === "audio");
  const dur = await probeDuration(file);
  const expected = scenes.reduce((t, s) => t + Math.max(2.5, 2 + s.i * 0.5 + 0.6), 0);
  console.log({ file, width: v.width, height: v.height, fps: v.r_frame_rate, audio: !!a, duration: dur.toFixed(2), expected: expected.toFixed(2) });
  if (v.width !== 1080 || v.height !== 1920) throw new Error("wrong resolution");
  if (v.r_frame_rate !== "30/1") throw new Error("wrong fps");
  if (!a) throw new Error("missing audio stream");
  if (Math.abs(dur - expected) > 0.25) throw new Error("duration mismatch");
  // keep a few frames for manual inspection
  const keep = path.join(process.cwd(), "data", "test-output");
  fs.mkdirSync(keep, { recursive: true });
  fs.copyFileSync(file, path.join(keep, "render-test.mp4"));
  ff(["-ss", "1.2", "-i", file, "-frames:v", "1", path.join(keep, "render-test-frame.jpg")]);
  console.log("PASS — copy saved to data/test-output/render-test.mp4");
  if (!keep) fs.rmSync(tmp, { recursive: true, force: true });
}

main().catch((e) => {
  console.error("FAIL:", e);
  process.exit(1);
});
