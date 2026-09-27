"use server";

import { redirect } from "next/navigation";
import { verifyPassword, createSession } from "@/lib/admin/auth";

export interface LoginState {
  error?: string;
}

export async function login(_prevState: LoginState | undefined, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!verifyPassword(password)) {
    return { error: "Incorrect password." };
  }

  await createSession();
  redirect("/admin");
}
