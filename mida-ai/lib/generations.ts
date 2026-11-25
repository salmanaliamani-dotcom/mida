import "server-only";
import { createAdminClient } from "./supabase/admin";
import { pollVideo } from "./fal";

export type Generation = {
  id: string;
  mode: string;
  preset: string | null;
  model: string;
  prompt: string;
  image_url: string | null;
  aspect_ratio: string;
  cost: number;
  status: "queued" | "running" | "done" | "failed";
  fal_request_id: string | null;
  video_url: string | null;
  error: string | null;
  created_at: string;
  user_id: string;
};

/** Ila kanet generation mazal katkhdem, kanswlo fal.ai w kanupdatiw. Ila fchlat, kanrj3o credits. */
export async function refreshGeneration(gen: Generation): Promise<Generation> {
  if (gen.status !== "running" || !gen.fal_request_id) return gen;

  const result = await pollVideo(gen.model, gen.fal_request_id);
  if (result.state === "pending") return gen;

  const admin = createAdminClient();
  const patch =
    result.state === "done"
      ? { status: "done" as const, video_url: result.videoUrl, updated_at: new Date().toISOString() }
      : { status: "failed" as const, error: result.error, updated_at: new Date().toISOString() };

  // Update ghir ila mazal "running" (bach ma nrj3ouch credits jouj mrrat)
  const { data: updated } = await admin
    .from("generations")
    .update(patch)
    .eq("id", gen.id)
    .eq("status", "running")
    .select()
    .maybeSingle();

  if (updated && result.state === "failed") {
    await admin.rpc("add_credits", { p_user: gen.user_id, p_amount: gen.cost });
  }
  return (updated as Generation) ?? { ...gen, ...patch };
}
