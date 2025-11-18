import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const token = request.headers.get("cookie")?.includes("token");

  // Protect dashboard
  if (!token && request.url.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
