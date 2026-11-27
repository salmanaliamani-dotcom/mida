import { getPublicSettings, saveSettings } from "@/lib/server/settings";
import { body, fail, json } from "@/lib/server/http";
import type { ProviderSettings, SecretKey } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return json(getPublicSettings());
}

/** PUT { providers?: Partial<ProviderSettings>, secrets?: { KEY: "value" | null } }  (null/"" removes a saved key) */
export async function PUT(req: Request) {
  try {
    const b = await body<{ providers?: Partial<ProviderSettings>; secrets?: Partial<Record<SecretKey, string | null>> }>(req);
    saveSettings(b);
    return json(getPublicSettings());
  } catch (e) {
    return fail(e);
  }
}
