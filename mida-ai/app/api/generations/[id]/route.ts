import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { refreshGeneration, type Generation } from "@/lib/generations";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Login 9bel" }, { status: 401 });

  // RLS: user kaychouf ghir dyalo
  const { data: gen } = await supabase.from("generations").select("*").eq("id", id).maybeSingle();
  if (!gen) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const fresh = await refreshGeneration(gen as Generation);
  const { data: profile } = await supabase.from("profiles").select("credits").eq("id", user.id).single();
  return NextResponse.json({ generation: fresh, credits: profile?.credits ?? 0 });
}
