"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Brand, Product, ProductCategory } from "@/lib/types";
import { applyFilters, DEFAULT_FILTERS, type FilterState, type SortOption } from "@/lib/filters";
import FilterPanel from "@/components/shop/FilterPanel";
import ProductCard from "@/components/ui/ProductCard";
import TextReveal from "@/components/ui/TextReveal";

type Section = "shoes" | "sandals";

export default function ShopClient({ products, brands }: { products: Product[]; brands: Brand[] }) {
  const searchParams = useSearchParams();
  const [section, setSection] = useState<Section>("shoes");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category") as ProductCategory | null;
    const saleParam = searchParams.get("sale");
    const sectionParam = searchParams.get("section");

    // One-time sync from the initial URL (e.g. links from the brand strip or promo tiles).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters((prev) => ({
      ...prev,
      brands: brandParam && brands.some((b) => b.slug === brandParam) ? [brandParam] : prev.brands,
      categories: categoryParam ? [categoryParam] : prev.categories,
      saleOnly: saleParam === "true" ? true : prev.saleOnly,
    }));
    if (sectionParam === "sandals") {
      setSection("sandals");
    }
    // Only read the URL once, on first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function switchSection(next: Section) {
    setSection(next);
    setFilters(DEFAULT_FILTERS);
  }

  const sectionProducts = products.filter((p) =>
    section === "sandals" ? p.category === "Sandals" : p.category !== "Sandals"
  );
  const filtered = applyFilters(sectionProducts, filters);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <TextReveal
          as="h1"
          trigger="mount"
          text="Shop all"
          className="block font-heading text-2xl font-extrabold sm:text-3xl"
        />
        <p className="text-sm text-ink/50">{filtered.length} products</p>
      </div>

      <div className="relative mb-6 grid grid-cols-2 border-b border-line">
        {(["shoes", "sandals"] as const).map((s) => (
          <button
            key={s}
            onClick={() => switchSection(s)}
            className={`cursor-pointer py-4 text-center text-sm font-bold uppercase tracking-wide transition-colors ${
              section === s ? "text-ink" : "text-ink/40 hover:text-ink/70"
            }`}
          >
            {s === "shoes" ? "Shoes" : "Sandals"}
          </button>
        ))}
        <span
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-[2px] w-1/2 bg-accent transition-transform duration-300 ease-out ${
            section === "sandals" ? "translate-x-full" : "translate-x-0"
          }`}
        />
      </div>

      <div className="mb-6 flex items-center justify-between gap-4 border-y border-line py-3">
        <button
          onClick={() => setSheetOpen(true)}
          className="cursor-pointer text-sm font-bold uppercase tracking-wide min-[992px]:hidden"
        >
          Filters
        </button>
        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="hidden sm:inline text-ink/50">Sort by</span>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value as SortOption })}
            className="cursor-pointer border border-line bg-paper px-3 py-2 focus:border-ink focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-10 min-[992px]:grid-cols-[240px_1fr]">
        <aside className="hidden min-[992px]:block">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            brands={brands}
            hideCategoryFilter={section === "sandals"}
          />
        </aside>

        <div>
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-ink/50">
              No products match those filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 min-[992px]:hidden ${
          sheetOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSheetOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-none bg-paper p-5 transition-transform duration-300 ease-out min-[992px]:hidden ${
          sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-heading text-base font-bold">Filters</p>
          <button
            onClick={() => setSheetOpen(false)}
            aria-label="Close filters"
            className="cursor-pointer p-1 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          brands={brands}
          hideCategoryFilter={section === "sandals"}
        />
        <button
          onClick={() => setSheetOpen(false)}
          className="mt-8 w-full cursor-pointer bg-accent py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Show {filtered.length} results
        </button>
      </div>
    </div>
  );
}
