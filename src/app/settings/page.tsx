"use client";
import { useEffect, useState } from "react";
import { api, useToast } from "@/components/ui";
import { SECRET_KEYS, type ProviderSettings, type PublicSettings, type SecretKey } from "@/lib/types";

const KEY_INFO: Record<SecretKey, { label: string; used: string; url: string }> = {
  ANTHROPIC_API_KEY: { label: "Anthropic (Claude)", used: "Story, script and scene planning", url: "https://console.anthropic.com/settings/keys" },
  FAL_KEY: { label: "fal.ai", used: "Images (FLUX), character-consistent images (Kontext), image-to-video (Kling…), music (Stable Audio)", url: "https://fal.ai/dashboard/keys" },
  OPENAI_API_KEY: { label: "OpenAI", used: "Images (gpt-image-1) and/or voiceover (gpt-4o-mini-tts)", url: "https://platform.openai.com/api-keys" },
  ELEVENLABS_API_KEY: { label: "ElevenLabs", used: "Arabic/English voiceover with emotion tags (eleven_v3), music, sound effects", url: "https://elevenlabs.io/app/settings/api-keys" },
  GEMINI_API_KEY: { label: "Google Gemini", used: "Voiceover with Gemini TTS (style-controlled delivery)", url: "https://aistudio.google.com/apikey" },
};

