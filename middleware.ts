import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  // Redirect to login if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/(.*)"],
};
