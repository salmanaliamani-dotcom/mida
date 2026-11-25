import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PACKS, type PackId } from "@/lib/config";
import { createCheckout, variantForPack } from "@/lib/lemonsqueezy";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Login 9bel" }, { status: 401 });

  const { packId } = (await req.json()) as { packId: PackId };
  if (!PACKS.some((p) => p.id === packId)) return NextResponse.json({ error: "Pack ghalat" }, { status: 400 });

  const variantId = variantForPack(packId);
  if (!variantId || !process.env.LEMONSQUEEZY_API_KEY)
    return NextResponse.json({ error: "Khlas mazal ma mconfigurich (Lemon Squeezy)" }, { status: 503 });

  try {
    const url = await createCheckout({ variantId, userId: user.id, email: user.email });
    return NextResponse.json({ url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Checkout fchel" }, { status: 502 });
  }
}
