"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5">
      <h1 className="font-heading text-2xl font-extrabold">Admin login</h1>
      <p className="mt-2 text-sm text-ink/60">Enter the admin password to manage the catalog.</p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full border border-line bg-paper px-4 py-3 text-sm focus:border-ink focus:outline-none"
          />
        </div>

        {state?.error && <p className="text-sm text-accent">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Checking..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
