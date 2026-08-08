"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Currency = "GBP" | "NGN";

const CurrencyContext = createContext<Currency | null>(null);

export function CurrencyProvider({
  currency,
  children,
}: {
  currency: Currency;
  children: ReactNode;
}) {
  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): Currency {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
