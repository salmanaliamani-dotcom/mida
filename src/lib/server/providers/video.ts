import "server-only";
import type { AspectRatio } from "@/lib/types";
import { getProviders } from "../settings";
import { dataUri, localMotionClip, toJpeg } from "../ffmpeg";
import { NEGATIVE } from "@/lib/style";
import { falMediaUrl, falRun } from "./fal";
import { ProviderError, downloadTo } from "./http";
import { dims } from "@/lib/style";

export interface VideoRequest {
  image: string;
  prompt: string;
  aspect: AspectRatio;
  fps: number;
  seconds: number;
  variant: number;
  output: string; // .mp4
  onProgress?: (msg: string) => void;
}

export async function animateImage(req: VideoRequest): Promise<{ provider: string }> {
  const cfg = getProviders().video;
  if (cfg.provider === "local-motion") {
    const { width, height } = dims(req.aspect);
    await localMotionClip(req.image, req.output, { width, height, fps: req.fps, seconds: req.seconds, variant: req.variant });
    return { provider: "local-motion (FFmpeg camera move, not AI)" };
  }
  // fal.ai image-to-video. Kling / most fal i2v models accept prompt + image_url + duration.
  const model = cfg.falModel;
  const jpg = await toJpeg(req.image, req.output.replace(/\.mp4$/, ".src.jpg"), 1920);
  const out = await falRun(
    model,
    {
      prompt: req.prompt,
      image_url: dataUri(jpg, "image/jpeg"),
      duration: String(cfg.clipSeconds >= 8 ? 10 : 5),
      aspect_ratio: req.aspect,
      negative_prompt: NEGATIVE,
    },
    { onProgress: req.onProgress, timeoutMs: 25 * 60_000 },
  );
  const url = falMediaUrl(out, ["video", "videos"]);
  if (!url) throw new ProviderError(`fal.ai ${model}`, undefined, "no video URL in response");
  await downloadTo(`fal.ai ${model}`, url, req.output);
  return { provider: `fal:${model}` };
}
