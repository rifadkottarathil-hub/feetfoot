"use client";

import { useActionState } from "react";
import type { Brand } from "@/lib/types";
import type { BrandFormState } from "@/app/admin/(protected)/brands/actions";

const initialState: BrandFormState = {};

export default function BrandForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: BrandFormState | undefined, formData: FormData) => Promise<BrandFormState>;
  initialValues?: Brand;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initialValues?.name}
          className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="slug" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
          Slug (optional — generated from name if left blank)
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          defaultValue={initialValues?.slug}
          className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="shortDescription"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50"
        >
          Short description
        </label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          rows={3}
          defaultValue={initialValues?.shortDescription}
          className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      </div>

      {state?.error && <p className="text-sm text-accent">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer self-start bg-accent px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
