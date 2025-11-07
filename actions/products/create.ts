"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createProduct(formData: FormData): Promise<void> {
  const product: Record<string, any> = {};
  for (const key of formData.keys()) {
    product[key] = formData.get(key);
  }

  const headers = await authHeaders();

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (response.ok) {
    revalidateTag("dashboard:products");
    redirect("/dashboard/products");
  } else {
    const error = await response.text();
    console.error("Error al crear producto:", error);
    throw new Error("Error al crear producto");
  }
}
