import { getBrands } from "@/lib/data/brands";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const brands = await getBrands();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-extrabold">Add product</h1>
      {brands.length === 0 ? (
        <p className="text-sm text-ink/60">
          Add a brand first — products need one to belong to.
        </p>
      ) : (
        <ProductForm action={createProduct} brands={brands} submitLabel="Create product" />
      )}
    </div>
  );
}
