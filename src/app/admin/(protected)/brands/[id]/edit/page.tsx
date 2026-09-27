import { notFound } from "next/navigation";
import { getBrandById } from "@/lib/data/brands";
import BrandForm from "@/components/admin/BrandForm";
import { updateBrand } from "../../actions";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = await getBrandById(id);
  if (!brand) notFound();

  const updateBrandWithId = updateBrand.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-extrabold">Edit {brand.name}</h1>
      <BrandForm action={updateBrandWithId} initialValues={brand} submitLabel="Save changes" />
    </div>
  );
}
