"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delayMs?: number;
}

export default function FadeIn({ children, as: Tag = "div", className, delayMs = 0 }: FadeInProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => setVisible(true), delayMs);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <Tag ref={ref} data-fade data-visible={visible} className={className}>
      {children}
    </Tag>
  );
}
