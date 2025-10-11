import { TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const authHeaders = cache(async () => {
  console.log("CALLED");

  const userCookies = await cookies(); // 👈 aquí usamos await
  const token = userCookies.get(TOKEN_NAME)?.value;

  return {
    Authorization: `Bearer ${token}`,
  };
});
