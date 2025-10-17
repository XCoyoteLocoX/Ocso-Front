"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function createManager(formData: FormData) {
  // ✅ Construir el objeto manager desde el formData
  const manager: Record<string, any> = {};
  for (const key of formData.keys()) {
    manager[key] = formData.get(key);
  }

  // ✅ Esperar correctamente los headers
  const headers = await authHeaders();

  // ✅ Realizar el POST
  const response = await fetch(`${API_URL}/managers`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json", // necesario
    },
    body: JSON.stringify(manager),
  });

  // ✅ Manejo de respuesta y revalidación
  if (response.ok) {
    // Revalidar cache en Next.js
    revalidateTag("dashboard:managers");
    return { success: true, message: "Manager creado correctamente" };
  } else {
    const error = await response.text();
    console.error("Error al crear manager:", error);
    return { success: false, message: "Error al crear manager" };
  }
}
