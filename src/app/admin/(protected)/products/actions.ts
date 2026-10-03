"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSupabase, PRODUCT_IMAGES_BUCKET } from "@/lib/supabase/admin";
import { slugify } from "@/lib/admin/slugify";
import type { ProductCategory } from "@/lib/types";

export interface ProductFormState {
  error?: string;
}

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseProductForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const brandId = String(formData.get("brandId") ?? "");
  const category = String(formData.get("category") ?? "") as ProductCategory;
  const priceRaw = String(formData.get("price") ?? "").trim();
  const price = priceRaw ? Number(priceRaw) : null;
  const salePriceRaw = String(formData.get("salePrice") ?? "").trim();

  return {
    name,
    slug: slugInput ? slugify(slugInput) : slugify(name),
    brandId,
    category,
    price,
    // A sale price only makes sense alongside a real price.
    salePrice: price != null && salePriceRaw ? Number(salePriceRaw) : null,
    colourway: String(formData.get("colourway") ?? "").trim(),
    description: linesToArray(formData.get("description")),
    sizeFit: linesToArray(formData.get("sizeFit")),
    availableSizes: String(formData.get("availableSizes") ?? "").trim(),
    soldOut: formData.get("soldOut") === "on",
    newArrival: formData.get("newArrival") === "on",
    bestSeller: formData.get("bestSeller") === "on",
  };
}

async function uploadNewImages(formData: FormData): Promise<string[]> {
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return [];

  const supabase = getAdminSupabase();
  const urls: string[] = [];
  for (const file of files) {
    const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
    const path = `${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(path, buffer, { contentType: file.type || "image/jpeg" });
    if (error) throw new Error(`Image upload failed: ${error.message}`);
    const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

export async function createProduct(
  _prevState: ProductFormState | undefined,
  formData: FormData
): Promise<ProductFormState> {
  const parsed = parseProductForm(formData);
  if (!parsed.name || !parsed.brandId || !parsed.category) {
    return { error: "Name, brand and category are required." };
  }
  if (parsed.price != null && Number.isNaN(parsed.price)) {
    return { error: "Price must be a number." };
  }

  let images: string[];
  try {
    images = await uploadNewImages(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Image upload failed." };
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase.from("products").insert({
    name: parsed.name,
    slug: parsed.slug,
    brand_id: parsed.brandId,
    category: parsed.category,
    price: parsed.price,
    sale_price: parsed.salePrice,
    colourway: parsed.colourway,
    description: parsed.description,
    size_fit: parsed.sizeFit,
    available_sizes: parsed.availableSizes,
    images,
    sold_out: parsed.soldOut,
    new_arrival: parsed.newArrival,
    best_seller: parsed.bestSeller,
  });
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState | undefined,
  formData: FormData
): Promise<ProductFormState> {
  const parsed = parseProductForm(formData);
  if (!parsed.name || !parsed.brandId || !parsed.category) {
    return { error: "Name, brand and category are required." };
  }
  if (parsed.price != null && Number.isNaN(parsed.price)) {
    return { error: "Price must be a number." };
  }

  const keepImages = formData.getAll("keepImage").map(String);

  let newImages: string[];
  try {
    newImages = await uploadNewImages(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Image upload failed." };
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("products")
    .update({
      name: parsed.name,
      slug: parsed.slug,
      brand_id: parsed.brandId,
      category: parsed.category,
      price: parsed.price,
      sale_price: parsed.salePrice,
      colourway: parsed.colourway,
      description: parsed.description,
      size_fit: parsed.sizeFit,
      available_sizes: parsed.availableSizes,
      images: [...keepImages, ...newImages],
      sold_out: parsed.soldOut,
      new_arrival: parsed.newArrival,
      best_seller: parsed.bestSeller,
    })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function deleteProduct(id: string): Promise<void> {
  const supabase = getAdminSupabase();

  const { data: product } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  if (product?.images?.length) {
    const paths = product.images
      .map((url: string) => url.split(`/${PRODUCT_IMAGES_BUCKET}/`)[1])
      .filter((p: string | undefined): p is string => Boolean(p));
    if (paths.length) {
      await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove(paths);
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/", "layout");
  revalidatePath("/admin/products");
}
