import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicBrandBySlug, getPublicBrands } from "@/lib/data/brands";
import { getPublicProductsByBrand } from "@/lib/data/products";
import BrandProductsClient from "@/components/brand/BrandProductsClient";
import FadeIn from "@/components/ui/FadeIn";
import TextReveal from "@/components/ui/TextReveal";

// Pre-renders every current brand at build time so visitors never pay a
// cold-render cost; a brand added later (no redeploy yet) still renders
// and caches itself on its first visit, since dynamicParams defaults to true.
export async function generateStaticParams() {
  const brands = await getPublicBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getPublicBrandBySlug(slug);
  if (!brand) return {};

  const title = `${brand.name} Sneakers`;
  const description = `Shop authentic ${brand.name} sneakers at Foot Feet India. ${brand.shortDescription}`;

  return {
    title,
    description,
    openGraph: { title: `${title} | Foot Feet India`, description },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await getPublicBrandBySlug(slug);
  if (!brand) notFound();

  const allBrandProducts = await getPublicProductsByBrand(brand.slug);
  // Sandals live in their own tab on /shop rather than mixed in with shoes here.
  const brandProducts = allBrandProducts.filter((p) => p.category !== "Sandals");

  return (
    <>
      <section className="border-b border-line bg-band px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/50">Brand</p>
          <TextReveal
            as="h1"
            trigger="mount"
            text={brand.name}
            className="mt-1 block font-heading text-4xl font-extrabold"
          />
          <p className="mt-3 max-w-2xl text-base text-ink/70">{brand.shortDescription}</p>
        </div>
      </section>

      <FadeIn as="section" className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <BrandProductsClient products={brandProducts} />
      </FadeIn>
    </>
  );
}
