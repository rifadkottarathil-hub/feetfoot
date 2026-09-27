import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";
import { getProducts } from "@/lib/data/products";
import { getBrands } from "@/lib/data/brands";

export const metadata: Metadata = {
  title: "Shop All Sneakers",
  description:
    "Browse every sneaker at Foot Feet — Nike, Adidas, New Balance, Puma and Asics. Filter by brand, category, size and price.",
  openGraph: {
    title: "Shop All Sneakers | Foot Feet India",
    description:
      "Browse every sneaker at Foot Feet — Nike, Adidas, New Balance, Puma and Asics. Filter by brand, category, size and price.",
  },
};

export default async function ShopPage() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <Suspense>
      <ShopClient products={products} brands={brands} />
    </Suspense>
  );
}
