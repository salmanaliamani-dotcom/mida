"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, useToast } from "@/components/ui";
import { defaultProjectSettings, type Project, type ProjectSettings, type PublicSettings } from "@/lib/types";

const EXAMPLES = [
  "An elevator in an old Casablanca building stops every night at a 13th floor that doesn't exist.",
  "A lonely robot raises a child on a mountain, and keeps one secret until its battery runs out.",
  "A student finds an old phone at a flea market that receives messages from tomorrow.",
];

export default function NewProject() {
  const router = useRouter();
  const { show, node } = useToast();
  const [idea, setIdea] = useState("");
  const [name, setName] = useState("");
  const [s, setS] = useState<ProjectSettings>(defaultProjectSettings());
  const [busy, setBusy] = useState(false);
  const [settings, setSettings] = useState<PublicSettings>();

  useEffect(() => {
    api<PublicSettings>("/api/settings").then(setSettings).catch(() => undefined);
  }, []);

  const set = <K extends keyof ProjectSettings>(k: K, v: ProjectSettings[K]) => setS((x) => ({ ...x, [k]: v }));

  async function create(auto: boolean) {
    setBusy(true);
    try {
      const p = await api<Project>("/api/projects", { method: "POST", json: { name, idea, settings: s } });
      if (auto) await api(`/api/projects/${p.id}/run`, { method: "POST", json: { stages: "all" } });
      router.push(`/projects/${p.id}`);
    } catch (e) {
      show((e as Error).message, true);
      setBusy(false);
    }
  }

  const missing = settings
    ? (["ANTHROPIC_API_KEY"] as const).filter((k) => !settings.secrets[k].configured)
    : [];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>New project</h1>
          <p>Describe an idea. Claude writes the story and scenes; your configured providers create images, animation and voice.</p>
        </div>
      </div>
      {missing.length > 0 && (
        <div className="notice" style={{ marginBottom: 16 }}>
          Story generation needs an Anthropic API key. Add it in <a href="/settings" style={{ textDecoration: "underline" }}>Settings</a>, or write the story yourself in the Story tab after creating the project.
        </div>
      )}
      <div className="grid grid-2">
        <div className="card stack">
          <h2>Story idea</h2>
          <label className="field">
            Idea or premise
            <textarea dir="auto" rows={6} value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="A shadow in a neon city receives a letter written 20 years ago…" />
          </label>
          <div className="row">
            {EXAMPLES.map((ex) => (
              <button key={ex} className="btn sm" onClick={() => setIdea(ex)} title={ex}>
                {ex.slice(0, 34)}…
              </button>
            ))}
          </div>
          <label className="field">
            Project name (optional — the AI title is used otherwise)
            <input dir="auto" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className="card stack">
          <h2>Video settings</h2>
          <div className="grid grid-2">
            <label className="field">
              Format
              <select value={s.aspectRatio} onChange={(e) => set("aspectRatio", e.target.value as ProjectSettings["aspectRatio"])}>
                <option value="9:16">Vertical 9:16 — Reels / Shorts / TikTok (1080×1920)</option>
                <option value="16:9">Horizontal 16:9 — YouTube (1920×1080)</option>
              </select>
            </label>
            <label className="field">
              Duration: {s.targetDuration}s
              <input type="range" min={10} max={600} step={5} value={s.targetDuration} onChange={(e) => set("targetDuration", Number(e.target.value))} />
            </label>
            <label className="field">
              Narration language
              <select
                value={s.language}
                onChange={(e) => {
                  const language = e.target.value as ProjectSettings["language"];
                  setS((x) => ({ ...x, language, dialect: language === "ar" ? "Moroccan Darija (الدارجة المغربية)" : "" }));
                }}
              >
                <option value="ar">Arabic</option>
                <option value="en">English</option>
              </select>
            </label>
            <label className="field">
              Dialect / accent
              <input dir="auto" value={s.dialect} onChange={(e) => set("dialect", e.target.value)} placeholder={s.language === "ar" ? "e.g. Egyptian, Gulf, Levantine, MSA" : "e.g. British"} />
            </label>
            <label className="field">
              Frame rate
              <select value={s.fps} onChange={(e) => set("fps", Number(e.target.value))}>
                <option value={30}>30 fps</option>
                <option value={24}>24 fps (filmic)</option>
                <option value={60}>60 fps</option>
              </select>
            </label>
            <label className="field" style={{ justifyContent: "flex-end" }}>
              <span className="row"><input type="checkbox" checked={s.subtitles} onChange={(e) => set("subtitles", e.target.checked)} /> Burn-in subtitles</span>
              <span className="row"><input type="checkbox" checked={s.sfxEnabled} onChange={(e) => set("sfxEnabled", e.target.checked)} /> Sound effects per scene</span>
            </label>
          </div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn" disabled={busy || !idea.trim()} onClick={() => create(false)}>Create &amp; edit step by step</button>
            <button className="btn primary" disabled={busy || !idea.trim()} onClick={() => create(true)}>✦ Create &amp; generate automatically</button>
          </div>
          <p className="dim small">Automatic mode runs every stage: story → scenes → characters → images → voice → animation → music → final MP4. You can stop it and regenerate any single scene later.</p>
        </div>
      </div>
      {node}
    </>
  );
}
