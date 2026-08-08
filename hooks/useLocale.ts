"use client";

import { useCurrency } from "@/lib/store/CurrencyContext";

export function useLocale() {
  const currency = useCurrency();
  return {
    locale: currency === "NGN" ? "en-NG" : "en-GB",
    currency,
  };
}
