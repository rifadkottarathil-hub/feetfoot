import type { Metadata } from "next";
import { placeholderSvg } from "@/lib/placeholder";
import FadeIn from "@/components/ui/FadeIn";
import TextReveal from "@/components/ui/TextReveal";
import SmartImage from "@/components/ui/SmartImage";
import { getBrands } from "@/lib/data/brands";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Foot Feet is a multi-brand sneaker store based in India, stocking 100% authentic Nike, Adidas, New Balance, Puma and Asics.",
  openGraph: {
    title: "About Foot Feet | Foot Feet India",
    description:
      "Foot Feet is a multi-brand sneaker store based in India, stocking 100% authentic Nike, Adidas, New Balance, Puma and Asics.",
  },
};

export default async function AboutPage() {
  const brands = await getBrands();

  return (
    <>
      <section className="border-b border-line bg-band px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/50">About us</p>
          <TextReveal
            as="h1"
            trigger="mount"
            text="Sneakers, done properly."
            className="mt-2 block font-heading text-4xl font-extrabold sm:text-5xl"
          />
        </div>
      </section>

      <FadeIn as="section" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] bg-band">
          <SmartImage
            src={placeholderSvg("about-store", 0, "Foot Feet store interior")}
            alt="Inside the Foot Feet store"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-heading text-2xl font-extrabold">Who we are</h2>
          <p className="mt-4 text-sm text-ink/70">
            Foot Feet is a multi-brand sneaker store built for people who take their footwear
            seriously. We stock Nike, Adidas, New Balance, Puma and Asics side by side, so you can
            compare and choose without hopping between five different websites.
          </p>
          <p className="mt-4 text-sm text-ink/70">
            We started Foot Feet because sourcing genuine sneakers in India — at fair prices,
            with real sizing help — was harder than it should be. We built the store we wished
            existed.
          </p>
        </div>
      </FadeIn>

      <FadeIn as="section" className="border-y border-line bg-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-extrabold">Where we are</h2>
          <p className="mt-4 text-sm text-ink/70">
            Our flagship store and warehouse are based in Bengaluru, Karnataka. We ship pan-India,
            with Cash on Delivery available on eligible pincodes and free delivery over ₹2,000.
          </p>
        </div>
      </FadeIn>

      <FadeIn as="section" className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8">
        <h2 className="font-heading text-2xl font-extrabold">Why our products are authentic</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-ink/70">
          Every pair we sell is sourced directly from {brands.map((b) => b.name).join(", ")} or
          their authorised distributors in India — never from grey-market resellers. Each order
          ships with original packaging, tags and brand documentation, and every pair is
          inspected before it leaves our warehouse.
        </p>
      </FadeIn>
    </>
  );
}
