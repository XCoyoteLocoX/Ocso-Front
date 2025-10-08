import { NextRequest, NextResponse } from "next/server";
import { TOKEN_NAME } from "./constants";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME)?.value;

  // Si intenta acceder al dashboard sin token → redirigir a login
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Si va al inicio y ya tiene token → redirigir al dashboard
  if (req.nextUrl.pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}
