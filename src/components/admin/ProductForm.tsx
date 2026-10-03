"use client";

import { useActionState } from "react";
import type { Brand, Product, ProductCategory } from "@/lib/types";
import type { ProductFormState } from "@/app/admin/(protected)/products/actions";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SmartImage from "@/components/ui/SmartImage";

const CATEGORIES: ProductCategory[] = ["Running", "Lifestyle", "Basketball", "Training"];
const initialState: ProductFormState = {};

export default function ProductForm({
  action,
  brands,
  initialValues,
  submitLabel,
}: {
  action: (prevState: ProductFormState | undefined, formData: FormData) => Promise<ProductFormState>;
  brands: Brand[];
  initialValues?: Product;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
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
            Slug (optional)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={initialValues?.slug}
            className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="brandId" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
            Brand
          </label>
          <select
            id="brandId"
            name="brandId"
            required
            defaultValue={initialValues?.brandId ?? ""}
            className="w-full cursor-pointer border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
          >
            <option value="" disabled>
              Select a brand
            </option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={initialValues?.category ?? ""}
            className="w-full cursor-pointer border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
          >
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
            Price (₹, optional — leave blank for &quot;Contact for price&quot;)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step="1"
            defaultValue={initialValues?.price ?? undefined}
            className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="salePrice" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
            Sale price (₹, optional)
          </label>
          <input
            id="salePrice"
            name="salePrice"
            type="number"
            min={0}
            step="1"
            defaultValue={initialValues?.salePrice}
            className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="colourway" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
          Colourway
        </label>
        <input
          id="colourway"
          name="colourway"
          type="text"
          defaultValue={initialValues?.colourway}
          className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="availableSizes"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50"
        >
          Available sizes (comma-separated, e.g. &quot;UK 7, UK 8, UK 9&quot;)
        </label>
        <input
          id="availableSizes"
          name="availableSizes"
          type="text"
          defaultValue={initialValues?.availableSizes}
          className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
          Description (one paragraph per line)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={initialValues?.description.join("\n")}
          className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="sizeFit" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50">
          Size &amp; fit (one paragraph per line)
        </label>
        <textarea
          id="sizeFit"
          name="sizeFit"
          rows={3}
          defaultValue={initialValues?.sizeFit.join("\n")}
          className="w-full border border-line bg-paper px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="soldOut"
            defaultChecked={initialValues?.soldOut}
            className="h-4 w-4 accent-accent"
          />
          Sold out
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="newArrival"
            defaultChecked={initialValues?.newArrival}
            className="h-4 w-4 accent-accent"
          />
          New arrival
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="bestSeller"
            defaultChecked={initialValues?.bestSeller}
            className="h-4 w-4 accent-accent"
          />
          Best seller
        </label>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink/50">Images</p>

        {initialValues && initialValues.images.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-3">
            {initialValues.images.map((url) => (
              <label key={url} className="flex flex-col items-center gap-1.5 text-xs">
                <SmartImage
                  src={url}
                  alt=""
                  width={80}
                  height={80}
                  className="h-20 w-20 border border-line object-cover"
                />
                <span className="flex items-center gap-1">
                  <input type="checkbox" name="keepImage" value={url} defaultChecked className="h-3.5 w-3.5 accent-accent" />
                  Keep
                </span>
              </label>
            ))}
          </div>
        )}

        <ImageUploadField name="images" />
        {initialValues && initialValues.images.length > 0 && (
          <p className="mt-2 text-xs text-ink/50">
            Uncheck &quot;Keep&quot; above on an existing image to remove it.
          </p>
        )}
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
