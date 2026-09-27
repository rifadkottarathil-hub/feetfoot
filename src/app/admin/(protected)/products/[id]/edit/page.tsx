import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data/products";
import { getBrands } from "@/lib/data/brands";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, brands] = await Promise.all([getProductById(id), getBrands()]);
  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-extrabold">Edit {product.name}</h1>
      <ProductForm
        action={updateProductWithId}
        brands={brands}
        initialValues={product}
        submitLabel="Save changes"
      />
    </div>
  );
}
