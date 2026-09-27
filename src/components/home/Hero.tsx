"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = videoRef.current;

    if (video) {
      if (reduced) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay can still be blocked by the browser — the poster/first frame stays visible.
        });
      }
    }

    if (reduced) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <section className="relative -mt-[71px] flex h-screen min-h-[560px] items-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/nike.webm" type="video/webm" />
        <source src="/images/nike.mp4" type="video/mp4" />
      </video>

      {/* Slight dark tint so white type stays legible over the footage. */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div ref={contentRef} className="max-w-xl opacity-0">
          <TextReveal
            as="h1"
            trigger="mount"
            text="Foot Feet"
            className="block font-heading text-5xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl"
          />
          <p className="mt-5 max-w-md text-base text-white/80">
            India&apos;s home for authentic Nike, Adidas, New Balance, Puma and Asics.
          </p>
          <div className="mt-7">
            <Magnetic>
              <Link
                href="/shop"
                className="inline-block bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              >
                Shop now
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Marks where the hero ends, so the sticky header knows when to stop being transparent. */}
      <div id="hero-end" className="absolute bottom-0 left-0 h-px w-full" aria-hidden="true" />
    </section>
  );
}