export default function SettingsPage() {
  const { show, node } = useToast();
  const [data, setData] = useState<PublicSettings>();
  const [p, setP] = useState<ProviderSettings>();
  const [keys, setKeys] = useState<Partial<Record<SecretKey, string>>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<PublicSettings>("/api/settings").then((d) => {
      setData(d);
      setP(d.providers);
    }).catch((e) => show(e.message, true));
  }, [show]);

  async function save(secrets?: Partial<Record<SecretKey, string | null>>) {
    setBusy(true);
    try {
      const d = await api<PublicSettings>("/api/settings", { method: "PUT", json: { providers: p, secrets: secrets ?? keys } });
      setData(d);
      setP(d.providers);
      setKeys({});
      show("Settings saved");
    } catch (e) {
      show((e as Error).message, true);
    } finally {
      setBusy(false);
    }
  }

  if (!data || !p) return <p className="muted">Loading…</p>;
  const up = <S extends keyof ProviderSettings>(section: S, patch: Partial<ProviderSettings[S]>) =>
    setP((x) => (x ? { ...x, [section]: { ...x[section], ...patch } } : x));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Settings &amp; API keys</h1>
          <p>Choose a provider for each step. Keys are encrypted on the server and never sent back to the browser.</p>
        </div>
        <button className="btn primary" disabled={busy} onClick={() => save()}>Save settings</button>
      </div>

      {!data.ffmpeg.available && <div className="notice" style={{ marginBottom: 16 }}>FFmpeg was not found on the server. Install it (or set FFMPEG_PATH) — rendering needs it.</div>}

      <div className="card">
        <div className="card-head"><h2>API keys</h2><span className="small dim">{data.ffmpeg.available ? data.ffmpeg.version : ""}</span></div>
        <div className="stack">
          {SECRET_KEYS.map((k) => {
            const st = data.secrets[k];
            return (
              <div key={k} className="key-row">
                <div>
                  <b>{KEY_INFO[k].label}</b>
                  <div className="small dim">{KEY_INFO[k].used}</div>
                </div>
                <input
                  type="password"
                  autoComplete="off"
                  placeholder={st.configured ? `${st.source === "env" ? "From environment" : "Saved"}: ${st.preview}` : `Paste ${k}`}
                  disabled={st.source === "env"}
                  value={keys[k] ?? ""}
                  onChange={(e) => setKeys((x) => ({ ...x, [k]: e.target.value }))}
                />
                <div className="row">
                  <span className={`pill ${st.configured ? "done" : ""}`}><span className="dot" />{st.configured ? "Configured" : "Missing"}</span>
                  {st.source === "saved" && <button className="btn sm ghost" onClick={() => save({ [k]: null })}>Remove</button>}
                  <a className="btn sm ghost" href={KEY_INFO[k].url} target="_blank" rel="noreferrer">Get key ↗</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <div className="card stack">
          <h2>Story (LLM)</h2>
          <label className="field">Provider<select value={p.llm.provider} disabled><option value="anthropic">Anthropic Claude</option></select></label>
          <label className="field">Model<input value={p.llm.model} onChange={(e) => up("llm", { model: e.target.value })} /></label>
          <label className="field">
            Effort (higher = more careful writing, slower, costs more)
            <select value={p.llm.effort} onChange={(e) => up("llm", { effort: e.target.value as ProviderSettings["llm"]["effort"] })}>
              {["low", "medium", "high", "xhigh", "max"].map((x) => <option key={x}>{x}</option>)}
            </select>
          </label>
        </div>

        <div className="card stack">
          <h2>Images</h2>
          <label className="field">
            Provider
            <select value={p.image.provider} onChange={(e) => up("image", { provider: e.target.value as ProviderSettings["image"]["provider"] })}>
              <option value="fal">fal.ai (FLUX + Kontext for character consistency)</option>
              <option value="openai">OpenAI gpt-image-1 (uses references via image edits)</option>
            </select>
          </label>
          {p.image.provider === "fal" ? (
            <>
              <label className="field">Text-to-image model<input value={p.image.falModel} onChange={(e) => up("image", { falModel: e.target.value })} /></label>
              <label className="field">Reference model (used when a character reference exists)<input value={p.image.falReferenceModel} onChange={(e) => up("image", { falReferenceModel: e.target.value })} /></label>
            </>
          ) : (
            <label className="field">Model<input value={p.image.openaiModel} onChange={(e) => up("image", { openaiModel: e.target.value })} /></label>
          )}
        </div>

        <div className="card stack">
          <h2>Animation (image → video)</h2>
          <label className="field">
            Provider
            <select value={p.video.provider} onChange={(e) => up("video", { provider: e.target.value as ProviderSettings["video"]["provider"] })}>
              <option value="fal">fal.ai image-to-video (Kling, Luma, MiniMax…)</option>
              <option value="local-motion">Local camera motion (FFmpeg — free, not AI)</option>
            </select>
          </label>
          {p.video.provider === "fal" && (
            <>
              <label className="field">fal model id<input value={p.video.falModel} onChange={(e) => up("video", { falModel: e.target.value })} /></label>
              <label className="field">
                Clip length requested
                <select value={p.video.clipSeconds} onChange={(e) => up("video", { clipSeconds: Number(e.target.value) })}>
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                </select>
              </label>
            </>
          )}
          <p className="small dim">Clips shorter than the narration are slowed down slightly and looped at render time.</p>
        </div>

        <div className="card stack">
          <h2>Voiceover</h2>
          <label className="field">
            Provider
            <select value={p.tts.provider} onChange={(e) => up("tts", { provider: e.target.value as ProviderSettings["tts"]["provider"] })}>
              <option value="elevenlabs">ElevenLabs (supports [whispers] / [scared] audio tags with eleven_v3)</option>
              <option value="gemini">Google Gemini TTS</option>
              <option value="openai">OpenAI TTS</option>
            </select>
          </label>
          {p.tts.provider === "elevenlabs" && (
            <div className="grid grid-2">
              <label className="field">Voice ID<input value={p.tts.elevenlabsVoiceId} onChange={(e) => up("tts", { elevenlabsVoiceId: e.target.value })} placeholder="from your ElevenLabs voice library" /></label>
              <label className="field">Model<input value={p.tts.elevenlabsModel} onChange={(e) => up("tts", { elevenlabsModel: e.target.value })} /></label>
            </div>
          )}
          {p.tts.provider === "gemini" && (
            <div className="grid grid-2">
              <label className="field">Model<input value={p.tts.geminiModel} onChange={(e) => up("tts", { geminiModel: e.target.value })} /></label>
              <label className="field">Voice<input value={p.tts.geminiVoice} onChange={(e) => up("tts", { geminiVoice: e.target.value })} /></label>
            </div>
          )}
          {p.tts.provider === "openai" && (
            <div className="grid grid-2">
              <label className="field">Model<input value={p.tts.openaiModel} onChange={(e) => up("tts", { openaiModel: e.target.value })} /></label>
              <label className="field">Voice<input value={p.tts.openaiVoice} onChange={(e) => up("tts", { openaiVoice: e.target.value })} /></label>
            </div>
          )}
          {p.tts.provider !== "elevenlabs" && (
            <label className="field">Delivery instructions<textarea rows={3} value={p.tts.styleInstructions} onChange={(e) => up("tts", { styleInstructions: e.target.value })} /></label>
          )}
        </div>

        <div className="card stack">
          <h2>Music &amp; sound effects</h2>
          <label className="field">
            Background music
            <select value={p.music.provider} onChange={(e) => up("music", { provider: e.target.value as ProviderSettings["music"]["provider"] })}>
              <option value="none">None</option>
              <option value="upload">Upload my own track (Audio tab)</option>
              <option value="fal">fal.ai (Stable Audio, ≤47s, looped)</option>
              <option value="elevenlabs">ElevenLabs Music</option>
            </select>
          </label>
          {p.music.provider === "fal" && <label className="field">fal music model<input value={p.music.falModel} onChange={(e) => up("music", { falModel: e.target.value })} /></label>}
          <label className="field">
            Scene sound effects
            <select value={p.sfx.provider} onChange={(e) => up("sfx", { provider: e.target.value as ProviderSettings["sfx"]["provider"] })}>
              <option value="none">None</option>
              <option value="elevenlabs">ElevenLabs sound effects</option>
            </select>
          </label>
        </div>

        <div className="card stack">
          <h2>Where things are stored</h2>
          <p className="muted small">Projects and media live in <code>data/projects/&lt;id&gt;/</code> on the server. Keys entered here are encrypted with AES-256-GCM in <code>data/settings.json</code> (set <code>APP_SECRET</code> to control the encryption key). Environment variables always take precedence.</p>
          <p className="muted small">Every provider call is real and billed by that provider. Nothing is simulated: a stage without a configured key stops with a clear error.</p>
        </div>
      </div>
      {node}
    </>
  );
}
