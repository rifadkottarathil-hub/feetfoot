export type ProductCategory = "Running" | "Lifestyle" | "Basketball" | "Training" | "Sandals";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  brandSlug: string;
  brandName: string;
  category: ProductCategory;
  /** null means the product has no listed price — shown as "Contact for price". */
  price: number | null;
  salePrice?: number;
  colourway: string;
  description: string[];
  sizeFit: string[];
  availableSizes: string;
  soldOut: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  /** Real product photos from Supabase Storage. Empty until uploaded via the admin panel. */
  images: string[];
}
