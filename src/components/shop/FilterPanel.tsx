"use client";

import { ALL_CATEGORIES, ALL_SIZES, PRICE_MIN, PRICE_MAX, DEFAULT_FILTERS, type FilterState } from "@/lib/filters";
import type { Brand, ProductCategory } from "@/lib/types";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  brands: Brand[];
  hideCategoryFilter?: boolean;
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function FilterPanel({ filters, onChange, brands, hideCategoryFilter }: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <p className="font-heading text-sm font-bold uppercase tracking-wide">Filters</p>
        <button
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="cursor-pointer text-xs text-ink/50 underline hover:text-accent"
        >
          Clear all
        </button>
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-wide text-ink/50">Brand</legend>
        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <label key={brand.slug} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand.slug)}
                onChange={() =>
                  onChange({ ...filters, brands: toggleValue(filters.brands, brand.slug) })
                }
                className="h-4 w-4 accent-accent"
              />
              {brand.name}
            </label>
          ))}
        </div>
      </fieldset>

      {!hideCategoryFilter && (
        <fieldset>
          <legend className="mb-3 text-xs font-bold uppercase tracking-wide text-ink/50">Category</legend>
          <div className="flex flex-col gap-2">
            {ALL_CATEGORIES.map((category) => (
              <label key={category} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      categories: toggleValue<ProductCategory>(filters.categories, category),
                    })
                  }
                  className="h-4 w-4 accent-accent"
                />
                {category}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-wide text-ink/50">
          Size (UK)
        </legend>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => onChange({ ...filters, sizes: toggleValue(filters.sizes, size) })}
                className={`cursor-pointer border px-3 py-1.5 text-sm transition-colors ${
                  active ? "border-accent bg-accent text-white" : "border-line hover:border-ink"
                }`}
              >
                {size.replace("UK ", "")}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-wide text-ink/50">
          Price range
        </legend>
        <div className="flex items-center gap-3 text-sm">
          <input
            type="number"
            min={PRICE_MIN}
            max={filters.maxPrice}
            value={filters.minPrice}
            onChange={(e) =>
              onChange({ ...filters, minPrice: Number(e.target.value) || PRICE_MIN })
            }
            aria-label="Minimum price"
            className="w-full min-w-0 border border-line px-3 py-2 focus:border-ink focus:outline-none"
          />
          <span className="text-ink/40">&ndash;</span>
          <input
            type="number"
            min={filters.minPrice}
            max={PRICE_MAX}
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: Number(e.target.value) || PRICE_MAX })
            }
            aria-label="Maximum price"
            className="w-full min-w-0 border border-line px-3 py-2 focus:border-ink focus:outline-none"
          />
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-ink/50">Sale only</span>
        <span
          onClick={() => onChange({ ...filters, saleOnly: !filters.saleOnly })}
          className={`relative inline-flex h-6 w-11 items-center transition-colors ${
            filters.saleOnly ? "bg-accent" : "bg-line"
          }`}
        >
          <input
            type="checkbox"
            checked={filters.saleOnly}
            onChange={() => onChange({ ...filters, saleOnly: !filters.saleOnly })}
            className="sr-only"
          />
          <span
            className={`inline-block h-4 w-4 transform bg-white transition-transform ${
              filters.saleOnly ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </span>
      </label>
    </div>
  );
}
