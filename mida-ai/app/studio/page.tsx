import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Studio from "@/components/Studio";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: generations }] = await Promise.all([
    supabase.from("profiles").select("credits").eq("id", user.id).single(),
    supabase.from("generations").select("*").order("created_at", { ascending: false }).limit(30),
  ]);

  return <Studio initialCredits={profile?.credits ?? 0} initialGenerations={generations ?? []} />;
}
