#!/usr/bin/env node
/**
 * Static build for hosts WITHOUT PHP (Netlify, Vercel, GitHub Pages, S3, …).
 *
 *   node scripts/build-profile.mjs
 *
 * Reads config.json and writes:
 *   - profile.mobileconfig     (Web Clip configuration profile; signed if SIGNING.ENABLED)
 *   - app/manifest.webmanifest (name synced with APP_NAME)
 *
 * The static host must serve .mobileconfig as application/x-apple-aspen-config
 * (see _headers / vercel.json / .htaccess in this project).
 */
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(join(ROOT, 'config.json'), 'utf8'));

if (/YOUR-DOMAIN/i.test(cfg.APP_URL)) {
  console.error('✖ Set APP_URL in config.json to your real HTTPS address (e.g. https://example.com/app/) before building.');
  process.exit(1);
}
if (!/^https:\/\//i.test(cfg.APP_URL)) console.warn('⚠ APP_URL is not HTTPS. Use HTTPS in production.');

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const uuid = seed => {
  const h = createHash('md5').update(seed).digest('hex').split('');
  h[12] = '4';
  h[16] = ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16);
  const s = h.join('');
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`.toUpperCase();
};
const bool = v => (v ? '<true/>' : '<false/>');

const id = cfg.PROFILE_IDENTIFIER;
const name = cfg.APP_NAME;
let iconXml = '';
const iconPath = join(ROOT, cfg.APP_ICON || '');
if (cfg.APP_ICON && existsSync(iconPath)) {
  const b64 = readFileSync(iconPath).toString('base64').match(/.{1,52}/g).join('\n\t\t\t');
  iconXml = `\t\t\t<key>Icon</key>\n\t\t\t<data>\n\t\t\t${b64}\n\t\t\t</data>\n\t\t\t<key>Precomposed</key>\n\t\t\t<true/>\n`;
} else {
  console.warn(`⚠ App icon not found at ${cfg.APP_ICON} — the Web Clip will use a page screenshot as its icon.`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
			<string>${uuid(id + '.webclip')}</string>
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
	<string>${uuid(id + '.profile')}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>
`;

const out = join(ROOT, cfg.STATIC_PROFILE || 'profile.mobileconfig');
const sign = cfg.SIGNING || {};
if (sign.ENABLED) {
  const tmp = mkdtempSync(join(tmpdir(), 'webclip-'));
  try {
    const unsigned = join(tmp, 'unsigned.mobileconfig');
    writeFileSync(unsigned, xml);
    const args = ['smime', '-sign', '-signer', sign.CERT, '-inkey', sign.KEY, '-nodetach', '-outform', 'der', '-in', unsigned, '-out', out];
    if (sign.CHAIN && existsSync(sign.CHAIN)) args.splice(6, 0, '-certfile', sign.CHAIN);
    execFileSync('openssl', args, { stdio: 'inherit' });
    console.log(`✔ Signed profile → ${out}`);
  } catch (e) {
    writeFileSync(out, xml);
    console.warn(`⚠ Signing failed (${e.message}). Wrote UNSIGNED profile → ${out}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
} else {
  writeFileSync(out, xml);
  console.log(`✔ Unsigned profile → ${out}`);
}

const manifestPath = join(ROOT, 'app/manifest.webmanifest');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest.name = name;
manifest.short_name = name.length > 12 ? name.slice(0, 12) : name;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log('✔ Updated app/manifest.webmanifest');
