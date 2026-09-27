import Link from "next/link";
import { getBrands } from "@/lib/data/brands";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { deleteBrand } from "./actions";

export default async function AdminBrandsPage() {
  const brands = await getBrands();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-extrabold">Brands</h1>
        <Link
          href="/admin/brands/new"
          className="bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90"
        >
          Add brand
        </Link>
      </div>

      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-band">
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-ink/50">Name</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-ink/50">Slug</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3 font-medium">{brand.name}</td>
                <td className="px-4 py-3 text-ink/60">{brand.slug}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/brands/${brand.id}/edit`} className="hover:text-accent">
                      Edit
                    </Link>
                    <form action={deleteBrand.bind(null, brand.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`Delete ${brand.name}? This can't be undone.`}
                        className="cursor-pointer text-ink/60 hover:text-accent"
                      >
                        Delete
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
