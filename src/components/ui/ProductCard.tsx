"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { productImage, productImageCount } from "@/lib/productImage";
import { formatInr } from "@/lib/format";
import SmartImage from "@/components/ui/SmartImage";

const CARD_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw";

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const onSale = typeof product.salePrice === "number";
  const secondImageAvailable = productImageCount(product) > 1;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-band">
        <SmartImage
          src={productImage(product, 0, `${product.brandName} ${product.name}`)}
          alt={`${product.brandName} ${product.name} — ${product.colourway}`}
          fill
          sizes={CARD_SIZES}
          className={`object-cover transition-all duration-300 ease-out group-hover:scale-[1.03] ${
            hovered && secondImageAvailable ? "opacity-0" : "opacity-100"
          }`}
        />
        {secondImageAvailable && (
          <SmartImage
            src={productImage(product, 1, `${product.brandName} ${product.name}`)}
            alt=""
            fill
            sizes={CARD_SIZES}
            className={`object-cover transition-all duration-300 ease-out group-hover:scale-[1.03] ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div className="absolute left-3 top-3 flex gap-2">
          {onSale && (
            <span className="bg-accent px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Sale
            </span>
          )}
          {product.soldOut && (
            <span className="bg-ink px-2 py-1 text-xs font-bold uppercase tracking-wide text-paper">
              Sold out
            </span>
          )}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wide text-ink/50">{product.brandName}</p>
        <p className="font-heading text-sm font-bold">{product.name}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className={`text-sm ${onSale ? "font-bold text-accent" : "font-medium"}`}>
            {formatInr(product.salePrice ?? product.price)}
          </span>
          {onSale && (
            <span className="text-sm text-ink/40 line-through">{formatInr(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
