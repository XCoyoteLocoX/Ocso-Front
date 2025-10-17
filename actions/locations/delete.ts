"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteLocation(formData: FormData) {
  const locationId = formData.get("deleteValue");
  if (!locationId) return;

  const headers = await authHeaders();

  const response = await fetch(`${API_URL}/locations/${locationId}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    console.error("Error al eliminar la ubicación:", await response.text());
    throw new Error("No se pudo eliminar la ubicación");
  }

  // ✅ Actualiza el cache del dashboard
  revalidateTag("dashboard:locations");

  // ✅ Redirige correctamente al dashboard
  redirect("/dashboard");
}
