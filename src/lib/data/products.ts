import { getPublicSupabase } from "@/lib/supabase/public";
import { getBrandBySlug } from "@/lib/data/brands";
import { DEMO_MODE } from "@/lib/demoMode";
import { DEMO_PRODUCTS } from "@/lib/data/demoData";
import type { Product, ProductCategory } from "@/lib/types";

const PRODUCT_SELECT = "*, brands(id, name, slug, short_description)";

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  brand_id: string;
  category: ProductCategory;
  price: number | string | null;
  sale_price: number | string | null;
  colourway: string;
  description: string[] | null;
  size_fit: string[] | null;
  available_sizes: string | null;
  images: string[] | null;
  sold_out: boolean;
  new_arrival: boolean;
  best_seller: boolean;
  brands: { id: string; name: string; slug: string; short_description: string } | null;
}

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    brandId: row.brand_id,
    brandSlug: row.brands?.slug ?? "",
    brandName: row.brands?.name ?? "",
    category: row.category,
    price: row.price != null ? Number(row.price) : null,
    salePrice: row.price != null && row.sale_price != null ? Number(row.sale_price) : undefined,
    colourway: row.colourway,
    description: row.description ?? [],
    sizeFit: row.size_fit ?? [],
    availableSizes: row.available_sizes ?? "",
    images: row.images ?? [],
    soldOut: row.sold_out,
    newArrival: row.new_arrival,
    bestSeller: row.best_seller,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapProductRow(row as unknown as ProductRow));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProductRow(data as unknown as ProductRow) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProductRow(data as unknown as ProductRow) : null;
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  const brand = await getBrandBySlug(brandSlug);
  if (!brand) return [];

  const supabase = getPublicSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("brand_id", brand.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapProductRow(row as unknown as ProductRow));
}

// Used by the public storefront only (never /admin), so demo mode never
// affects what the admin panel reads or writes.
export async function getPublicProducts(): Promise<Product[]> {
  if (DEMO_MODE) return DEMO_PRODUCTS;
  return getProducts();
}

export async function getPublicProductBySlug(slug: string): Promise<Product | null> {
  if (DEMO_MODE) return DEMO_PRODUCTS.find((p) => p.slug === slug) ?? null;
  return getProductBySlug(slug);
}

export async function getPublicProductsByBrand(brandSlug: string): Promise<Product[]> {
  if (DEMO_MODE) return DEMO_PRODUCTS.filter((p) => p.brandSlug === brandSlug);
  return getProductsByBrand(brandSlug);
}

export function getRelatedProducts(product: Product, allProducts: Product[], count = 4): Product[] {
  const sameBrandOrCategory = allProducts.filter(
    (p) =>
      p.slug !== product.slug &&
      (p.brandSlug === product.brandSlug || p.category === product.category)
  );
  const rest = allProducts.filter(
    (p) =>
      p.slug !== product.slug &&
      p.brandSlug !== product.brandSlug &&
      p.category !== product.category
  );
  return [...sameBrandOrCategory, ...rest].slice(0, count);
}
