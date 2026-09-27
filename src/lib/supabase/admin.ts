import "server-only";
import { createClient } from "@supabase/supabase-js";

const PRODUCT_IMAGES_BUCKET = "product-images";

/**
 * Service-role client. Bypasses Row Level Security — only ever import this
 * from server actions/route handlers that have already verified the admin
 * session. Never send this client or its key to the browser.
 */
export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. See .env.local.example."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export { PRODUCT_IMAGES_BUCKET };
