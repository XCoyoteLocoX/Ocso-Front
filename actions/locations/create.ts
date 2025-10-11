"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { API_URL, TOKEN_NAME } from "@/constants";

export async function createLocation(formData: FormData): Promise<void> {
  const userCookies = cookies();
  const token = (await userCookies).get(TOKEN_NAME)?.value;
  if (!token) {
    console.error("No token found in cookies");
    return;
  }

  let location: any = {};
  let locationLatLng = [0, 0];

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

  await axios.post(
    `${API_URL}/locations`,
    { ...location },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
