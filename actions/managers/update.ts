"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateManager(managerId: string, formData: FormData) {
  // ✅ Obtener headers con token
  const headers = await authHeaders();

  // ✅ Convertir FormData en objeto plano
  const updatedManager: any = {};
  for (const key of formData.keys()) {
    const value = formData.get(key);
    if (value) updatedManager[key] = value;
  }

  // ✅ Realizar PATCH al backend
  const response = await fetch(`${API_URL}/managers/${managerId}`, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedManager),
  });

  console.log("Status:", response.status);

  // ✅ Verificar respuesta y revalidar cache
  if (response.ok) {
    revalidateTag("dashboard:managers");
    revalidateTag(`dashboard:managers:${managerId}`); // por si usas cache por ID
    return { success: true, message: "Manager actualizado correctamente" };
  } else {
    const errorText = await response.text();
    console.error("Error al actualizar manager:", errorText);
    return { success: false, message: "Error al actualizar manager" };
  }
}
