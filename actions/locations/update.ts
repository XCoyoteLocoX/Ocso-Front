"use server";

import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Location } from "@/entities";

export async function updateLocation(store: string, formData: FormData) {
  if (!store) return;

  let location: any = {};
  let locationLatLng = [0, 0];

  // 🧠 Extraer todos los valores del formulario
  for (const key of formData.keys()) {
    const value = formData.get(key);
    if (value) {
      if (key === "locationLat") {
        locationLatLng[0] = +value;
      } else if (key === "locationLng") {
        locationLatLng[1] = +value;
      } else {
        location[key] = value;
      }
    }
  }

  location.locationLatLng = locationLatLng;

  // ✅ Obtener encabezados con token
  const headers = await authHeaders();

  // ✅ Hacer PATCH al endpoint correcto
  const response = await fetch(`${API_URL}/locations/${store}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(location),
  });

  if (!response.ok) {
    console.error("Error al actualizar la ubicación:", await response.text());
    throw new Error("Error en la actualización de la ubicación");
  }

  const { locationId }: Location = await response.json();

  // ✅ Revalidar el caché y redirigir
  revalidateTag("dashboard:locations");
  revalidateTag(`dashboard:locations:${store}`);
  redirect(`/dashboard?store=${locationId}`);
}
 