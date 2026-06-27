import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/utils/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/account/sign-in";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/account/sign-in";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (
    pathname.startsWith("/account/profile") ||
    pathname.startsWith("/account/addresses") ||
    pathname.startsWith("/account/orders") ||
    pathname.startsWith("/account/returns")
  ) {
    if (!token || !verifyToken(token)) {
      const url = req.nextUrl.clone();
      url.pathname = "/account/sign-in";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/profile", "/account/addresses", "/account/orders/:path*", "/account/returns"],
};
