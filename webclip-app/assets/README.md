# Image slots

Drop your own images here using exactly these names. Nothing is auto-generated:
until a file exists, the app shows a labelled placeholder in its place.

| File | Used for | Recommended size |
|---|---|---|
| `icons/app-icon.png` | Home Screen icon (embedded in the profile), app header | 1024×1024 PNG, square, no transparency, no rounded corners |
| `loading/loading-screen.png` | Animated loading screen | 800×800 PNG (transparent background works best) |
| `install/tutorial.png` | Screen of the iPhone mockup on the install page | 1170×2532 (iPhone screenshot) |
| `categories/category-one.png` | Banner of category one | 1200×600 |
| `categories/category-two.png` | Banner of category two | 1200×600 |
| `tools/tool-01.png` … `tool-10.png` | Tool icons | 512×512, square |

Paths can be changed in `../config.json` (keys `APP_ICON`, `LOADING_IMAGE`,
`INSTALL_TUTORIAL_IMAGE`, `categories[].image`, `categories[].tools[].image`).

After replacing `icons/app-icon.png`, users must re-download the profile to get the new
Home Screen icon (static hosting: run `node scripts/build-profile.mjs` again).
