import BuyButton from "@/components/BuyButton";
import { PACKS, VIDEO_COST } from "@/lib/config";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-center text-4xl font-bold">Simple credits</h1>
      <p className="mt-3 text-center text-muted">
        One 5-second video = {VIDEO_COST} credits. Credits never expire. Failed videos are refunded.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {PACKS.map((p) => {
          const popular = "popular" in p && p.popular;
          return (
            <div key={p.id} className={`rounded-2xl border bg-panel p-6 ${popular ? "border-accent" : "border-line"}`}>
              {popular && <div className="mb-2 text-xs font-semibold text-accent">MOST POPULAR</div>}
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="mt-2 text-4xl font-bold">{p.price}</div>
              <div className="mt-2 text-sm text-muted">
                {p.credits} credits · {Math.floor(p.credits / VIDEO_COST)} videos
              </div>
              <BuyButton packId={p.id} highlight={popular} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
