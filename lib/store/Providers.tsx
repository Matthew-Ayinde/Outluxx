"use client";

import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { CheckoutProvider } from "./CheckoutContext";
import { SettingsProvider } from "./SettingsContext";
import type { StoreSettings } from "@/lib/data/settings";

export function Providers({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings: StoreSettings;
}) {
  return (
    <SettingsProvider initialSettings={initialSettings}>
      <CartProvider>
        <WishlistProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </WishlistProvider>
      </CartProvider>
    </SettingsProvider>
  );
}
