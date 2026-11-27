import "server-only";
import fs from "node:fs";
import { getProviders, requireSecret } from "../settings";
import { toWav } from "../ffmpeg";
import { falMediaUrl, falRun } from "./fal";
import { ProviderError, downloadTo, fetchJson, fetchOk, stripCues } from "./http";

// ---------------------------------------------------------------- Voiceover

/** Generates narration into `outputWav` (48kHz stereo WAV). */
export async function synthesizeSpeech(text: string, outputWav: string): Promise<{ provider: string }> {
  const cfg = getProviders().tts;
  const raw = outputWav.replace(/\.wav$/, ".raw");
  if (cfg.provider === "elevenlabs") {
    const key = requireSecret("ELEVENLABS_API_KEY", "ElevenLabs voiceover");
    if (!cfg.elevenlabsVoiceId) throw new Error("Choose an ElevenLabs voice ID in Settings → Voice.");
    // eleven_v3 understands [whispers]/[scared]-style audio tags; older models would read them aloud.
    const input = cfg.elevenlabsModel.includes("v3") ? text : stripCues(text);
    const res = await fetchOk(
      "ElevenLabs",
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(cfg.elevenlabsVoiceId)}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
        body: JSON.stringify({ text: input, model_id: cfg.elevenlabsModel }),
        timeoutMs: 180_000,
      },
    );
    fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
    await toWav(raw, outputWav);
    fs.rmSync(raw, { force: true });
    return { provider: `elevenlabs:${cfg.elevenlabsModel}` };
  }
  if (cfg.provider === "openai") {
    const key = requireSecret("OPENAI_API_KEY", "OpenAI voiceover");
    const res = await fetchOk("OpenAI TTS", "https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: cfg.openaiModel,
        voice: cfg.openaiVoice,
        input: stripCues(text),
        instructions: cfg.styleInstructions,
        response_format: "mp3",
      }),
      timeoutMs: 180_000,
    });
    fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
    await toWav(raw, outputWav);
    fs.rmSync(raw, { force: true });
    return { provider: `openai:${cfg.openaiModel}/${cfg.openaiVoice}` };
  }
  // Google Gemini TTS: returns base64 PCM (s16le, 24kHz, mono). Gemini follows the
  // natural-language style instruction and inline bracket cues.
  const key = requireSecret("GEMINI_API_KEY", "Gemini voiceover");
  const out = await fetchJson<{
    candidates?: { content?: { parts?: { inlineData?: { data?: string; mimeType?: string } }[] } }[];
  }>("Gemini TTS", `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.geminiModel)}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${cfg.styleInstructions}\n\n${text}` }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: cfg.geminiVoice } } },
      },
    }),
    timeoutMs: 180_000,
  });
  const data = out.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)?.inlineData;
  if (!data?.data) throw new ProviderError("Gemini TTS", undefined, "no audio in response");
  fs.writeFileSync(raw, Buffer.from(data.data, "base64"));
  const rate = /rate=(\d+)/.exec(data.mimeType ?? "")?.[1] ?? "24000";
  await toWav(raw, outputWav, ["-f", "s16le", "-ar", rate, "-ac", "1"]);
  fs.rmSync(raw, { force: true });
  return { provider: `gemini:${cfg.geminiModel}/${cfg.geminiVoice}` };
}

// ---------------------------------------------------------------- Music

export async function generateMusic(prompt: string, seconds: number, outputWav: string): Promise<{ provider: string }> {
  const cfg = getProviders().music;
  const tmp = outputWav.replace(/\.wav$/, ".dl");
  if (cfg.provider === "fal") {
    const out = await falRun(cfg.falModel, { prompt, seconds_total: Math.min(47, Math.ceil(seconds)), steps: 100 });
    const url = falMediaUrl(out, ["audio_file", "audio", "audio_url"]);
    if (!url) throw new ProviderError(`fal.ai ${cfg.falModel}`, undefined, "no audio URL in response");
    await downloadTo(`fal.ai ${cfg.falModel}`, url, tmp);
    await toWav(tmp, outputWav);
    fs.rmSync(tmp, { force: true });
    return { provider: `fal:${cfg.falModel}` };
  }
  if (cfg.provider === "elevenlabs") {
    const key = requireSecret("ELEVENLABS_API_KEY", "ElevenLabs music");
    const res = await fetchOk("ElevenLabs Music", "https://api.elevenlabs.io/v1/music", {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({ prompt: `${prompt}. Instrumental only, no vocals.`, music_length_ms: Math.round(Math.min(300, seconds) * 1000) }),
      timeoutMs: 300_000,
    });
    fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
    await toWav(tmp, outputWav);
    fs.rmSync(tmp, { force: true });
    return { provider: "elevenlabs:music" };
  }
  throw new Error(cfg.provider === "upload" ? "Upload a music file in the Audio tab." : "Music provider is set to None.");
}

// ---------------------------------------------------------------- Sound effects

export async function generateSfx(prompt: string, seconds: number, outputWav: string): Promise<{ provider: string }> {
  const cfg = getProviders().sfx;
  if (cfg.provider !== "elevenlabs") throw new Error("Sound effects provider is set to None.");
  const key = requireSecret("ELEVENLABS_API_KEY", "ElevenLabs sound effects");
  const res = await fetchOk("ElevenLabs SFX", "https://api.elevenlabs.io/v1/sound-generation", {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text: prompt, duration_seconds: Math.max(0.5, Math.min(22, seconds)) }),
    timeoutMs: 180_000,
  });
  const tmp = outputWav.replace(/\.wav$/, ".dl");
  fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  await toWav(tmp, outputWav);
  fs.rmSync(tmp, { force: true });
  return { provider: "elevenlabs:sfx" };
}
