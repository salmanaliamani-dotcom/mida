import type { Character, Project, Scene } from "@/lib/types";

// The Neon Shadow visual style engine.
//
// Consistency comes from three things that are applied identically to every scene:
//  1. A fixed STYLE block appended verbatim to every image prompt.
//  2. Each character's canonical appearance text, inserted verbatim whenever the
//     character appears (the LLM never re-describes characters per scene).
//  3. The character reference image, passed to reference-capable image models.
// Motion prompts only describe what changes, so the animation model keeps the frame.

export const NEON_SHADOW_STYLE =
  "NEON SHADOW style: 2D cinematic animated film frame, characters are completely black faceless silhouettes with small glowing white eyes, no facial features, " +
  "dark mysterious atmosphere, beautiful neon lighting in purple, violet, magenta pink and warm orange accents, soft volumetric glow, realistic soft shadows, " +
  "atmospheric haze and floating particles, rich detailed futuristic environment, professional animated movie quality, clean shapes, high contrast";

export const NEGATIVE =
  "no text, no letters, no numbers, no captions, no watermark, no logo, no visible facial features on characters, no extra limbs, no distorted hands, no photorealistic faces";

export const MOTION_SUFFIX =
  "Single continuous shot, no cuts. Keep the exact same art style, characters stay black silhouettes with small glowing white eyes, no morphing, no new characters, no text.";

export function characterBlock(chars: Character[]) {
  if (!chars.length) return "";
  return chars.map((c) => `${c.name}: ${c.appearance}`).join(". ");
}

export function sceneCharacters(project: Project, scene: Scene) {
  return project.characters.filter((c) => scene.characterIds.includes(c.id));
}

export function buildImagePrompt(project: Project, scene: Scene): string {
  const chars = sceneCharacters(project, scene);
  const frame = project.settings.aspectRatio === "9:16" ? "vertical 9:16 composition" : "horizontal 16:9 widescreen composition";
  return [
    scene.visual,
    chars.length ? `Characters: ${characterBlock(chars)}` : "No characters in frame",
    `Camera: ${scene.camera}`,
    `Lighting and mood: ${scene.mood}`,
    frame,
    NEON_SHADOW_STYLE,
    NEGATIVE,
  ]
    .filter(Boolean)
    .join(". ");
}

export function buildMotionPrompt(scene: Scene): string {
  return [scene.motion, `Camera: ${scene.camera}`, MOTION_SUFFIX].filter(Boolean).join(" ");
}

export function buildCharacterSheetPrompt(c: Character, aspect: "9:16" | "16:9"): string {
  return [
    `Character reference sheet of ${c.name}: ${c.appearance}`,
    "full body, standing, front view, centered, plain dark violet gradient background with soft neon rim light",
    aspect === "9:16" ? "vertical composition" : "horizontal composition",
    NEON_SHADOW_STYLE,
    NEGATIVE,
  ].join(". ");
}

export function dims(aspect: "9:16" | "16:9") {
  return aspect === "9:16" ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 };
}
