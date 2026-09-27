"use client";

import { Fragment, useEffect, useRef, type ElementType } from "react";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  trigger?: "mount" | "scroll";
  delay?: number;
}

export default function TextReveal({
  text,
  as: Tag = "span",
  className,
  trigger = "scroll",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const words = text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(container.querySelectorAll("[data-word-inner]"), { yPercent: 0, opacity: 1 });
      return;
    }

    const targets = container.querySelectorAll("[data-word-inner]");
    const tween = gsap.fromTo(
      targets,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.045,
        delay,
        scrollTrigger:
          trigger === "scroll" ? { trigger: container, start: "top 85%", once: true } : undefined,
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [trigger, delay]);

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden="true" className="inline-block overflow-hidden align-top">
            <span data-word-inner className="inline-block">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
