"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="border border-line bg-band px-6 py-8 text-center">
      <p className="font-heading text-lg font-bold">Something went wrong</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">{error.message}</p>
      <button
        onClick={reset}
        className="mt-5 cursor-pointer border border-line px-5 py-2 text-sm font-bold uppercase tracking-wide hover:border-ink"
      >
        Try again
      </button>
    </div>
  );
}
