#!/usr/bin/env bash
# Flat, Functions-free bundle for Cloudflare Pages DRAG-AND-DROP upload.
# The profile is pre-built for one domain, so the domain must be given:
#   bash scripts/package-cloudflare-static.sh your-project.pages.dev [output-dir] ["App Name"]
set -euo pipefail
DOMAIN="${1:?usage: package-cloudflare-static.sh <domain> [output-dir] [app-name]}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${2:-$ROOT/dist}"
APPNAME="${3:-}"
NAME="${DOMAIN%%.*}-dragdrop"
B="$OUT/$NAME"
rm -rf "$B" "$OUT/$NAME.zip"; mkdir -p "$B"
cp -r "$ROOT/index.html" "$ROOT/install" "$ROOT/app" "$ROOT/assets" "$ROOT/config.json" "$B/"
find "$B" -name .gitkeep -delete
DOMAIN="$DOMAIN" APPNAME="$APPNAME" node -e '
  const fs = require("fs"), p = process.argv[1] + "/config.json";
  const c = JSON.parse(fs.readFileSync(p, "utf8")), d = process.env.DOMAIN, n = process.env.APPNAME;
  c.APP_URL = `https://${d}/app/`;
  c.WEBSITE_DOMAIN = d;
  c.PROFILE_ENDPOINT = "profile.mobileconfig";
  if (c.PROFILE_IDENTIFIER === "com.myapp.webclip") c.PROFILE_IDENTIFIER = "dev.pages." + d.split(".")[0].replace(/[^a-z0-9]/gi, "") + ".webclip";
  if (n) { c.APP_NAME = c.ORGANIZATION = c.PROFILE_DISPLAY_NAME = n;
           c.PROFILE_DESCRIPTION = c.PROFILE_DESCRIPTION.replace(/MY APP/g, n);
           c.PROFILE_FILENAME = n.replace(/[^a-z0-9]+/gi, "-").toLowerCase() + ".mobileconfig"; }
  fs.writeFileSync(p, JSON.stringify(c, null, 2) + "\n");
' "$B"
node "$ROOT/scripts/build-profile.mjs" "$B"
# Cloudflare does not know .mobileconfig → without this header Safari shows a plain "Download" prompt.
cat > "$B/_headers" <<'H'
/profile.mobileconfig
  Content-Type: application/x-apple-aspen-config
  Cache-Control: no-store
  X-Content-Type-Options: nosniff

/app/sw.js
  Cache-Control: no-cache

/config.json
  Cache-Control: no-cache
H
(cd "$B" && zip -qr "../$NAME.zip" .)
echo "✔ $OUT/$NAME.zip"
