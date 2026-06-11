"use client";

import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
}
