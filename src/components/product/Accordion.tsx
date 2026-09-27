"use client";

import { useState, type ReactNode } from "react";

interface AccordionItemData {
  title: string;
  content: ReactNode;
}

export default function Accordion({ items, defaultOpen = 0 }: { items: AccordionItemData[]; defaultOpen?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="border-b border-line">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between py-4 text-left"
            >
              <span className="font-heading text-sm font-bold uppercase tracking-wide">
                {item.title}
              </span>
              <span className="text-xl leading-none">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className="pb-4 text-sm text-ink/70">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
