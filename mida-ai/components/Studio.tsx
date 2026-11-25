"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ASPECT_RATIOS, PRESETS, VIDEO_COST, type AspectRatio, type Mode } from "@/lib/config";

type Gen = {
  id: string;
  prompt: string;
  status: "queued" | "running" | "done" | "failed";
  video_url: string | null;
  error: string | null;
  aspect_ratio: string;
  created_at: string;
};

export default function Studio({ initialCredits, initialGenerations }: { initialCredits: number; initialGenerations: Gen[] }) {
  const [credits, setCredits] = useState(initialCredits);
  const [gens, setGens] = useState<Gen[]>(initialGenerations);
  const [mode, setMode] = useState<Mode>("text-to-video");
  const [preset, setPreset] = useState<string>("none");
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState<AspectRatio>("16:9");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Polling dyal videos li mazal katkhdem
  const poll = useCallback(async () => {
    const pending = gens.filter((g) => g.status === "running" || g.status === "queued");
    for (const g of pending) {
      const res = await fetch(`/api/generations/${g.id}`);
      if (!res.ok) continue;
      const data = await res.json();
      setGens((list) => list.map((x) => (x.id === g.id ? data.generation : x)));
      setCredits(data.credits);
    }
  }, [gens]);

  useEffect(() => {
    if (!gens.some((g) => g.status === "running" || g.status === "queued")) return;
    const t = setInterval(poll, 4000);
    return () => clearInterval(t);
  }, [gens, poll]);

  function pickImage(f: File | null) {
    setImage(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (credits < VIDEO_COST) return setError("not-enough");
    setBusy(true);
    const fd = new FormData();
    fd.set("mode", mode);
    fd.set("preset", preset);
    fd.set("prompt", prompt);
    fd.set("aspect_ratio", aspect);
    if (mode === "image-to-video" && image) fd.set("image", image);

    const res = await fetch("/api/generate", { method: "POST", body: fd });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setError(data.needCredits ? "not-enough" : data.error || "Error");
    setGens((list) => [data.generation, ...list]);
    setCredits((c) => c - VIDEO_COST);
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[380px_1fr]">
      <form onSubmit={generate} className="h-fit space-y-5 rounded-2xl border border-line bg-panel p-5 lg:sticky lg:top-20">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-bg p-1 text-sm">
          {(["text-to-video", "image-to-video"] as Mode[]).map((m) => (
            <button type="button" key={m} onClick={() => setMode(m)}
              className={`rounded-lg py-2 ${mode === m ? "bg-line font-medium" : "text-muted"}`}>
              {m === "text-to-video" ? "Text → Video" : "Image → Video"}
            </button>
          ))}
        </div>

        {mode === "image-to-video" && (
          <div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pickImage(e.target.files?.[0] ?? null)} />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-line text-sm text-muted hover:border-accent">
              {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : "Upload an image"}
            </button>
          </div>
        )}

        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} required
          placeholder="A fishing boat entering Essaouira port at sunset, seagulls flying…"
          className="w-full resize-none rounded-xl border border-line bg-bg p-3 text-sm outline-none focus:border-accent" />

        <div>
          <div className="mb-2 text-xs text-muted">Preset</div>
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button type="button" key={p.id} onClick={() => setPreset(p.id)}
                className={`rounded-lg border px-2 py-2 text-xs ${preset === p.id ? "border-accent bg-accent/10" : "border-line"}`}>
                <div className="text-base">{p.emoji}</div>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs text-muted">Format</div>
          <div className="flex gap-2">
            {ASPECT_RATIOS.map((a) => (
              <button type="button" key={a} onClick={() => setAspect(a)}
                className={`flex-1 rounded-lg border py-2 text-xs ${aspect === a ? "border-accent" : "border-line"}`}>{a}</button>
            ))}
          </div>
        </div>

        <button disabled={busy} className="btn-accent w-full rounded-xl py-3 font-semibold disabled:opacity-50">
          {busy ? "Starting…" : `Generate · ⚡ ${VIDEO_COST}`}
        </button>
        <div className="text-center text-xs text-muted">You have ⚡ {credits} credits</div>

        {error === "not-enough" ? (
          <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
            Not enough credits. <Link href="/pricing" className="underline">Buy credits</Link>
          </p>
        ) : error ? (
          <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
        ) : null}
      </form>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Your videos</h2>
        {gens.length === 0 && <p className="text-sm text-muted">Nothing yet. Generate your first video!</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          {gens.map((g) => (
            <div key={g.id} className="overflow-hidden rounded-2xl border border-line bg-panel">
              <div className="flex aspect-video items-center justify-center bg-black">
                {g.status === "done" && g.video_url ? (
                  <video src={g.video_url} controls loop playsInline className="h-full w-full object-contain" />
                ) : g.status === "failed" ? (
                  <span className="px-4 text-center text-sm text-red-300">Failed: credits refunded</span>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-sm text-muted">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
                    Generating… (~1–3 min)
                  </div>
                )}
              </div>
              <div className="flex items-start justify-between gap-3 p-3">
                <p className="line-clamp-2 text-xs text-muted">{g.prompt}</p>
                {g.status === "done" && g.video_url && (
                  <a href={g.video_url} download target="_blank" rel="noreferrer" className="shrink-0 text-xs text-accent">Download</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
