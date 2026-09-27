import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data/products";
import { getBrands } from "@/lib/data/brands";

const siteUrl = "https://www.footfeet.in";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  const staticRoutes = ["", "/shop", "/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const brandRoutes = brands.map((b) => ({
    url: `${siteUrl}/brand/${b.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...brandRoutes, ...productRoutes];
}
