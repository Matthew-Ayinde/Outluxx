import { headers } from "next/headers";
import type { Currency } from "@/lib/store/CurrencyContext";

/**
 * Server-component counterpart to getRequestCurrency: reads the `x-currency`
 * header proxy.ts forwards (route handlers read the cookie instead — see
 * getRequestCurrency — since they sit outside the proxy matcher).
 */
export async function getPageCurrency(): Promise<Currency> {
  return (await headers()).get("x-currency") === "NGN" ? "NGN" : "GBP";
}
