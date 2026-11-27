import "server-only";
import fs from "node:fs";

export class ProviderError extends Error {
  constructor(public provider: string, public status: number | undefined, message: string) {
    super(`${provider}: ${message}`);
  }
}

async function errorText(res: Response) {
  const t = await res.text().catch(() => "");
  try {
    const j = JSON.parse(t);
    return (
      j?.error?.message ?? j?.detail?.message ?? (typeof j?.detail === "string" ? j.detail : undefined) ??
      j?.message ?? JSON.stringify(j).slice(0, 500)
    );
  } catch {
    return t.slice(0, 500) || res.statusText;
  }
}

export async function fetchOk(provider: string, url: string, init: RequestInit & { timeoutMs?: number } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), init.timeoutMs ?? 120_000);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    if (!res.ok) throw new ProviderError(provider, res.status, `HTTP ${res.status} — ${await errorText(res)}`);
    return res;
  } catch (e) {
    if (e instanceof ProviderError) throw e;
    if ((e as Error).name === "AbortError") throw new ProviderError(provider, undefined, "request timed out");
    throw new ProviderError(provider, undefined, (e as Error).message);
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchJson<T = unknown>(provider: string, url: string, init: RequestInit & { timeoutMs?: number } = {}) {
  const res = await fetchOk(provider, url, init);
  return (await res.json()) as T;
}

const MAX_DOWNLOAD = 300 * 1024 * 1024;

export async function downloadTo(provider: string, url: string, dest: string) {
  if (url.startsWith("data:")) {
    const b64 = url.slice(url.indexOf(",") + 1);
    fs.writeFileSync(dest, Buffer.from(b64, "base64"));
    return dest;
  }
  const res = await fetchOk(provider, url, { timeoutMs: 300_000 });
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_DOWNLOAD) throw new ProviderError(provider, undefined, "downloaded file is too large");
  fs.writeFileSync(dest, buf);
  return dest;
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Remove [bracket] performance cues for engines that would read them aloud. */
export function stripCues(text: string) {
  return text.replace(/\[[^\]\n]{1,60}\]/g, "").replace(/[ \t]{2,}/g, " ").trim();
}
