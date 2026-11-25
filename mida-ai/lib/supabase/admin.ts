import "server-only";
import { createClient } from "@supabase/supabase-js";

/** Service-role client: ghir f server. Kaydouz RLS, ma tsiftouch l browser abadan. */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
