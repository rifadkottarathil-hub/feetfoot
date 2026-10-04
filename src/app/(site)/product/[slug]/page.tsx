import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicProducts, getPublicProductBySlug, getRelatedProducts } from "@/lib/data/products";
import ProductDetail from "@/components/product/ProductDetail";

// Pre-renders every current product at build time so visitors never pay a
// cold-render cost; a product added later (no redeploy yet) still renders
// and caches itself on its first visit, since dynamicParams defaults to true.
export async function generateStaticParams() {
  const products = await getPublicProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);
  if (!product) return {};

  const title = `${product.brandName} ${product.name} | Foot Feet India`;
  const description = `${product.brandName} ${product.name} in ${product.colourway}. ${product.description[0] ?? ""}`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([getPublicProductBySlug(slug), getPublicProducts()]);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product, allProducts, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
