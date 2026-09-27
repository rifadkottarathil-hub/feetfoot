"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Brand } from "@/lib/types";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ brands }: { brands: Brand[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // Assume transparent on first paint of a page that has a hero (avoids a
  // solid-then-transparent flash); the observer below corrects it right after.
  const [overHero, setOverHero] = useState(() => pathname === "/");
  const { count, openCart } = useCart();

  // Transparent only while a #hero-end marker (placed at the bottom of a page's
  // hero) is still on screen — pages without one (everything but the homepage
  // hero) just fall back to the solid header immediately.
  useEffect(() => {
    const marker = document.getElementById("hero-end");
    if (!marker) {
      // No hero marker on this route (or it hasn't mounted yet) — stay solid.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOverHero(false);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: "-71px 0px 0px 0px",
    });
    observer.observe(marker);
    return () => observer.disconnect();
  }, [pathname]);

  const transparent = overHero && !menuOpen;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        transparent ? "border-transparent bg-transparent" : "border-line bg-paper"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-4 transition-colors duration-300 lg:px-8 ${
          transparent ? "text-white" : "text-ink"
        }`}
      >
        <Link href="/" className="font-heading text-xl font-extrabold tracking-tight">
          FOOT FEET
        </Link>

        <nav className="hidden items-center gap-8 min-[992px]:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="text-sm font-medium uppercase tracking-wide hover:text-accent">
              Brands
            </button>
            <div className="invisible absolute left-0 top-full flex w-48 flex-col border border-line bg-paper py-2 text-ink opacity-0 shadow-sm transition-all duration-150 group-hover:visible group-hover:opacity-100">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brand/${brand.slug}`}
                  className="px-4 py-2 text-sm hover:bg-band"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={openCart} aria-label="Open cart" className="relative cursor-pointer p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 7h12l-1 13H7L6 7Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M9 7V6a3 3 0 0 1 6 0v1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="cursor-pointer p-2 min-[992px]:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-paper px-5 py-4 text-ink min-[992px]:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-base font-medium uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-2">
              <p className="py-1 text-xs font-bold uppercase tracking-wide text-ink/50">Brands</p>
            </li>
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={`/brand/${brand.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-base"
                >
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
