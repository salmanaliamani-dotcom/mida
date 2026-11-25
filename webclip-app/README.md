# iPhone Web Clip App: install page, configuration profile and app

A complete iPhone web app plus its installation system:

1. **Install page** (`index.html`): dark green Arabic landing page with step progress, an animated iPhone mockup and a glowing **«ابدأ التثبيت»** button.
2. **Configuration profile** (`profile.php`): a real Apple `.mobileconfig` with one **Web Clip** payload, served as `application/x-apple-aspen-config`. Safari shows the **native iOS prompt** (*Ignore / Allow*). The page never imitates that dialog.
3. **Guided manual install**: animated steps for Settings → *Profile Downloaded* → *Install*. iOS never installs a profile automatically, and the page says so.
4. **The app** (`app/`): opens full screen from the Home Screen icon. It has an animated loading screen, two large categories with 5 tools each, an in-app browser, favorites, recent tools, search, settings, an offline screen and haptics.
5. **Native wrapper** (`native-ios/`, optional): SwiftUI + WKWebView. It loads the same app and opens tools in a native WKWebView browser.

```
webclip-app/
├── config.json              ← THE file you edit (name, URL, icon, identifier, tools)
├── index.html               ← installation landing page
├── install/                 ← install page CSS/JS
├── profile.php              ← .mobileconfig generator (PHP hosting)
├── frame-check.php          ← detects tool sites that refuse to be embedded
├── lib/profile-lib.php      ← profile builder + optional signing
├── scripts/build-profile.mjs← static profile build (hosting without PHP)
├── app/                     ← the application (Web Clip / PWA)
├── assets/                  ← YOUR images (see assets/README.md)
├── native-ios/              ← optional native WKWebView app (XcodeGen)
├── .htaccess  _headers  vercel.json  deploy/nginx.conf
```

---

## 1. Configure (`config.json`)

| Key | Meaning |
|---|---|
| `APP_NAME` | Name under the Home Screen icon and inside the app |
| `APP_URL` | Address the icon opens. **Must be HTTPS** and point to the `app/` folder, e.g. `https://example.com/app/` |
| `APP_ICON` | Icon embedded in the profile (`assets/icons/app-icon.png`) |
| `PROFILE_IDENTIFIER` | Reverse-DNS id, e.g. `com.mycompany.myapp`. Keep it unchanged so re-installs replace the old profile |
| `FULLSCREEN` | `true`: opens as a standalone app with no Safari interface |
| `REMOVABLE` | `true`: the user can delete the icon |
| `WEBSITE_DOMAIN` | Shown under the install button («ملف تعريف موقع من …») |
| `PROFILE_DISPLAY_NAME`, `PROFILE_DESCRIPTION`, `ORGANIZATION` | Text iOS shows on the profile screen |
| `SIGNING` | Optional profile signing (see §4) |
| `LOADING_IMAGE`, `INSTALL_TUTORIAL_IMAGE`, `LOADING_MIN_MS` | Loading screen and install mockup |
| `categories[]` | The two categories: `title`, `subtitle`, `image`, and 5 `tools` each |
| `tools[].url` | Website opened by the tool |
| `tools[].mode` | `auto` (default): in-app when the site allows it, otherwise a Safari sheet · `frame`: always in-app · `external`: always a Safari sheet |

With PHP hosting, `APP_URL` can stay as `https://YOUR-DOMAIN.com/app/` while you test. `profile.php` then fills in the current domain automatically. Set the real value before launch.

## 2. Add your images

Put your files in `assets/` under the names listed in [`assets/README.md`](assets/README.md). No image is generated. Until a file exists, the app shows a labelled placeholder in its place.

## 3. Deploy (HTTPS required)

