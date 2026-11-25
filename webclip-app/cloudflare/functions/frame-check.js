// GET /frame-check → {"tool-01": true, ...}: which tool sites allow being shown inside the app.
// Only URLs from config.json are checked (not an open proxy). Cached at the edge for 6 hours.
import { loadConfig } from '../lib/webclip.js';

function frameable(res, appHost) {
  if (!res) return true;
  const xfo = (res.headers.get('x-frame-options') || '').toLowerCase();
  if (xfo.includes('deny') || xfo.includes('sameorigin')) return false;
  const csp = (res.headers.get('content-security-policy') || '').toLowerCase();
  const m = csp.match(/frame-ancestors([^;]*)/);
  if (m) {
    const src = m[1].trim();
    if (src === "'none'" || src === "'self'") return false;
    if (!src.includes('*') && !src.includes(appHost)) return false;
  }
  return true;
}

export async function onRequest(context) {
  const cache = caches.default;
  const key = new Request(new URL('/frame-check', context.request.url).href);
  const hit = await cache.match(key);
  if (hit) return hit;

  const cfg = await loadConfig(context);
  const appHost = new URL(cfg.APP_URL).hostname;
  const tools = cfg.categories.flatMap(c => c.tools);
  const results = await Promise.all(tools.map(async t => {
    try {
      const res = await fetch(t.url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' },
        signal: AbortSignal.timeout(6000),
      });
      res.body?.cancel();
      return [t.id, frameable(res, appHost)];
    } catch {
      return [t.id, true];
    }
  }));

  const response = new Response(JSON.stringify(Object.fromEntries(results)), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=21600' },
  });
  context.waitUntil(cache.put(key, response.clone()));
  return response;
}
