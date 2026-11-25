// GET /profile → Apple Configuration Profile (Web Clip). iOS shows its native Allow/Ignore prompt.
import { loadConfig, buildProfile } from '../lib/webclip.js';

export async function onRequest(context) {
  const cfg = await loadConfig(context);
  const body = await buildProfile(context, cfg);
  const filename = String(cfg.PROFILE_FILENAME || 'webclip.mobileconfig').replace(/[^A-Za-z0-9._-]/g, '-');
  return new Response(context.request.method === 'HEAD' ? null : body, {
    headers: {
      'Content-Type': 'application/x-apple-aspen-config',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
