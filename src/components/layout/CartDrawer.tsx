"use client";

import { useCart } from "@/context/CartContext";
import { formatInr } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-paper transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-heading text-lg font-bold">Your cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="cursor-pointer p-1 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-ink/60">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={`${item.slug}-${item.size}`} className="flex gap-3 border-b border-line pb-4">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-ink/50">{item.brand}</p>
                    <p className="font-heading text-sm font-bold">{item.name}</p>
                    <p className="text-xs text-ink/60">Size {item.size}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        className="h-6 w-6 cursor-pointer border border-line text-sm"
                        onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        &minus;
                      </button>
                      <span className="w-4 text-center text-sm">{item.qty}</span>
                      <button
                        className="h-6 w-6 cursor-pointer border border-line text-sm"
                        onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                      <button
                        className="ml-auto cursor-pointer text-xs text-ink/50 underline"
                        onClick={() => removeItem(item.slug, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{formatInr(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line px-5 py-4">
          <div className="mb-3 flex items-center justify-between font-heading text-sm font-bold">
            <span>Subtotal</span>
            <span>{formatInr(subtotal)}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full cursor-pointer bg-accent py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors disabled:cursor-not-allowed disabled:bg-ink/20"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
