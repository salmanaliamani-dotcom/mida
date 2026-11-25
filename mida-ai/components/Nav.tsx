import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Nav() {
  let email: string | undefined;
  let credits: number | undefined;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      email = user.email;
      const { data } = await supabase.from("profiles").select("credits").eq("id", user.id).single();
      credits = data?.credits;
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <img src="/icon.svg" alt="" className="h-7 w-7" />
          Mida AI
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/pricing" className="text-muted hover:text-white">Pricing</Link>
          {email ? (
            <>
              <Link href="/studio" className="text-muted hover:text-white">Studio</Link>
              <span className="rounded-full border border-line px-3 py-1">⚡ {credits ?? 0}</span>
            </>
          ) : (
            <Link href="/login" className="btn-accent rounded-full px-4 py-1.5 font-medium">Start</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
