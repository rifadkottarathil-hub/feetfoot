import Link from "next/link";
import type { Brand } from "@/lib/types";

export default function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-line sm:grid-cols-5 sm:divide-y-0">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brand/${brand.slug}`}
            className="flex items-center justify-center px-4 py-8 text-center font-heading text-lg font-extrabold uppercase tracking-wide transition-colors hover:bg-band"
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
