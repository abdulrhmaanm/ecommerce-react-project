import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (pathname === "/login" || pathname === "/register") {
    const token = await getToken({ req: request });

    // If user already logged in, redirect away from login/register
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  // Protect private routes
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/login", "/register" , "/profile"],
};
