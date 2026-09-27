import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import { getBrands } from "@/lib/data/brands";

export const dynamic = "force-dynamic";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.footfeet.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Foot Feet India | Multi-Brand Sneaker Store",
    template: "%s | Foot Feet India",
  },
  description:
    "Foot Feet is India's multi-brand sneaker store, stocking authentic Nike, Adidas, New Balance, Puma and Asics with nationwide delivery and Cash on Delivery.",
  openGraph: {
    type: "website",
    siteName: "Foot Feet India",
    title: "Foot Feet India | Multi-Brand Sneaker Store",
    description:
      "Authentic Nike, Adidas, New Balance, Puma and Asics. Nationwide delivery, 14-day returns, Cash on Delivery available.",
    url: siteUrl,
  },
};

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const brands = await getBrands();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          <SmoothScroll />
          <Header brands={brands} />
          <main className="flex-1">{children}</main>
          <Footer brands={brands} />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
