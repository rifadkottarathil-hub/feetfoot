import Link from "next/link";
import { getProducts } from "@/lib/data/products";
import { formatInr } from "@/lib/format";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-extrabold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90"
        >
          Add product
        </Link>
      </div>

      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-band">
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-ink/50">Name</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-ink/50">Brand</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-ink/50">Price</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-ink/50">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-ink/60">{product.brandName}</td>
                <td className="px-4 py-3">
                  {formatInr(product.salePrice ?? product.price)}
                  {product.salePrice && (
                    <span className="ml-1.5 text-ink/40 line-through">{formatInr(product.price)}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink/60">
                  {product.soldOut ? "Sold out" : product.newArrival ? "New" : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/products/${product.id}/edit`} className="hover:text-accent">
                      Edit
                    </Link>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`Delete ${product.name}? This can't be undone.`}
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
