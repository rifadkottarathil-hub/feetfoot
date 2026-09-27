import type { Product, ProductCategory } from "@/lib/types";

export const ALL_CATEGORIES: ProductCategory[] = ["Running", "Lifestyle", "Basketball", "Training"];
export const ALL_SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];
export const PRICE_MIN = 3000;
export const PRICE_MAX = 18000;

export type SortOption = "newest" | "price-asc" | "price-desc";

export interface FilterState {
  brands: string[];
  categories: ProductCategory[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  saleOnly: boolean;
  sort: SortOption;
}

export const DEFAULT_FILTERS: FilterState = {
  brands: [],
  categories: [],
  sizes: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  saleOnly: false,
  sort: "newest",
};

export function effectivePrice(product: Product): number | null {
  if (product.price == null) return null;
  return product.salePrice ?? product.price;
}

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  let result = products.filter((p) => {
    if (filters.brands.length > 0 && !filters.brands.includes(p.brandSlug)) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
    if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.availableSizes.includes(s))) {
      return false;
    }
    // "Contact for price" items aren't bounded by a price range, so they always pass this check.
    const price = effectivePrice(p);
    if (price != null && (price < filters.minPrice || price > filters.maxPrice)) return false;
    if (filters.saleOnly && typeof p.salePrice !== "number") return false;
    return true;
  });

  if (filters.sort === "price-asc" || filters.sort === "price-desc") {
    const direction = filters.sort === "price-asc" ? 1 : -1;
    result = [...result].sort((a, b) => {
      const pa = effectivePrice(a);
      const pb = effectivePrice(b);
      // Push "Contact for price" items to the end regardless of sort direction.
      if (pa == null && pb == null) return 0;
      if (pa == null) return 1;
      if (pb == null) return -1;
      return (pa - pb) * direction;
    });
  }

  return result;
}
