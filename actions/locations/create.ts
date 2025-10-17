"use server";

import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Location } from "@/entities"; // Asegúrate de tener este tipo

export async function createLocation(formData: FormData): Promise<void> {
  // ✅ Extraer campos correctamente
  const locationLat = Number(formData.get("locationLat"));
  const locationLng = Number(formData.get("locationLng"));

  const location = {
    locationName: formData.get("locationName"),
    locationAddress: formData.get("locationAddress"),
    locationLatLng: [locationLat, locationLng],
    managerId: formData.get("managerId"),
  };

  // ✅ Esperar headers correctamente
  const headers = await authHeaders();

  // ✅ Llamar a la API
  const response = await fetch(`${API_URL}/locations`, {
    method: "POST",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    console.error("Error creando ubicación:", await response.text());
    throw new Error("No se pudo crear la ubicación");
  }

  const { locationId }: Location = await response.json();

  // ✅ Revalidar cache y redirigir si fue exitoso
  if (response.status === 201) {
    revalidateTag("dashboard:locations");
    redirect(`/dashboard?store=${locationId}`);
  }
}
