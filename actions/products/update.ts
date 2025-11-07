"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProduct(productId: string, formData: FormData): Promise<void> {
  const headers = await authHeaders();

  // Convertir FormData a objeto plano
  const updatedProduct: Record<string, any> = {};
  for (const key of formData.keys()) {
    const value = formData.get(key);
    if (value) updatedProduct[key] = value;
  }

  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  console.log("Status:", response.status);

  if (response.ok) {
    // ✅ Revalidar caché y redirigir
    revalidateTag("dashboard:products");
    revalidateTag(`dashboard:products:${productId}`);
    redirect("/dashboard/products");
  } else {
    const errorText = await response.text();
    console.error("Error al actualizar producto:", errorText);
    throw new Error("Error al actualizar producto");
  }
}
