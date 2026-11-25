#!/usr/bin/env bash
# Builds a ready-to-deploy Cloudflare Pages bundle (+ zip).
#   bash scripts/package-cloudflare.sh [output-dir]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/dist}"
NAME="webclip-app-cloudflare"
B="$OUT/$NAME"
rm -rf "$B" "$OUT/$NAME.zip"
mkdir -p "$B/public"
cp -r "$ROOT/index.html" "$ROOT/install" "$ROOT/app" "$ROOT/assets" "$ROOT/config.json" "$ROOT/_headers" "$B/public/"
cp -r "$ROOT/cloudflare/functions" "$ROOT/cloudflare/lib" "$ROOT/cloudflare/wrangler.toml" "$ROOT/cloudflare/README-AR.md" "$B/"
find "$B" -name .gitkeep -delete
(cd "$OUT" && zip -qr "$NAME.zip" "$NAME")
echo "✔ $OUT/$NAME.zip"
