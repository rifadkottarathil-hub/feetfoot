"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { slugify } from "@/lib/admin/slugify";

export interface BrandFormState {
  error?: string;
}

function parseBrandForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  return { name, slug: slugInput ? slugify(slugInput) : slugify(name), shortDescription };
}

export async function createBrand(
  _prevState: BrandFormState | undefined,
  formData: FormData
): Promise<BrandFormState> {
  const { name, slug, shortDescription } = parseBrandForm(formData);
  if (!name) return { error: "Name is required." };

  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("brands")
    .insert({ name, slug, short_description: shortDescription });
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/admin/brands");
}

export async function updateBrand(
  id: string,
  _prevState: BrandFormState | undefined,
  formData: FormData
): Promise<BrandFormState> {
  const { name, slug, shortDescription } = parseBrandForm(formData);
  if (!name) return { error: "Name is required." };

  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("brands")
    .update({ name, slug, short_description: shortDescription })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/admin/brands");
}

export async function deleteBrand(id: string): Promise<void> {
  const supabase = getAdminSupabase();
  const { error } = await supabase.from("brands").delete().eq("id", id);
  if (error) {
    throw new Error(
      "Can't delete a brand that still has products. Remove or reassign its products first."
    );
  }
  revalidatePath("/", "layout");
  revalidatePath("/admin/brands");
}
