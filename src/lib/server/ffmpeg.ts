import "server-only";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";
const FFPROBE = process.env.FFPROBE_PATH || "ffprobe";

function run(bin: string, args: string[], timeoutMs = 20 * 60_000): Promise<string> {
  return new Promise((resolve, reject) => {
    const p = spawn(bin, args, { stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    let err = "";
    const t = setTimeout(() => p.kill("SIGKILL"), timeoutMs);
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => {
      err += d;
      if (err.length > 200_000) err = err.slice(-100_000);
    });
    p.on("error", (e) => {
      clearTimeout(t);
      reject(new Error(`${bin} failed to start: ${e.message}. Is FFmpeg installed?`));
    });
    p.on("close", (code) => {
      clearTimeout(t);
      if (code === 0) resolve(out);
      else reject(new Error(`${path.basename(bin)} exited with ${code}: ${err.split("\n").slice(-12).join("\n")}`));
    });
  });
}

export const ffmpeg = (args: string[], timeoutMs?: number) => run(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], timeoutMs);

export async function probeDuration(file: string): Promise<number> {
  const out = await run(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file]);
  const d = parseFloat(out.trim());
  if (!isFinite(d)) throw new Error(`Could not read duration of ${path.basename(file)}`);
  return d;
}

export async function hasAudioStream(file: string): Promise<boolean> {
  const out = await run(FFPROBE, ["-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", file]);
  return out.trim().length > 0;
}

/** Any audio -> 48kHz stereo AAC-friendly WAV */
export async function toWav(input: string, output: string, extraInputArgs: string[] = []) {
  await ffmpeg([...extraInputArgs, "-i", input, "-ar", "48000", "-ac", "2", output]);
  return output;
}

/** Re-encode any image to a JPEG (smaller payload for APIs that take data URIs). */
export async function toJpeg(input: string, output: string, maxSide = 1536) {
  await ffmpeg([
    "-i",
    input,
    "-vf",
    `scale='if(gt(iw,ih),min(${maxSide},iw),-2)':'if(gt(iw,ih),-2,min(${maxSide},ih))'`,
    "-q:v",
    "3",
    "-frames:v",
    "1",
    output,
  ]);
  return output;
}

export function dataUri(file: string, mime: string) {
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
}

/** Cover-crop filter to exact W x H */
const cover = (w: number, h: number) => `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},setsar=1`;

/**
 * Local (non-AI) camera motion: animates a still with a slow push-in / pan,
 * neon bloom and drifting light particles. Used when no image-to-video API is
 * configured, or as an explicit choice. It is clearly labelled as local motion.
 */
export async function localMotionClip(
  image: string,
  output: string,
  opts: { width: number; height: number; fps: number; seconds: number; variant: number },
) {
  const { width: w, height: h, fps, seconds } = opts;
  const frames = Math.max(1, Math.round(seconds * fps));
  // Render the zoom at 2x for smooth sub-pixel motion, then downscale.
  const W = w * 2;
  const H = h * 2;
  const moves = [
    `z='min(1+0.10*on/${frames},1.10)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'`, // push-in
    `z='1.10-0.10*on/${frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'`, // pull-out
    `z=1.12:x='(iw-iw/zoom)*on/${frames}':y='ih/2-(ih/zoom/2)'`, // pan right
    `z=1.12:x='(iw-iw/zoom)*(1-on/${frames})':y='ih/2-(ih/zoom/2)'`, // pan left
    `z=1.12:x='iw/2-(iw/zoom/2)':y='(ih-ih/zoom)*(1-on/${frames})'`, // tilt up
  ];
  const move = moves[opts.variant % moves.length];
  const filter = [
    `[0:v]${cover(W, H)},zoompan=${move}:d=${frames}:s=${W}x${H}:fps=${fps},scale=${w}:${h},format=gbrp[base]`,
    // bloom: only the highlights (neon lights, glowing eyes) are blurred and screened back,
    // so silhouettes and shadows stay pure black
    `[base]split[b1][b2]`,
    `[b2]curves=all='0/0 0.55/0 0.8/0.35 1/1',gblur=sigma=22,eq=saturation=1.35[glow]`,
    `[b1][glow]blend=all_mode=screen:all_opacity=0.55[bloom]`,
    // particles: sparse noise, blurred, drifting upward, tinted violet
    // blends run in RGB (gbrp): in YUV, "screen" would also shift the chroma planes and tint everything
    `nullsrc=s=${w}x${h}:r=${fps}:d=${seconds},format=gray,geq=lum='if(lt(random(1),0.0009),255,0)',gblur=sigma=1.6,` +
      `scroll=vertical=-0.0015,format=gbrp,colorchannelmixer=rr=1:gg=0.62:bb=1[dust]`,
    `[bloom][dust]blend=all_mode=screen:all_opacity=0.8,vignette=PI/5,format=yuv420p[v]`,
  ].join(";");
  await ffmpeg(
    [
      "-loop",
      "1",
      "-i",
      image,
      "-filter_complex",
      filter,
      "-map",
      "[v]",
      "-t",
      String(seconds),
      "-r",
      String(fps),
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "18",
      "-pix_fmt",
      "yuv420p",
      "-an",
      output,
    ],
    10 * 60_000,
  );
  return output;
}

/**
 * Normalize a scene clip to the final format and exact duration.
 * Short clips are extended by looping forward/backward (ping-pong) so motion never freezes.
 */
