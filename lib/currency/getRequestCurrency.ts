import type { NextRequest } from "next/server";
import { CURRENCY_COOKIE } from "./constants";
import type { Currency } from "@/lib/store/CurrencyContext";

/**
 * Route handlers sit outside proxy.ts's matcher (see proxy.ts config), so the
 * `x-currency` header it forwards never reaches them — but the `currency`
 * cookie it sets does (cookies apply site-wide). Reading it here is the same
 * trust boundary the storefront already relies on for NGN/GBP pricing
 * (resolveCartTotals, useCurrency), just extended to the payment provider
 * that gets charged.
 */
export function getRequestCurrency(request: NextRequest): Currency {
  const value = request.cookies.get(CURRENCY_COOKIE)?.value;
  return value === "NGN" ? "NGN" : "GBP";
}
