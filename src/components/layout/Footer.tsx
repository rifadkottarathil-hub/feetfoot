import Link from "next/link";
import type { Brand } from "@/lib/types";

export default function Footer({ brands }: { brands: Brand[] }) {
  return (
    <footer className="border-t border-line bg-band">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-heading text-lg font-extrabold">FOOT FEET</p>
          <p className="mt-3 text-sm text-ink/70">
            India&apos;s multi-brand sneaker store. Authentic Nike, Adidas, New Balance, Puma
            and Asics, delivered nationwide.
          </p>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wide">Shop</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink/70">
            <li><Link href="/shop" className="hover:text-ink">All products</Link></li>
            <li><Link href="/shop?sale=true" className="hover:text-ink">Sale</Link></li>
            {brands.map((b) => (
              <li key={b.slug}>
                <Link href={`/brand/${b.slug}`} className="hover:text-ink">{b.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wide">Company</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink/70">
            <li><Link href="/about" className="hover:text-ink">About us</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wide">Get in touch</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink/70">
            <li>Bengaluru, Karnataka, India</li>
            <li>
              <a href="https://wa.me/919876543210" className="hover:text-ink">
                WhatsApp: +91 98765 43210
              </a>
            </li>
            <li>
              <a href="mailto:hello@footfeet.in" className="hover:text-ink">hello@footfeet.in</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-5 py-5 text-xs text-ink/50 lg:px-8">
        © {new Date().getFullYear()} Foot Feet. All rights reserved.
      </div>
    </footer>
  );
}
