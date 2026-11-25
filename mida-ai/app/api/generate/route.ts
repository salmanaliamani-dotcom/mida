import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ASPECT_RATIOS, PRESETS, VIDEO_COST, buildPrompt, isPromptAllowed, type AspectRatio, type Mode } from "@/lib/config";
import { modelFor, submitVideo } from "@/lib/fal";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Login 9bel" }, { status: 401 });

  const form = await req.formData();
  const mode = String(form.get("mode")) as Mode;
  const presetId = String(form.get("preset") || "none");
  const userPrompt = String(form.get("prompt") || "").slice(0, 1000);
  const aspect = String(form.get("aspect_ratio") || "16:9") as AspectRatio;
  const image = form.get("image");

  if (mode !== "text-to-video" && mode !== "image-to-video")
    return NextResponse.json({ error: "Mode ghalat" }, { status: 400 });
  if (!ASPECT_RATIOS.includes(aspect)) return NextResponse.json({ error: "Format ghalat" }, { status: 400 });
  if (!PRESETS.some((p) => p.id === presetId)) return NextResponse.json({ error: "Preset ghalat" }, { status: 400 });
  if (userPrompt.trim().length < 3) return NextResponse.json({ error: "Kteb prompt" }, { status: 400 });
  if (!isPromptAllowed(userPrompt))
    return NextResponse.json({ error: "Had prompt ma msmo7ch" }, { status: 400 });

  const admin = createAdminClient();

  // Image-to-video: n7tto tswira f Supabase Storage
  let imageUrl: string | null = null;
  if (mode === "image-to-video") {
    if (!(image instanceof File) || image.size === 0)
      return NextResponse.json({ error: "Zid tswira" }, { status: 400 });
    if (!image.type.startsWith("image/") || image.size > MAX_IMAGE_BYTES)
      return NextResponse.json({ error: "Tswira khass tkoun image ≤ 8MB" }, { status: 400 });
    const ext = image.type.split("/")[1]?.replace(/[^a-z0-9]/g, "") || "png";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await admin.storage.from("inputs").upload(path, image, { contentType: image.type });
    if (upErr) return NextResponse.json({ error: "Upload fchel" }, { status: 500 });
    imageUrl = admin.storage.from("inputs").getPublicUrl(path).data.publicUrl;
  }

  // N9ss credits (atomic)
  const { data: ok, error: spendErr } = await admin.rpc("spend_credits", { p_user: user.id, p_amount: VIDEO_COST });
  if (spendErr) return NextResponse.json({ error: "Erreur f credits" }, { status: 500 });
  if (!ok) return NextResponse.json({ error: "Ma 3ndkch credits kafyin", needCredits: true }, { status: 402 });

  const prompt = buildPrompt(userPrompt, presetId);
  const model = modelFor(mode);

  const { data: gen, error: insErr } = await admin
    .from("generations")
    .insert({ user_id: user.id, mode, preset: presetId, model, prompt, image_url: imageUrl, aspect_ratio: aspect, cost: VIDEO_COST, status: "queued" })
    .select()
    .single();
  if (insErr || !gen) {
    await admin.rpc("add_credits", { p_user: user.id, p_amount: VIDEO_COST });
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }

  try {
    const requestId = await submitVideo({ mode, prompt, imageUrl, aspectRatio: aspect });
    const { data: running } = await admin
      .from("generations")
      .update({ status: "running", fal_request_id: requestId, updated_at: new Date().toISOString() })
      .eq("id", gen.id)
      .select()
      .single();
    return NextResponse.json({ generation: running });
  } catch (e) {
    await admin.from("generations").update({ status: "failed", error: e instanceof Error ? e.message : "submit failed" }).eq("id", gen.id);
    await admin.rpc("add_credits", { p_user: user.id, p_amount: VIDEO_COST });
    return NextResponse.json({ error: "Generation ma bdatch, credits rj3o lik" }, { status: 502 });
  }
}
