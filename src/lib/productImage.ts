import type { Product } from "@/lib/types";
import { placeholderSvg } from "@/lib/placeholder";

const PLACEHOLDER_GALLERY_SIZE = 2;

/** Real photo when the product has one at this index, otherwise the illustrated placeholder. */
export function productImage(product: Product, index: number, label: string): string {
  return product.images[index] ?? placeholderSvg(product.slug, index, label);
}

export function productImageCount(product: Product): number {
  return product.images.length > 0 ? product.images.length : PLACEHOLDER_GALLERY_SIZE;
}
