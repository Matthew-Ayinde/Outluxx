import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { detectCountry } from "@/lib/currency/detectCountry";

const CURRENCY_COOKIE = "currency";
const CURRENCY_HEADER = "x-currency";
// Re-checked daily so a visitor's currency updates if they travel.
const COOKIE_MAX_AGE = 60 * 60 * 24;

export async function proxy(request: NextRequest) {
  const cookieValue = request.cookies.get(CURRENCY_COOKIE)?.value;
  let currency = cookieValue === "NGN" || cookieValue === "GBP" ? cookieValue : null;

  if (!currency) {
    const country = await detectCountry(request);
    currency = country === "NG" ? "NGN" : "GBP";
  }

  // Forwarded as a request header so the very first render (before the
  // Set-Cookie below has round-tripped) already sees the right currency.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(CURRENCY_HEADER, currency);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  if (!cookieValue) {
    response.cookies.set(CURRENCY_COOKIE, currency, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|admin|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
