"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { CartItem, Product } from "@/types/commerce";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string;
  discount: number;
};

type CartContextValue = CartState & {
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyPromo: (code: string) => boolean;
  itemCount: number;
  subtotal: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const PROMO_CODES: Record<string, number> = {
  OUTLUXX10: 0.10,
  FIRST15: 0.15,
  VIP20: 0.20,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({
    items: [],
    isOpen: false,
    promoCode: "",
    discount: 0,
  });

  const addItem = useCallback(
    (product: Product, selectedSize: string, selectedColor: string) => {
      setState((prev) => {
        const existing = prev.items.find(
          (i) =>
            i.product.id === product.id &&
            i.selectedSize === selectedSize &&
            i.selectedColor === selectedColor
        );
        if (existing) {
          return {
            ...prev,
            isOpen: true,
            items: prev.items.map((i) =>
              i.product.id === product.id &&
              i.selectedSize === selectedSize &&
              i.selectedColor === selectedColor
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        }
        return {
          ...prev,
          isOpen: true,
          items: [
            ...prev.items,
            { product, quantity: 1, selectedSize, selectedColor },
          ],
        };
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      setState((prev) => ({
        ...prev,
        items: prev.items.filter(
          (i) =>
            !(i.product.id === productId &&
              i.selectedSize === size &&
              i.selectedColor === color)
        ),
      }));
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, qty: number) => {
      if (qty < 1) {
        removeItem(productId, size, color);
        return;
      }
      setState((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.product.id === productId &&
          i.selectedSize === size &&
          i.selectedColor === color
            ? { ...i, quantity: qty }
            : i
        ),
      }));
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, items: [], promoCode: "", discount: 0 }));
  }, []);

  const openCart = useCallback(() =>
    setState((prev) => ({ ...prev, isOpen: true })), []);

  const closeCart = useCallback(() =>
    setState((prev) => ({ ...prev, isOpen: false })), []);

  const applyPromo = useCallback((code: string): boolean => {
    const rate = PROMO_CODES[code.toUpperCase()];
    if (!rate) return false;
    setState((prev) => ({
      ...prev,
      promoCode: code.toUpperCase(),
      discount: rate,
    }));
    return true;
  }, []);

  const itemCount = state.items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = state.items.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  );
  const total = subtotal * (1 - state.discount);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        applyPromo,
        itemCount,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
