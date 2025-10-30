"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProvider(providerId: string, formData: FormData): Promise<void> {
  const headers = await authHeaders();

  // Convertir FormData a objeto plano
  const updatedProvider: Record<string, any> = {};
  for (const key of formData.keys()) {
    const value = formData.get(key);
    if (value) updatedProvider[key] = value;
  }

  const response = await fetch(`${API_URL}/providers/${providerId}`, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProvider),
  });

  console.log("Status:", response.status);

  if (response.ok) {
    // ✅ Revalidar caché y redirigir
    revalidateTag("dashboard:providers");
    revalidateTag(`dashboard:providers:${providerId}`);
    redirect("/dashboard/providers");
  } else {
    const errorText = await response.text();
    console.error("Error al actualizar proveedor:", errorText);
    throw new Error("Error al actualizar proveedor");
  }
}