### A) PHP hosting (recommended: cPanel, VPS, any Apache/nginx + PHP 8)
1. Upload the whole `webclip-app/` folder (its contents to your web root, or to a sub-folder).
2. Enable HTTPS (Let's Encrypt). `.htaccess` redirects to HTTPS and sets the MIME types. For nginx, use `deploy/nginx.conf`.
3. Set `APP_URL` and `WEBSITE_DOMAIN` in `config.json`.
4. Open `https://your-domain/` in **Safari on iPhone** → **ابدأ التثبيت**.

### B) Static hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages)
1. Set the real `APP_URL` in `config.json`.
2. Run `node scripts/build-profile.mjs`. It writes `profile.mobileconfig` (and syncs the manifest name).
3. Deploy. `_headers` (Netlify/Cloudflare) or `vercel.json` sets `Content-Type: application/x-apple-aspen-config`.
   The install page detects automatically that PHP is missing and links to the static file.
   *GitHub Pages cannot set custom headers. It serves `.mobileconfig` with a generic type, which iOS may not accept, so prefer another host.*
4. Re-run the build every time you change the name, URL or icon.

Without PHP, `frame-check.php` is not available. Tools whose site blocks embedding then need `"mode": "external"` in the config.

### Check the profile before testing on a phone
```bash
curl -sI https://your-domain/profile.php | grep -i content-type   # → application/x-apple-aspen-config
curl -s https://your-domain/profile.php -o p.mobileconfig && plutil -lint p.mobileconfig   # macOS
```

## 4. Optional: signed profile ("Verified" instead of "Unsigned")

An unsigned profile installs fine, but iOS labels it *Unsigned*. To have iOS show it as *Verified*, sign it with a certificate iOS trusts. Your domain's Let's Encrypt certificate works:

```json
"SIGNING": { "ENABLED": true,
  "CERT":  "/etc/letsencrypt/live/your-domain/cert.pem",
  "KEY":   "/etc/letsencrypt/live/your-domain/privkey.pem",
  "CHAIN": "/etc/letsencrypt/live/your-domain/chain.pem" }
```
The PHP user must be able to read the key. Let's Encrypt renews certificates every ~90 days. PHP signs on each request, so it picks up the new certificate automatically. For a static build, run `build-profile.mjs` again after each renewal.

## 5. The install flow on iPhone

1. The user opens your site in **Safari**. If they open it in Chrome, Instagram or another app's browser, or on a computer, the page tells them to open it in Safari on an iPhone.
2. **ابدأ التثبيت**: Safari downloads the profile, and iOS shows *"This website is trying to download a configuration profile. Do you want to allow this?"* → **Allow** → *Close*.
3. Settings → **Profile Downloaded** (or *General → VPN & Device Management*) → the profile → **Install** → passcode → **Install** → **Done**.
4. The icon appears on the Home Screen. Tapping it opens `APP_URL` full screen.

**Removal:** long-press the icon → *Remove*, or *Settings → General → VPN & Device Management → profile → Remove Profile*.

The profile contains **only** a `com.apple.webClip.managed` payload. It has no MDM, certificates, VPN, restrictions or data collection, and `PayloadRemovalDisallowed` is `false`.

## 6. In-app browser: what to expect

| Where | How tools open |
|---|---|
| Home Screen Web Clip / Safari | Inside the app in a built-in browser (iframe) with **back, forward, refresh, home, open-out, favorite**, a progress bar, a loading animation, and offline and error screens |
| Sites that forbid embedding (`X-Frame-Options` / CSP `frame-ancestors`: Google, banks, most social networks…) | Detected by `frame-check.php` and opened in the **iOS in-app Safari sheet**. In a Web Clip this sheet slides up over the app, so the user does not leave it. They tap *Done* to come back |
| Native app (`native-ios/`) | Always a native **WKWebView** browser, so every site works, with full cookies and sessions |

Limits of the web version, which come from browser security rules and that no web app can bypass:
- **Refresh** reloads the tool's start page, because the app cannot read the current address of another site.
- Safari blocks **third-party cookies** inside embedded sites. Sites that need a login may ask the user to sign in again, or may only work through the Safari sheet. The native wrapper does not have this limit.

## 7. Native iOS wrapper (optional)

```bash
brew install xcodegen
cd native-ios && xcodegen && open WebClipApp.xcodeproj
```
- Set `AppConfig.appURL` (in `AppConfig.swift`) to the same value as `APP_URL`.
- Add a 1024×1024 icon to `Assets.xcassets/AppIcon`.
- Choose your Team in *Signing & Capabilities*, then run on a device.

The web app detects the wrapper (`window.webkit.messageHandlers.webclip`) and hands navigation, haptics and favorites to native code, so the UI is the same in both versions.

## 8. Test checklist (real iPhone)

- [ ] `https://your-domain/` loads in Safari, and the button text and domain are correct
- [ ] Tapping the button shows the native *Allow / Ignore* prompt
- [ ] Settings shows *Profile Downloaded* with your name, icon and description
- [ ] After install, the icon has the right image and label
- [ ] The icon opens full screen (no Safari bars) with the loading screen
- [ ] Each of the 10 tools opens; blocked ones slide up in the Safari sheet
- [ ] Airplane mode shows the offline bar and error screen, and the app shell still opens
- [ ] Removing the profile removes the icon

## 9. Cloudflare Pages

Cloudflare does not run PHP, so `cloudflare/functions/` contains the same profile generator as a Pages Function (`/profile`) plus `/frame-check`. Build the deployable bundle with:

```bash
bash scripts/package-cloudflare.sh      # → dist/webclip-app-cloudflare.zip
```
Deploy it with `npx wrangler pages deploy` or through Git (output directory `public`). Drag-and-drop upload does not run Functions. Arabic instructions are in `cloudflare/README-AR.md`.
