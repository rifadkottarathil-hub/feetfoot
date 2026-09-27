import Link from "next/link";
import { getProducts } from "@/lib/data/products";
import { getBrands } from "@/lib/data/brands";

export default async function AdminDashboard() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  const soldOutCount = products.filter((p) => p.soldOut).length;

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border border-line p-5">
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs uppercase tracking-wide text-ink/50">Products</p>
        </div>
        <div className="border border-line p-5">
          <p className="text-2xl font-bold">{brands.length}</p>
          <p className="text-xs uppercase tracking-wide text-ink/50">Brands</p>
        </div>
        <div className="border border-line p-5">
          <p className="text-2xl font-bold">{soldOutCount}</p>
          <p className="text-xs uppercase tracking-wide text-ink/50">Sold out</p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/admin/products/new"
          className="bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90"
        >
          Add product
        </Link>
        <Link
          href="/admin/brands/new"
          className="border border-line px-5 py-2.5 text-sm font-bold uppercase tracking-wide hover:border-ink"
        >
          Add brand
        </Link>
      </div>
    </div>
  );
}
