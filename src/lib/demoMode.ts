/**
 * When on, the public storefront (not /admin) renders hardcoded sample
 * products/brands instead of querying Supabase — useful for showing off the
 * site before real inventory has been entered. Toggle via .env.local; never
 * enable this on the real production deployment.
 */
export const DEMO_MODE = process.env.DEMO_MODE === "true";
