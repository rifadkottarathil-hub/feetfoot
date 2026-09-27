"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { productImage, productImageCount } from "@/lib/productImage";
import Lightbox from "@/components/product/Lightbox";
import SmartImage from "@/components/ui/SmartImage";

export default function Gallery({ product, label }: { product: Product; label: string }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const count = productImageCount(product);
  const images = Array.from({ length: count }, (_, i) => i);
  const hasMultiple = count > 1;

  const goPrev = () => setActive((i) => (i - 1 + count) % count);
  const goNext = () => setActive((i) => (i + 1) % count);

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse">
      <div className="group relative aspect-square flex-1 overflow-hidden bg-band">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`View ${label} full screen`}
          className="block h-full w-full cursor-zoom-in"
        >
          <SmartImage
            src={productImage(product, active, label)}
            alt={`${label} — view ${active + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </button>

        {/* Expand hint */}
        <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-paper/80 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
              stroke="#111111"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center bg-paper/80 opacity-0 transition-opacity hover:bg-paper group-hover:opacity-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center bg-paper/80 opacity-0 transition-opacity hover:bg-paper group-hover:opacity-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-paper/80 px-2 py-0.5 text-xs font-medium">
              {active + 1} / {count}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar sm:flex-col">
          {images.map((i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${label}`}
              aria-current={active === i}
              className={`relative h-16 w-16 flex-shrink-0 border bg-band transition-colors sm:h-20 sm:w-20 ${
                active === i ? "border-ink" : "border-line"
              }`}
            >
              <SmartImage
                src={productImage(product, i, label)}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          product={product}
          label={label}
          index={active}
          onIndexChange={setActive}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
