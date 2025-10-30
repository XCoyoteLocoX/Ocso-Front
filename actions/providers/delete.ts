"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProvider(providerId: string): Promise<void> {
  const headers = await authHeaders();

  const response = await fetch(`${API_URL}/providers/${providerId}`, {
    method: "DELETE",
    headers,
  });

  console.log("Status:", response.status);

  if (response.ok) {
    // ✅ Revalida la caché y redirige
    revalidateTag("dashboard:providers");
    redirect("/dashboard/providers");
  } else {
    // ❌ No retornes objeto — solo loguea
    const error = await response.text();
    console.error("Error al eliminar proveedor:", error);
    throw new Error("Error al eliminar proveedor");
  }
}
