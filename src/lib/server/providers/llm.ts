import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import type { Project } from "@/lib/types";
import { getProviders, requireSecret } from "../settings";

// Story + scene generation with Claude via the official Anthropic SDK.
// Structured outputs (zod) guarantee the JSON shape; server-side fallbacks
// ("default") re-run a declined request on Anthropic's recommended fallback model.

function client() {
  return new Anthropic({ apiKey: requireSecret("ANTHROPIC_API_KEY", "Story generation (Claude)") });
}

const SYSTEM = `You are a professional screenwriter and animation director for short vertical social videos (Instagram Reels / TikTok / YouTube Shorts) in the "Neon Shadow" style: faceless black silhouette characters with small glowing white eyes, in dark cinematic places lit by purple, violet, pink and orange neon.

Write emotional, gripping, original stories: a strong hook in the first seconds, rising tension, and a satisfying or haunting ending. Keep violence off-screen and non-graphic.

Narration rules:
- Write narration in the language and dialect the user asks for. Use everyday words natural to that dialect and keep the spelling consistent.
- Write numbers as words so text-to-speech pronounces them correctly.
- Short sentences, one breath each. Use commas and periods to control pacing.
- Spoken narration only: no stage directions, no scene labels, no emoji.

Visual rules:
- Characters are always black faceless silhouettes with glowing white eyes; describe them by silhouette shape, clothing outline and props (hat, scarf, backpack, coat), never by face or skin.
- Describe visuals in English for image models.
- Never ask for written text inside images (signs, screens and letters are "blank" or "unreadable glow").`;

const StorySchema = z.object({
  title: z.string().describe("Short catchy title in the narration language"),
  logline: z.string().describe("One sentence summary in English"),
  script: z.string().describe("Full spoken narration, line breaks between sentences"),
});

const ScenesSchema = z.object({
  characters: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().describe("Who they are in the story (English)"),
        appearance: z
          .string()
          .describe(
            "Canonical English visual description of the silhouette (body shape, outline of clothes, props, one or two distinctive details). Reused verbatim in every scene.",
          ),
      }),
    )
    .describe("Every recurring character, including the protagonist"),
  scenes: z.array(
    z.object({
      title: z.string().describe("Short scene label in English"),
      narration: z.string().describe("The exact narration lines spoken over this scene, copied from the script"),
      visual: z.string().describe("English: what is in the frame and what the characters do. Concrete, cinematic."),
      camera: z.string().describe("English: shot type and camera movement"),
      mood: z.string().describe("English: lighting and atmosphere using the neon palette"),
      motion: z.string().describe("English: 1-2 things that move during a 5 second clip, plus ambient motion"),
      sfx: z.string().describe("English: 1-2 ambient sound effects, no music, no dialogue"),
      characters: z.array(z.string()).describe("Names of characters visible in this scene"),
      duration: z.number().describe("Seconds, roughly the time needed to speak the narration"),
    }),
  ),
});

async function structured<T extends z.ZodType>(schema: T, prompt: string): Promise<z.infer<T>> {
  const { model, effort } = getProviders().llm;
  const response = await client().beta.messages.parse({
    model,
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: SYSTEM,
    messages: [{ role: "user", content: prompt }],
    output_config: { effort, format: betaZodOutputFormat(schema) },
  });
  if (response.stop_reason === "refusal") {
    throw new Error("The model declined this request. Try rephrasing the idea.");
  }
  if (response.stop_reason === "max_tokens") {
    throw new Error("The response was cut off (max_tokens). Try a shorter target duration.");
  }
  if (!response.parsed_output) throw new Error("The model returned output that did not match the expected format.");
  return response.parsed_output as z.infer<T>;
}

function langLine(p: Project) {
  return p.settings.language === "ar"
    ? `Narration language: Arabic — ${p.settings.dialect || "Modern Standard Arabic"}.`
    : `Narration language: English${p.settings.dialect ? ` (${p.settings.dialect})` : ""}.`;
}

/** Roughly 130 spoken words per minute for calm narration. */
const wordsFor = (seconds: number) => Math.round((seconds / 60) * 130);

export async function generateStory(p: Project) {
  const secs = p.settings.targetDuration;
  return structured(
    StorySchema,
    `Write an original story for a ${secs}-second video.
Idea from the user: """${p.idea}"""
${langLine(p)}
Target narration length: about ${wordsFor(secs)} words (±10%).
Open with a hook in the first sentence (a precise time, a strange detail, a rule being broken).`,
  );
}

export async function generateScenes(p: Project) {
  if (!p.story) throw new Error("Generate or write the story first.");
  const secs = p.settings.targetDuration;
  const sceneCount = Math.max(2, Math.min(40, Math.round(secs / 5)));
  return structured(
    ScenesSchema,
    `Break this narration into about ${sceneCount} cinematic scenes for a ${p.settings.aspectRatio} video (~${secs}s total).
Every narration line must appear in exactly one scene, in order, unchanged.
Vary shot types (wide, medium, close-up, over-the-shoulder, top-down); never more than two of the same in a row.
Leave space in each frame for the motion described.
${langLine(p)}

Title: ${p.story.title}
Narration:
"""
${p.story.script}
"""`,
  );
}
