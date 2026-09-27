export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const CONTACT_FOR_PRICE = "Contact for price";

export interface PriceLabel {
  text: string;
  onSale: boolean;
  original?: string;
  hasPrice: boolean;
}

/** Centralises the "no price -> Contact for price" + sale-price display logic. */
export function priceLabel(product: { price: number | null; salePrice?: number }): PriceLabel {
  if (product.price == null) {
    return { text: CONTACT_FOR_PRICE, onSale: false, hasPrice: false };
  }
  if (product.salePrice != null) {
    return {
      text: formatInr(product.salePrice),
      onSale: true,
      original: formatInr(product.price),
      hasPrice: true,
    };
  }
  return { text: formatInr(product.price), onSale: false, hasPrice: true };
}
