"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProduct(productId: string): Promise<void> {
  const headers = await authHeaders();

  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
    headers,
  });

  console.log("Status:", response.status);

  if (response.ok) {
    // ✅ Revalida la caché y redirige
    revalidateTag("dashboard:products");
    redirect("/dashboard/products");
  } else {
    // ❌ No retornes objeto — solo loguea
    const error = await response.text();
    console.error("Error al eliminar producto:", error);
    throw new Error("Error al eliminar producto");
  }
}
