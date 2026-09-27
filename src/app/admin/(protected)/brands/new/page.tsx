import BrandForm from "@/components/admin/BrandForm";
import { createBrand } from "../actions";

export default function NewBrandPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-extrabold">Add brand</h1>
      <BrandForm action={createBrand} submitLabel="Create brand" />
    </div>
  );
}
