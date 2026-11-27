import "server-only";
import { requireSecret } from "../settings";
import { ProviderError, fetchJson, sleep } from "./http";

// fal.ai queue API: submit -> poll status -> fetch result.
// https://docs.fal.ai/model-endpoints/queue

interface QueueSubmit {
  request_id: string;
  status_url: string;
  response_url: string;
}

export async function falRun<T = Record<string, unknown>>(
  model: string,
  input: Record<string, unknown>,
  opts: { timeoutMs?: number; onProgress?: (msg: string) => void } = {},
): Promise<T> {
  const key = requireSecret("FAL_KEY", `fal.ai (${model})`);
  const headers = { Authorization: `Key ${key}`, "Content-Type": "application/json" };
  const name = `fal.ai ${model}`;
  const sub = await fetchJson<QueueSubmit>(name, `https://queue.fal.run/${model}`, {
    method: "POST",
    headers,
    body: JSON.stringify(input),
  });
  const deadline = Date.now() + (opts.timeoutMs ?? 15 * 60_000);
  let delay = 2000;
  for (;;) {
    if (Date.now() > deadline) throw new ProviderError(name, undefined, "generation timed out");
    await sleep(delay);
    delay = Math.min(delay * 1.3, 8000);
    const st = await fetchJson<{ status: string; queue_position?: number }>(name, sub.status_url, { headers });
    if (st.status === "COMPLETED") break;
    if (st.status === "IN_QUEUE") opts.onProgress?.(`queued${st.queue_position != null ? ` (#${st.queue_position})` : ""}`);
    else if (st.status === "IN_PROGRESS") opts.onProgress?.("generating");
    else if (st.status !== "IN_QUEUE" && st.status !== "IN_PROGRESS")
      throw new ProviderError(name, undefined, `unexpected status ${st.status}`);
  }
  return fetchJson<T>(name, sub.response_url, { headers });
}

/** Find the first media URL in a fal response regardless of the model's output shape. */
export function falMediaUrl(out: unknown, kinds: string[]): string | undefined {
  const o = out as Record<string, unknown>;
  for (const k of kinds) {
    const v = o?.[k];
    if (typeof v === "string") return v;
    if (Array.isArray(v) && v[0] && typeof v[0] === "object" && typeof (v[0] as { url?: string }).url === "string")
      return (v[0] as { url: string }).url;
    if (v && typeof v === "object" && typeof (v as { url?: string }).url === "string") return (v as { url: string }).url;
  }
  return undefined;
}
