"use client";

import { useState } from "react";
import Magnetic from "@/components/ui/Magnetic";
import TextReveal from "@/components/ui/TextReveal";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-xl text-center">
      <TextReveal
        as="h2"
        text="Stay in the loop"
        className="font-heading text-2xl font-extrabold sm:text-3xl"
      />
      <p className="mt-2 text-sm text-ink/70">
        New drops, restocks and sale alerts — straight to your inbox.
      </p>
      {submitted ? (
        <p className="mt-6 text-sm font-medium text-accent">You&apos;re on the list. Thanks!</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full flex-1 border border-line bg-paper px-4 py-3 text-sm focus:border-ink focus:outline-none"
          />
          <Magnetic className="w-full sm:w-auto">
            <button
              type="submit"
              className="w-full cursor-pointer bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              Sign up
            </button>
          </Magnetic>
        </form>
      )}
    </div>
  );
}
