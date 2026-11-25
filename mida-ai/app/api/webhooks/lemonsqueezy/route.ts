import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { creditsForVariant, verifySignature } from "@/lib/lemonsqueezy";

/** Lemon Squeezy kay3iyet hna mlli chi wa7d kaykhlles → kanzido lih credits. */
export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifySignature(raw, req.headers.get("x-signature")))
    return NextResponse.json({ error: "Bad signature" }, { status: 401 });

  const event = JSON.parse(raw);
  if (event?.meta?.event_name !== "order_created") return NextResponse.json({ ok: true });

  const attrs = event.data?.attributes ?? {};
  if (attrs.status !== "paid") return NextResponse.json({ ok: true });

  const userId: string | undefined = event.meta?.custom_data?.user_id;
  const credits = creditsForVariant(attrs.first_order_item?.variant_id);
  const orderId = String(event.data?.id ?? "");
  if (!userId || !credits || !orderId) return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const admin = createAdminClient();
  // Idempotent: ila order deja tsjjel, ma nzidouch credits merra khra
  const { error } = await admin
    .from("payments")
    .insert({ order_id: orderId, user_id: userId, credits, amount_cents: attrs.total ?? null });
  if (error) {
    if (error.code === "23505") return NextResponse.json({ ok: true, duplicate: true });
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  await admin.rpc("add_credits", { p_user: userId, p_amount: credits });
  return NextResponse.json({ ok: true });
}
