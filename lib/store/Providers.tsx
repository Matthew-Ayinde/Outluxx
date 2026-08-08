"use client";

import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { CheckoutProvider } from "./CheckoutContext";
import { SettingsProvider } from "./SettingsContext";
import { CurrencyProvider, type Currency } from "./CurrencyContext";
import type { StoreSettings } from "@/lib/data/settings";

export function Providers({
  children,
  initialSettings,
  initialCurrency,
}: {
  children: React.ReactNode;
  initialSettings: StoreSettings;
  initialCurrency: Currency;
}) {
  return (
    <CurrencyProvider currency={initialCurrency}>
      <SettingsProvider initialSettings={initialSettings}>
        <CartProvider>
          <WishlistProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </WishlistProvider>
        </CartProvider>
      </SettingsProvider>
    </CurrencyProvider>
  );
}
