"use client";

import { useState } from "react";
import type { Product, ProductCategory } from "@/lib/types";
import { ALL_CATEGORIES } from "@/lib/filters";
import ProductGrid from "@/components/ui/ProductGrid";

export default function BrandProductsClient({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const categories = ALL_CATEGORIES.filter((c) => products.some((p) => p.category === c));
  const filtered = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`cursor-pointer border px-4 py-2 text-sm font-medium transition-colors ${
                category === c ? "border-accent bg-accent text-white" : "border-line hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink/50">No products in this category yet.</p>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}
