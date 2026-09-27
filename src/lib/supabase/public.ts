import { createClient } from "@supabase/supabase-js";

/**
 * Public, anon-key client. Safe to use in Server Components for reads —
 * respects Row Level Security, which only allows SELECT on brands/products.
 * Never use this for writes.
 */
export function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. See .env.local.example."
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
