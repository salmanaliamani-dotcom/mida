import "server-only";
import { fal } from "@fal-ai/client";
import type { AspectRatio, Mode } from "./config";

fal.config({ credentials: process.env.FAL_KEY });

export const isMock = () => process.env.MOCK_GENERATION === "true" || !process.env.FAL_KEY;

export function modelFor(mode: Mode): string {
  return mode === "image-to-video"
    ? process.env.FAL_I2V_MODEL || "fal-ai/kling-video/v1.6/standard/image-to-video"
    : process.env.FAL_T2V_MODEL || "fal-ai/kling-video/v1.6/standard/text-to-video";
}

const MOCK_SECONDS = 8;

export async function submitVideo(opts: {
  mode: Mode;
  prompt: string;
  imageUrl?: string | null;
  aspectRatio: AspectRatio;
}): Promise<string> {
  if (isMock()) return `mock-${Date.now()}`;

  const input: Record<string, unknown> = {
    prompt: opts.prompt,
    duration: "5",
    aspect_ratio: opts.aspectRatio,
  };
  if (opts.mode === "image-to-video") input.image_url = opts.imageUrl;

  const { request_id } = await fal.queue.submit(modelFor(opts.mode), { input });
  return request_id;
}

export type PollResult =
  | { state: "pending" }
  | { state: "done"; videoUrl: string }
  | { state: "failed"; error: string };

export async function pollVideo(model: string, requestId: string): Promise<PollResult> {
  if (requestId.startsWith("mock-")) {
    const started = Number(requestId.slice(5));
    return Date.now() - started > MOCK_SECONDS * 1000
      ? { state: "done", videoUrl: "/demo.mp4" }
      : { state: "pending" };
  }

  try {
    const status = await fal.queue.status(model, { requestId });
    if (status.status !== "COMPLETED") return { state: "pending" };
    const result = await fal.queue.result(model, { requestId });
    const data = result.data as { video?: { url?: string } };
    const url = data?.video?.url;
    return url ? { state: "done", videoUrl: url } : { state: "failed", error: "No video in result" };
  } catch (e) {
    return { state: "failed", error: e instanceof Error ? e.message : "Generation failed" };
  }
}