export async function normalizeClip(
  input: string,
  output: string,
  opts: { width: number; height: number; fps: number; seconds: number; fade: number; isImage?: boolean },
) {
  const { width: w, height: h, fps, seconds, fade } = opts;
  const fadeOut = Math.max(0, seconds - fade);
  const fades = fade > 0 ? `,fade=t=in:st=0:d=${fade},fade=t=out:st=${fadeOut.toFixed(3)}:d=${fade}` : "";
  if (opts.isImage) {
    await ffmpeg([
      "-loop", "1", "-i", input,
      "-vf", `${cover(w, h)},fps=${fps},format=yuv420p${fades}`,
      "-t", String(seconds), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-an", output,
    ]);
    return output;
  }
  // If the generated clip is shorter than the narration, first slow it down
  // (up to 1.5x, which reads as cinematic slow motion), then loop if still short.
  // Both steps are streaming, so memory use stays flat even at 1080x1920.
  const src = await probeDuration(input);
  const stretch = src > 0 ? Math.min(Math.max(seconds / src, 1), 1.5) : 1;
  const loop = src * stretch + 0.05 < seconds;
  const filter = `[0:v]setpts=${stretch.toFixed(4)}*PTS,${cover(w, h)},fps=${fps},trim=duration=${seconds},setpts=PTS-STARTPTS,format=yuv420p${fades}[v]`;
  await ffmpeg([
    ...(loop ? ["-stream_loop", "-1"] : []),
    "-i", input, "-filter_complex", filter, "-map", "[v]",
    "-t", String(seconds), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-an", output,
  ]);
  return output;
}

export async function concatVideos(files: string[], output: string, workDir: string) {
  const list = path.join(workDir, "concat.txt");
  fs.writeFileSync(list, files.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join("\n"));
  await ffmpeg(["-f", "concat", "-safe", "0", "-i", list, "-c", "copy", output]);
  return output;
}

export interface AudioPlacement {
  file: string;
  start: number;
  volume?: number;
}

/**
 * Build the full soundtrack: narration clips placed at their scene start times,
 * optional SFX, and background music looped under everything and ducked
 * (sidechain-compressed) while the narrator speaks.
 */
export async function mixSoundtrack(
  output: string,
  opts: { duration: number; voices: AudioPlacement[]; sfx: AudioPlacement[]; music?: { file: string; volume: number } },
) {
  const inputs: string[] = [];
  const parts: string[] = [];
  let i = 0;
  const placed = (items: AudioPlacement[], label: string) => {
    const labels: string[] = [];
    for (const it of items) {
      inputs.push("-i", it.file);
      const ms = Math.max(0, Math.round(it.start * 1000));
      parts.push(`[${i}:a]aresample=48000,aformat=channel_layouts=stereo,volume=${it.volume ?? 1},adelay=${ms}|${ms}[${label}${i}]`);
      labels.push(`[${label}${i}]`);
      i++;
    }
    return labels;
  };
  const silence = `anullsrc=r=48000:cl=stereo,atrim=duration=${opts.duration}`;
  const voiceLabels = placed(opts.voices, "v");
  const sfxLabels = placed(opts.sfx, "s");

  parts.push(`${silence}[base]`);
  const voiceMix =
    voiceLabels.length > 0
      ? `[base]${voiceLabels.join("")}amix=inputs=${voiceLabels.length + 1}:normalize=0:duration=first[voice]`
      : `[base]anull[voice]`;
  parts.push(voiceMix);

  let fx = "[voice]";
  if (sfxLabels.length) {
    parts.push(`${silence}[sbase]`);
    parts.push(`[sbase]${sfxLabels.join("")}amix=inputs=${sfxLabels.length + 1}:normalize=0:duration=first[sfxbus]`);
    parts.push(`[voice][sfxbus]amix=inputs=2:normalize=0:duration=first[vs]`);
    fx = "[vs]";
  }

  if (opts.music) {
    inputs.push("-stream_loop", "-1", "-i", opts.music.file);
    const m = i++;
    parts.push(
      `[${m}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=duration=${opts.duration},volume=${opts.music.volume},` +
        `afade=t=in:d=1.5,afade=t=out:st=${Math.max(0, opts.duration - 2.5)}:d=2.5[music]`,
    );
    parts.push(`${fx}asplit[mainA][key]`);
    parts.push(`[music][key]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[ducked]`);
    parts.push(`[mainA][ducked]amix=inputs=2:normalize=0:duration=first[mix]`);
  } else {
    parts.push(`${fx}anull[mix]`);
  }
  parts.push(`[mix]alimiter=limit=0.95,atrim=duration=${opts.duration}[out]`);

  await ffmpeg([...inputs, "-filter_complex", parts.join(";"), "-map", "[out]", "-c:a", "pcm_s16le", output]);
  return output;
}

export async function muxFinal(
  video: string,
  audio: string,
  output: string,
  opts: { subtitles?: string; fontsDir?: string },
) {
  const vf = opts.subtitles
    ? ["-vf", `subtitles='${opts.subtitles.replace(/\\/g, "/").replace(/'/g, "\\'").replace(/:/g, "\\:")}'${opts.fontsDir ? `:fontsdir='${opts.fontsDir.replace(/:/g, "\\:")}'` : ""}`]
    : [];
  await ffmpeg([
    "-i", video, "-i", audio, ...vf,
    "-map", "0:v", "-map", "1:a",
    "-c:v", opts.subtitles ? "libx264" : "copy",
    ...(opts.subtitles ? ["-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p"] : []),
    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-shortest", output,
  ]);
  return output;
}

export async function thumbnail(video: string, output: string, at = 0.5) {
  await ffmpeg(["-ss", String(at), "-i", video, "-frames:v", "1", "-q:v", "3", output]);
  return output;
}
