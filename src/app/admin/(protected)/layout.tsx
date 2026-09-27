import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/admin/auth";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
      <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
        <nav className="flex items-center gap-6">
          <Link href="/admin" className="font-heading font-extrabold">
            Admin
          </Link>
          <Link href="/admin/products" className="text-sm hover:text-accent">
            Products
          </Link>
          <Link href="/admin/brands" className="text-sm hover:text-accent">
            Brands
          </Link>
        </nav>
        <form action={logout}>
          <button type="submit" className="cursor-pointer text-sm text-ink/60 hover:text-accent">
            Log out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
