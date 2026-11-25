"use client";

import { useState } from "react";

export default function BuyButton({ packId, highlight }: { packId: string; highlight?: boolean }) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packId }),
    });
    if (res.status === 401) return (window.location.href = "/login");
    const data = await res.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
    else alert(data.error || "Error");
  }

  return (
    <button
      onClick={buy}
      disabled={loading}
      className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-50 ${highlight ? "btn-accent" : "border border-line hover:bg-line"}`}
    >
      {loading ? "…" : "Buy"}
    </button>
  );
}
