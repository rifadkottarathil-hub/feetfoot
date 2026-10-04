import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";
import { getPublicProducts } from "@/lib/data/products";
import { getPublicBrands } from "@/lib/data/brands";

export const metadata: Metadata = {
  title: "Shop Sneakers & Sandals",
  description:
    "Browse sneakers and sandals at Foot Feet — Nike, Adidas, New Balance, Puma and Asics. Filter by brand, category, size and price.",
  openGraph: {
    title: "Shop Sneakers & Sandals | Foot Feet India",
    description:
      "Browse sneakers and sandals at Foot Feet — Nike, Adidas, New Balance, Puma and Asics. Filter by brand, category, size and price.",
  },
};

export default async function ShopPage() {
  const [products, brands] = await Promise.all([getPublicProducts(), getPublicBrands()]);

  return (
    <Suspense>
      <ShopClient products={products} brands={brands} />
    </Suspense>
  );
}
