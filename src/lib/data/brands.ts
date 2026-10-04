import { getPublicSupabase } from "@/lib/supabase/public";
import { DEMO_MODE } from "@/lib/demoMode";
import { DEMO_BRANDS } from "@/lib/data/demoData";
import type { Brand } from "@/lib/types";

interface BrandRow {
  id: string;
  name: string;
  slug: string;
  short_description: string;
}

function mapBrandRow(row: BrandRow): Brand {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    shortDescription: row.short_description,
  };
}

export async function getBrands(): Promise<Brand[]> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase.from("brands").select("*").order("name");
  if (error) throw error;
  return (data ?? []).map(mapBrandRow);
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapBrandRow(data) : null;
}

export async function getBrandById(id: string): Promise<Brand | null> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase.from("brands").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapBrandRow(data) : null;
}

// Used by the public storefront only (never /admin), so demo mode never
// affects what the admin panel reads or writes.
export async function getPublicBrands(): Promise<Brand[]> {
  if (DEMO_MODE) return DEMO_BRANDS;
  return getBrands();
}

export async function getPublicBrandBySlug(slug: string): Promise<Brand | null> {
  if (DEMO_MODE) return DEMO_BRANDS.find((b) => b.slug === slug) ?? null;
  return getBrandBySlug(slug);
}
