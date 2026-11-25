/** Kolchi li t9der tbdel f business dyalk kayn hna. */

export type Mode = "text-to-video" | "image-to-video";

export const ASPECT_RATIOS = ["16:9", "9:16", "1:1"] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

/** Ch7al d credits katklef video wa7da (5 tawani). */
export const VIDEO_COST = 10;

/**
 * Presets: hadi hiya "sauce" dyalk. Kol preset kayzid style/mouvement l prompt dyal user.
 * Zid wla bdel kima bghiti.
 */
export const PRESETS = [
  { id: "none", name: "Free style", emoji: "✨", suffix: "" },
  { id: "drone", name: "Drone shot", emoji: "🚁", suffix: "aerial drone shot, smooth forward flight, sweeping cinematic view" },
  { id: "dolly-zoom", name: "Dolly zoom", emoji: "🎯", suffix: "dramatic dolly zoom, vertigo effect, tense atmosphere" },
  { id: "orbit", name: "360 Orbit", emoji: "🔄", suffix: "camera orbits 360 degrees around the subject, smooth motion" },
  { id: "handheld", name: "Handheld", emoji: "📱", suffix: "handheld camera, natural shake, documentary feel" },
  { id: "slowmo", name: "Slow motion", emoji: "🐢", suffix: "slow motion, high frame rate, detailed movement" },
  { id: "anime", name: "Anime", emoji: "🎌", suffix: "anime style, vibrant colors, cel shading" },
  { id: "pixar", name: "3D Cartoon", emoji: "🧸", suffix: "3D animated cartoon style, soft lighting, cute characters" },
  { id: "product", name: "Product ad", emoji: "🛍️", suffix: "premium product commercial, studio lighting, slow rotating reveal" },
  { id: "morocco", name: "Moroccan vibes", emoji: "🕌", suffix: "Moroccan setting, warm golden light, zellige and arches, cinematic" },
] as const;
export type PresetId = (typeof PRESETS)[number]["id"];

/** Packs dyal credits li kaybi3. Taman ghir l affichage; taman 7a9i9i kayt7ded f Lemon Squeezy. */
export const PACKS = [
  { id: "starter", name: "Starter", credits: 100, price: "$9", envVariant: "LEMONSQUEEZY_VARIANT_STARTER" },
  { id: "creator", name: "Creator", credits: 300, price: "$24", envVariant: "LEMONSQUEEZY_VARIANT_CREATOR", popular: true },
  { id: "studio", name: "Studio", credits: 1000, price: "$69", envVariant: "LEMONSQUEEZY_VARIANT_STUDIO" },
] as const;
export type PackId = (typeof PACKS)[number]["id"];

export function buildPrompt(userPrompt: string, presetId: string): string {
  const preset = PRESETS.find((p) => p.id === presetId);
  return preset?.suffix ? `${userPrompt.trim()}, ${preset.suffix}` : userPrompt.trim();
}

/** Filtre bsit. F production zid moderation API (mital: OpenAI moderation wla Hive). */
const BLOCKED = ["nude", "naked", "nsfw", "porn", "sex", "child", "kid ", "minor", "gore", "beheading", "deepfake"];
export function isPromptAllowed(prompt: string): boolean {
  const p = ` ${prompt.toLowerCase()} `;
  return !BLOCKED.some((w) => p.includes(w));
}
