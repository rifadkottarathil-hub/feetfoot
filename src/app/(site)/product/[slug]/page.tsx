import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import ProductDetail from "@/components/product/ProductDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
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
  const [product, allProducts] = await Promise.all([getProductBySlug(slug), getProducts()]);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product, allProducts, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
