# Neon Shadow Studio

An AI animation studio that turns a one-line idea into a finished cinematic video in the **Neon Shadow** style: faceless black silhouette characters with small glowing white eyes, dark environments, and purple / violet / pink / orange neon light.

You enter an idea. The studio then runs these stages automatically:

1. **Story**: Claude writes the narration in your language and dialect (Arabic dialects or English), with numbers spelled out so text-to-speech reads them correctly.
2. **Scenes**: Claude splits the script into shots. Each shot gets its visuals, camera, mood, motion, sound effects and characters.
3. **Characters**: a reference image is generated for each recurring character.
4. **Images**: one image per scene. Character references are passed to models that accept them (FLUX Kontext, gpt-image-1 edits).
5. **Voiceover**: one narration clip per scene. The voice length sets the scene length.
6. **Animation**: each image becomes a clip with an image-to-video model, at the length of its narration.
7. **Music and SFX**: a background track (generated or uploaded) and optional sound effects per scene.
8. **Final render**: FFmpeg combines everything into one MP4. It normalizes resolution and fps, adds fades, places the narration, ducks the music under the voice, burns in subtitles (Arabic RTL supported), and exports H.264/AAC.

Every stage can be re-run on its own, and any single scene's image, clip or voice can be regenerated without restarting the project.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: put API keys here, or enter them in the app
npm run build && npm start   # http://localhost:3000
```

Requirements:
- Node.js 20 or newer.
- **FFmpeg** with libass, libx264 and libmp3lame. Ubuntu's `apt install ffmpeg` has all three. You can point `FFMPEG_PATH` / `FFPROBE_PATH` at a custom build.

## API keys and paid services

Open **Settings & API keys** in the app, or set environment variables. Environment variables take precedence over keys saved in the app. Keys saved in the app are encrypted with AES-256-GCM in `data/settings.json`; set `APP_SECRET` to control the encryption key. Keys are never sent back to the browser: the UI only shows a masked preview.

| Key | Service | Used for | Required? |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | [Anthropic](https://console.anthropic.com) | Story, script and scene planning (Claude, default `claude-opus-5-5`) | Yes, unless you write the script and scenes yourself in the app |
| `FAL_KEY` | [fal.ai](https://fal.ai) | Images (`fal-ai/flux/dev`), character-consistent images (`fal-ai/flux-pro/kontext`), image-to-video (`fal-ai/kling-video/v2.1/standard/image-to-video` by default, any fal i2v model id works), music (`fal-ai/stable-audio`) | For the default image and animation providers |
| `OPENAI_API_KEY` | [OpenAI](https://platform.openai.com) | Alternative images (`gpt-image-1`) and voiceover (`gpt-4o-mini-tts`) | Optional |
| `ELEVENLABS_API_KEY` | [ElevenLabs](https://elevenlabs.io) | Voiceover (default `eleven_v3`, which understands `[whispers]` / `[scared]` style tags), music, sound effects | For the default voice provider. Also set a **Voice ID** in Settings |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com) | Alternative voiceover with Gemini TTS | Optional |

All of these are paid services and every call is real. Nothing is simulated: if a stage needs a key that isn't configured, it stops with an error that names the missing key.

**Free option for animation:** setting Animation to *Local camera motion* uses FFmpeg to animate each still image with push-ins, pans, highlight-only neon bloom and drifting particles. It is labelled in the app as "not AI" so it is never mistaken for real image-to-video output.

## How the style stays consistent

`src/lib/style.ts` is the Neon Shadow style engine. Consistency comes from three things:

- A fixed style block, plus negative terms (no text, no faces, no watermarks), appended to every image prompt.
- Each character's appearance text, inserted word for word into every scene that character appears in. The LLM never re-describes characters per scene.
- Character reference images, passed to image models that accept references.

Motion prompts only describe what changes, so the animation model keeps the original frame.

## Architecture

```
Next.js 15 (App Router, TypeScript)
├─ UI: Dashboard · New Project · Studio (Pipeline, Story, Characters, Scenes,
│      Images, Animation, Voice, Audio, Preview, Export) · Settings
├─ API routes (Node runtime)
│   /api/projects            list / create
│   /api/projects/:id        read / edit (scenes, characters, story, settings) / delete
│   /api/projects/:id/run    start a background job { stages, sceneIds?, characterIds?, force? }
│   /api/projects/:id/cancel
│   /api/projects/:id/upload own music, character refs, scene images or clips
│   /api/projects/:id/media/* media with HTTP Range support
│   /api/settings            providers + encrypted keys
└─ src/lib/server
    store.ts      JSON project store, atomic writes, per-project locks (data/projects/<id>/)
    jobs.ts       in-process job runner: one job per project, progress persisted,
                  interrupted jobs are detected after a restart and can resume
    pipeline.ts   the stages listed above
    providers/    llm.ts (Anthropic SDK, structured outputs), image.ts, video.ts,
                  audio.ts (TTS / music / SFX), fal.ts (queue API)
    ffmpeg.ts     local motion, clip normalization, soundtrack mix with ducking, mux
    subtitles.ts  ASS captions timed to the narration
```

Projects and media are stored on disk under `DATA_DIR` (default `./data`), so they survive restarts. Finished assets are never regenerated unless you ask for it.

## Testing

```bash
npm run typecheck
npm run test:render   # runs the real animation + render stages on local FFmpeg fixtures (no paid APIs)
```

`test:render` checks the final MP4's resolution, fps, duration (matched to the voice timing) and audio track. `TEST_KEEP=1 npm run test:render` puts the demo project into `./data` so you can open it in the app.

## Notes

- The Arabic subtitle font is Noto Sans Arabic (SIL Open Font License), in `assets/fonts/`.
- Clips shorter than their narration are slowed down by up to 1.5× and then looped, using streaming filters so memory use stays flat at 1080×1920.
- fal.ai receives images as base64 data URIs, so no public file hosting is needed.
