import Link from "next/link";
import { PRESETS } from "@/lib/config";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="py-20 text-center">
        <p className="mb-4 inline-block rounded-full border border-line px-3 py-1 text-xs text-muted">
          Text → Video · Image → Video
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Turn any idea into a <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">cinematic video</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          Write a prompt or upload a photo, pick a camera move, and get a 5-second AI video in about a minute.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/studio" className="btn-accent rounded-full px-6 py-3 font-semibold">Create a video</Link>
          <Link href="/pricing" className="rounded-full border border-line px-6 py-3">See pricing</Link>
        </div>
        <video src="/demo.mp4" autoPlay muted loop playsInline className="mx-auto mt-14 w-full max-w-3xl rounded-2xl border border-line" />
      </section>

      <section className="pb-24">
        <h2 className="mb-6 text-2xl font-semibold">Presets</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {PRESETS.filter((p) => p.id !== "none").map((p) => (
            <div key={p.id} className="rounded-xl border border-line bg-panel p-4">
              <div className="text-2xl">{p.emoji}</div>
              <div className="mt-2 text-sm font-medium">{p.name}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
