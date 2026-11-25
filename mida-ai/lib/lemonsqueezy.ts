import "server-only";
import crypto from "node:crypto";
import { PACKS, type PackId } from "./config";

const API = "https://api.lemonsqueezy.com/v1";

export function variantForPack(packId: PackId): string | undefined {
  const pack = PACKS.find((p) => p.id === packId);
  return pack ? process.env[pack.envVariant] : undefined;
}

export function creditsForVariant(variantId: string | number): number | undefined {
  return PACKS.find((p) => process.env[p.envVariant] === String(variantId))?.credits;
}

export async function createCheckout(opts: { variantId: string; userId: string; email?: string }) {
  const res = await fetch(`${API}/checkouts`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: { email: opts.email, custom: { user_id: opts.userId } },
          product_options: { redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/studio?paid=1` },
        },
        relationships: {
          store: { data: { type: "stores", id: String(process.env.LEMONSQUEEZY_STORE_ID) } },
          variant: { data: { type: "variants", id: String(opts.variantId) } },
        },
      },
    }),
  });
  if (!res.ok) throw new Error(`Lemon Squeezy: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.data.attributes.url as string;
}

export function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(digest, "hex");
  const b = Buffer.from(signature, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
