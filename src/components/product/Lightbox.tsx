"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/types";
import { productImage, productImageCount } from "@/lib/productImage";
import SmartImage from "@/components/ui/SmartImage";

export default function Lightbox({
  product,
  label,
  index,
  onIndexChange,
  onClose,
}: {
  product: Product;
  label: string;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const count = productImageCount(product);

  const goPrev = () => onIndexChange((index - 1 + count) % count);
  const goNext = () => onIndexChange((index + 1) % count);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && count > 1) goPrev();
      if (e.key === "ArrowRight" && count > 1) goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} — full screen image ${index + 1} of ${count}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close full screen view"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center text-3xl text-white/80 hover:text-white"
      >
        &times;
      </button>

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center text-white/80 hover:text-white sm:left-5"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <SmartImage
        src={productImage(product, index, label)}
        alt={`${label} — full screen view ${index + 1} of ${count}`}
        onClick={(e) => e.stopPropagation()}
        width={1600}
        height={1600}
        sizes="90vw"
        priority
        className="max-h-[85vh] max-w-[90vw] object-contain"
      />

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center text-white/80 hover:text-white sm:right-5"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {count > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
