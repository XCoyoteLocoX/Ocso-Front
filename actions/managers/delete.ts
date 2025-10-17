"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteManager(managerId: string) {
  // ✅ Obtener headers correctamente
  const headers = await authHeaders();

  // ✅ Realizar DELETE
  const response = await fetch(`${API_URL}/managers/${managerId}`, {
    method: "DELETE",
    headers,
  });

  console.log("Status:", response.status);

  // ✅ Revalidar cache solo si fue exitoso
  if (response.ok) {
    revalidateTag("dashboard:managers");
    redirect("/dashboard/managers"); // ✅ corregido
    return { success: true, message: "Manager eliminado correctamente" };
  } else {
    const error = await response.text();
    console.error("Error al eliminar manager:", error);
    return { success: false, message: "Error al eliminar manager" };
  }
}
