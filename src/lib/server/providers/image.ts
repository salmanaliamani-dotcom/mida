import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { AspectRatio } from "@/lib/types";
import { getProviders, requireSecret } from "../settings";
import { dataUri, toJpeg } from "../ffmpeg";
import { falMediaUrl, falRun } from "./fal";
import { ProviderError, downloadTo, fetchJson } from "./http";

export interface ImageRequest {
  prompt: string;
  aspect: AspectRatio;
  /** Local files of character reference images to follow */
  references: string[];
  output: string; // .png
  onProgress?: (msg: string) => void;
}

export async function generateImage(req: ImageRequest): Promise<{ provider: string }> {
  const cfg = getProviders().image;
  if (cfg.provider === "openai") return openaiImage(req, cfg.openaiModel);
  return falImage(req, cfg.falModel, cfg.falReferenceModel);
}

// ---- OpenAI Images (gpt-image-1): generations, or edits when references exist ----
async function openaiImage(req: ImageRequest, model: string) {
  const key = requireSecret("OPENAI_API_KEY", "OpenAI image generation");
  const size = req.aspect === "9:16" ? "1024x1536" : "1536x1024";
  const name = `OpenAI ${model}`;
  let out: { data?: { b64_json?: string; url?: string }[] };
  if (req.references.length) {
    const form = new FormData();
    form.append("model", model);
    form.append("prompt", `${req.prompt}. Keep the characters exactly as in the reference image(s).`);
    form.append("size", size);
    for (const ref of req.references.slice(0, 4)) {
      form.append("image[]", new Blob([fs.readFileSync(ref)], { type: "image/png" }), path.basename(ref));
    }
    out = await fetchJson(name, "https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form,
      timeoutMs: 300_000,
    });
  } else {
    out = await fetchJson(name, "https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt: req.prompt, size, n: 1 }),
      timeoutMs: 300_000,
    });
  }
  const item = out.data?.[0];
  if (item?.b64_json) fs.writeFileSync(req.output, Buffer.from(item.b64_json, "base64"));
  else if (item?.url) await downloadTo(name, item.url, req.output);
  else throw new ProviderError(name, undefined, "no image in response");
  return { provider: `openai:${model}${req.references.length ? " (reference)" : ""}` };
}

// ---- fal.ai: text-to-image, or a reference/editing model (e.g. FLUX Kontext) ----
async function falImage(req: ImageRequest, model: string, refModel: string) {
  let out: unknown;
  let used = model;
  if (req.references.length && refModel) {
    used = refModel;
    const jpg = await toJpeg(req.references[0], req.output.replace(/\.png$/, ".ref.jpg"));
    out = await falRun(refModel, {
      prompt: `${req.prompt}. Keep the character from the reference image identical: same silhouette, outline, props and glowing eyes.`,
      image_url: dataUri(jpg, "image/jpeg"),
      aspect_ratio: req.aspect,
      num_images: 1,
      output_format: "png",
    }, { onProgress: req.onProgress });
    fs.rmSync(jpg, { force: true });
  } else {
    const image_size = req.aspect === "9:16" ? { width: 864, height: 1536 } : { width: 1536, height: 864 };
    out = await falRun(model, { prompt: req.prompt, image_size, num_images: 1, enable_safety_checker: true }, {
      onProgress: req.onProgress,
    });
  }
  const url = falMediaUrl(out, ["images", "image"]);
  if (!url) throw new ProviderError(`fal.ai ${used}`, undefined, "no image URL in response");
  await downloadTo(`fal.ai ${used}`, url, req.output);
  return { provider: `fal:${used}` };
}
