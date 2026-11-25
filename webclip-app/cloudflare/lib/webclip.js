// Shared helpers for the Cloudflare Pages Functions (port of lib/profile-lib.php).

export async function loadConfig(context) {
  const res = await context.env.ASSETS.fetch(new URL('/config.json', context.request.url));
  const cfg = await res.json();
  if (!cfg.APP_URL || /YOUR-DOMAIN/i.test(cfg.APP_URL)) {
    // Not configured yet → use the domain the site is served from.
    cfg.APP_URL = new URL('/app/', context.request.url).href;
  }
  return cfg;
}

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const bool = v => (v ? '<true/>' : '<false/>');

async function uuid(seed) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(seed));
  const h = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32).split('');
  h[12] = '4';
  h[16] = ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16);
  const s = h.join('');
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`.toUpperCase();
}

function toBase64(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export async function buildProfile(context, cfg) {
  const id = cfg.PROFILE_IDENTIFIER;
  const name = cfg.APP_NAME;

  let iconXml = '';
  if (cfg.APP_ICON) {
    const res = await context.env.ASSETS.fetch(new URL('/' + cfg.APP_ICON.replace(/^\.?\//, ''), context.request.url));
    const type = res.headers.get('content-type') || '';
    if (res.ok && type.startsWith('image/')) {
      const b64 = toBase64(new Uint8Array(await res.arrayBuffer())).match(/.{1,52}/g).join('\n\t\t\t');
      iconXml = `\t\t\t<key>Icon</key>\n\t\t\t<data>\n\t\t\t${b64}\n\t\t\t</data>\n\t\t\t<key>Precomposed</key>\n\t\t\t<true/>\n`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>FullScreen</key>
			${bool(cfg.FULLSCREEN)}
${iconXml}			<key>IgnoreManifestScope</key>
			${bool(cfg.IGNORE_MANIFEST_SCOPE)}
			<key>IsRemovable</key>
			${bool(cfg.REMOVABLE)}
			<key>Label</key>
			<string>${esc(name)}</string>
			<key>PayloadDescription</key>
			<string>${esc('Web Clip: ' + name)}</string>
			<key>PayloadDisplayName</key>
			<string>${esc(name)}</string>
			<key>PayloadIdentifier</key>
			<string>${esc(id + '.webclip')}</string>
			<key>PayloadType</key>
			<string>com.apple.webClip.managed</string>
			<key>PayloadUUID</key>
			<string>${await uuid(id + '.webclip')}</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
			<key>URL</key>
			<string>${esc(cfg.APP_URL)}</string>
		</dict>
	</array>
	<key>PayloadDescription</key>
	<string>${esc(cfg.PROFILE_DESCRIPTION)}</string>
	<key>PayloadDisplayName</key>
	<string>${esc(cfg.PROFILE_DISPLAY_NAME || name)}</string>
	<key>PayloadIdentifier</key>
	<string>${esc(id)}</string>
	<key>PayloadOrganization</key>
	<string>${esc(cfg.ORGANIZATION || name)}</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>${await uuid(id + '.profile')}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>
`;
}
