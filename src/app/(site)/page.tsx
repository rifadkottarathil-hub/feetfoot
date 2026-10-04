import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import BrandStrip from "@/components/home/BrandStrip";
import PromoTiles from "@/components/home/PromoTiles";
import TrustRow from "@/components/home/TrustRow";
import Newsletter from "@/components/home/Newsletter";
import ProductGrid from "@/components/ui/ProductGrid";
import FadeIn from "@/components/ui/FadeIn";
import TextReveal from "@/components/ui/TextReveal";
import { getPublicProducts } from "@/lib/data/products";
import { getPublicBrands } from "@/lib/data/brands";

export const metadata: Metadata = {
  title: "Foot Feet India | Multi-Brand Sneaker Store",
  description:
    "Shop authentic Nike, Adidas, New Balance, Puma and Asics sneakers in India. Free delivery over ₹2,000, 14-day returns and Cash on Delivery.",
  openGraph: {
    title: "Foot Feet India | Multi-Brand Sneaker Store",
    description:
      "Shop authentic Nike, Adidas, New Balance, Puma and Asics sneakers in India. Free delivery over ₹2,000, 14-day returns and Cash on Delivery.",
  },
};

export default async function HomePage() {
  const [products, brands] = await Promise.all([getPublicProducts(), getPublicBrands()]);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);
  const sandals = products.filter((p) => p.category === "Sandals").slice(0, 4);

  return (
    <>
      <Hero />
      <BrandStrip brands={brands} />

      <FadeIn as="section" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between">
          <TextReveal
            as="h2"
            text="New arrivals"
            className="font-heading text-2xl font-extrabold sm:text-3xl"
          />
        </div>
        <ProductGrid products={newArrivals} />
      </FadeIn>

      <FadeIn as="section" className="border-y border-line bg-band px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <PromoTiles />
        </div>
      </FadeIn>

      <FadeIn as="section" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between">
          <TextReveal
            as="h2"
            text="Best sellers"
            className="font-heading text-2xl font-extrabold sm:text-3xl"
          />
        </div>
        <ProductGrid products={bestSellers} />
      </FadeIn>

      {sandals.length > 0 && (
        <FadeIn as="section" className="border-y border-line bg-band px-5 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between">
              <TextReveal
                as="h2"
                text="Sandals"
                className="font-heading text-2xl font-extrabold sm:text-3xl"
              />
              <Link
                href="/shop?section=sandals"
                className="text-sm font-medium uppercase tracking-wide underline hover:text-accent"
              >
                Shop sandals
              </Link>
            </div>
            <ProductGrid products={sandals} />
          </div>
        </FadeIn>
      )}

      <FadeIn as="section" className="border-y border-line px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <TrustRow />
        </div>
      </FadeIn>

      <FadeIn as="section" className="bg-band px-5 py-14 lg:px-8 lg:py-20">
        <Newsletter />
      </FadeIn>
    </>
  );
}
