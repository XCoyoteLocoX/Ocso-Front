"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createProvider(formData: FormData): Promise<void> {
  const provider: any = {};
  for (const key of formData.keys()) {
    provider[key] = formData.get(key);
  }

  const headers = await authHeaders();

  const response = await fetch(`${API_URL}/providers`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(provider),
  });

  if (response.ok) {
    revalidateTag("dashboard:providers");
    redirect("/dashboard/providers"); // ✅ redirige después de crear
  } else {
    console.error("Error al crear proveedor:", await response.text());
  }
}
