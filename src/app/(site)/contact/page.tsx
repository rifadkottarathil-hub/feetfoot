import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import FadeIn from "@/components/ui/FadeIn";
import TextReveal from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Foot Feet — sneaker sizing help, order questions or store visits. WhatsApp, email, and our Bengaluru store address.",
  openGraph: {
    title: "Contact Foot Feet | Foot Feet India",
    description:
      "Get in touch with Foot Feet — sneaker sizing help, order questions or store visits.",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-ink/50">Contact</p>
        <TextReveal
          as="h1"
          trigger="mount"
          text="Get in touch"
          className="mt-2 block font-heading text-4xl font-extrabold"
        />
        <p className="mx-auto mt-3 max-w-md text-sm text-ink/70">
          Questions about sizing, an order, or want to visit the store? We&apos;re happy to help.
        </p>
      </div>

      <FadeIn as="div" className="grid gap-12 lg:grid-cols-2">
        <ContactForm />

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink/50">
              WhatsApp
            </h2>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-base font-medium text-accent hover:underline"
            >
              +91 98765 43210
            </a>
          </div>

          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink/50">
              Store address
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              Foot Feet
              <br />
              12, 100 Feet Road, Indiranagar
              <br />
              Bengaluru, Karnataka 560038
              <br />
              India
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-ink/50">
              Find us
            </h2>
            <div className="aspect-[4/3] w-full border border-line sm:aspect-video">
              <iframe
                title="Foot Feet store location map"
                src="https://www.google.com/maps?q=Indiranagar,Bengaluru,Karnataka,India&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
