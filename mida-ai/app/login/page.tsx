"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function emailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  async function googleLogin() {
    await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      {sent ? (
        <p className="mt-6 rounded-xl border border-line bg-panel p-4 text-sm">
          Check your inbox: we sent a login link to <b>{email}</b>.
        </p>
      ) : (
        <>
          <button onClick={googleLogin} className="mt-6 w-full rounded-xl border border-line bg-panel py-3 text-sm hover:bg-line">
            Continue with Google
          </button>
          <div className="my-5 text-center text-xs text-muted">or</div>
          <form onSubmit={emailLogin} className="space-y-3">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <button disabled={loading} className="btn-accent w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-50">
              {loading ? "Sending…" : "Send magic link"}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </>
      )}
    </main>
  );
}
