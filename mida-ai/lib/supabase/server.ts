import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Supabase client li kaykhdem b session dyal user (RLS active). */
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Component: middleware kaydir refresh l session.
          }
        },
      },
    },
  );
}
