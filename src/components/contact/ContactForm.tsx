"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-line p-8 text-center">
        <p className="font-heading text-lg font-bold">Message sent</p>
        <p className="mt-2 text-sm text-ink/70">
          Thanks for reaching out — our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-5"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-line px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-line px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full border border-line px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
      >
        Send message
      </button>
    </form>
  );
}
