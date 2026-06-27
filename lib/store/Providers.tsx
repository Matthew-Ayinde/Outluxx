"use client";

import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { CheckoutProvider } from "./CheckoutContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
