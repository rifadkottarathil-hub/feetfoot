"use client";

import { useEffect, useState } from "react";

const SIZE_ROWS = [
  { uk: "6", eu: "39.5", usM: "7", usW: "8.5" },
  { uk: "7", eu: "40.5", usM: "8", usW: "9.5" },
  { uk: "8", eu: "42", usM: "9", usW: "10.5" },
  { uk: "9", eu: "43.5", usM: "10", usW: "11.5" },
  { uk: "10", eu: "44.5", usM: "11", usW: "12.5" },
  { uk: "11", eu: "46", usM: "12", usW: "13.5" },
  { uk: "12", eu: "47", usM: "13", usW: "14.5" },
];

export default function SizeGuideModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer text-sm font-medium underline underline-offset-2 hover:text-accent"
      >
        Size guide
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto bg-paper p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold">Size guide</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close size guide"
                className="cursor-pointer p-1 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <p className="mb-4 text-sm text-ink/60">
              UK sizing is standard in India. Use the table below to convert to EU or US sizes.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-ink">
                    <th className="py-2 text-left font-heading uppercase tracking-wide">UK</th>
                    <th className="py-2 text-left font-heading uppercase tracking-wide">EU</th>
                    <th className="py-2 text-left font-heading uppercase tracking-wide">US (M)</th>
                    <th className="py-2 text-left font-heading uppercase tracking-wide">US (W)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_ROWS.map((row) => (
                    <tr key={row.uk} className="border-b border-line">
                      <td className="py-2 font-medium">{row.uk}</td>
                      <td className="py-2 text-ink/70">{row.eu}</td>
                      <td className="py-2 text-ink/70">{row.usM}</td>
                      <td className="py-2 text-ink/70">{row.usW}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
