"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { priceLabel } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import Gallery from "@/components/product/Gallery";
import Accordion from "@/components/product/Accordion";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import ProductGrid from "@/components/ui/ProductGrid";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/Magnetic";
import TextReveal from "@/components/ui/TextReveal";

export default function ProductDetail({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const sizes = product.availableSizes.split(",").map((s) => s.trim());
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();
  const price = priceLabel(product);
  const label = `${product.brandName} ${product.name}`;

  const handleAddToCart = () => {
    if (!selectedSize || product.soldOut || product.price == null) return;
    addItem({
      slug: product.slug,
      name: product.name,
      brand: product.brandName,
      price: product.salePrice ?? product.price,
      size: selectedSize,
    });
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Gallery product={product} label={label} />

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ink/50">{product.brandName}</p>
          <TextReveal
            as="h1"
            trigger="mount"
            text={product.name}
            className="mt-1 block font-heading text-3xl font-extrabold"
          />

          <div className="mt-4 flex items-center gap-3">
            <span
              className={`text-xl ${
                price.onSale ? "font-bold text-accent" : price.hasPrice ? "font-semibold" : "text-ink/70"
              }`}
            >
              {price.text}
            </span>
            {price.original && <span className="text-lg text-ink/40 line-through">{price.original}</span>}
            {product.soldOut && (
              <span className="bg-ink px-2 py-1 text-xs font-bold uppercase tracking-wide text-paper">
                Sold out
              </span>
            )}
          </div>
          {price.hasPrice && <p className="mt-1 text-xs text-ink/50">Inclusive of GST</p>}

          <p className="mt-4 text-sm text-ink/70">Colourway: {product.colourway}</p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-ink/50">
                Select size (UK)
              </p>
              <SizeGuideModal />
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const sizeLabel = size.replace("UK ", "");
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={product.soldOut}
                    className={`h-11 min-w-11 cursor-pointer border px-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      active ? "border-accent bg-accent text-white" : "border-line hover:border-ink"
                    }`}
                  >
                    {sizeLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {product.soldOut ? (
            <Magnetic className="mt-6 block w-full" strength={0.15}>
              <button
                disabled
                className="w-full cursor-not-allowed bg-ink/20 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
              >
                Sold out
              </button>
            </Magnetic>
          ) : price.hasPrice ? (
            <>
              <Magnetic className="mt-6 block w-full" strength={0.15}>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="w-full cursor-pointer bg-accent py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-ink/20"
                >
                  {added ? "Added to cart" : "Add to cart"}
                </button>
              </Magnetic>
              {!selectedSize && <p className="mt-2 text-xs text-ink/50">Select a size to continue.</p>}
            </>
          ) : (
            <>
              <Magnetic className="mt-6 block w-full" strength={0.15}>
                <Link
                  href="/contact"
                  className="block w-full cursor-pointer bg-accent py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                >
                  Contact us for price
                </Link>
              </Magnetic>
              <p className="mt-2 text-xs text-ink/50">
                We&apos;ll get back to you with pricing{selectedSize ? ` for size ${selectedSize}` : ""}.
              </p>
            </>
          )}

          <div className="mt-10">
            <Accordion
              defaultOpen={0}
              items={[
                {
                  title: "Description",
                  content: (
                    <div className="flex flex-col gap-2">
                      {product.description.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  ),
                },
                {
                  title: "Size & fit",
                  content: (
                    <div className="flex flex-col gap-2">
                      {product.sizeFit.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  ),
                },
                {
                  title: "Shipping & returns",
                  content: (
                    <div className="flex flex-col gap-2">
                      <p>Free delivery on orders over ₹2,000. Standard delivery in 3–7 business days.</p>
                      <p>Cash on Delivery available across India.</p>
                      <p>14-day returns on unworn pairs in original packaging.</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <FadeIn as="section" className="mt-20">
          <TextReveal
            as="h2"
            text="You may also like"
            className="mb-8 block font-heading text-2xl font-extrabold"
          />
          <ProductGrid products={relatedProducts} />
        </FadeIn>
      )}
    </div>
  );
}
