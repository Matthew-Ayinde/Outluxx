"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/types/commerce";

type WishlistContextValue = {
  items: Product[];
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  }, []);

  const has = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  const clear = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider
      value={{ items, toggle, has, clear, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
