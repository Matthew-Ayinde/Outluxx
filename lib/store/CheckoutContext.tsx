"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CheckoutAddress, CheckoutItem } from "@/lib/api/checkout";

interface CheckoutState {
  shippingAddress: CheckoutAddress | null;
  deliveryMethod: "standard" | "express";
  paymentIntentId: string | null;
  breakdown: {
    subtotal: number;
    discountAmount: number;
    shipping: number;
    total: number;
  } | null;
  confirmedOrderNumber: string | null;
  confirmedOrderId: string | null;
  promoCode: string;
}

interface CheckoutContextValue extends CheckoutState {
  setShipping: (address: CheckoutAddress, method: "standard" | "express") => void;
  setIntent: (
    paymentIntentId: string,
    breakdown: CheckoutState["breakdown"]
  ) => void;
  setConfirmed: (orderNumber: string, orderId: string) => void;
  setPromoCode: (code: string) => void;
  reset: () => void;
  cartItems: CheckoutItem[];
  setCartItems: (items: CheckoutItem[]) => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

const initial: CheckoutState = {
  shippingAddress: null,
  deliveryMethod: "standard",
  paymentIntentId: null,
  breakdown: null,
  confirmedOrderNumber: null,
  confirmedOrderId: null,
  promoCode: "",
};

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckoutState>(initial);
  const [cartItems, setCartItemsState] = useState<CheckoutItem[]>([]);

  const setShipping = useCallback(
    (address: CheckoutAddress, method: "standard" | "express") => {
      setState((s) => ({ ...s, shippingAddress: address, deliveryMethod: method }));
    },
    []
  );

  const setIntent = useCallback(
    (paymentIntentId: string, breakdown: CheckoutState["breakdown"]) => {
      setState((s) => ({ ...s, paymentIntentId, breakdown }));
    },
    []
  );

  const setConfirmed = useCallback((orderNumber: string, orderId: string) => {
    setState((s) => ({ ...s, confirmedOrderNumber: orderNumber, confirmedOrderId: orderId }));
  }, []);

  const setPromoCode = useCallback((code: string) => {
    setState((s) => ({ ...s, promoCode: code }));
  }, []);

  const reset = useCallback(() => {
    setState(initial);
    setCartItemsState([]);
  }, []);

  const setCartItems = useCallback((items: CheckoutItem[]) => {
    setCartItemsState(items);
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        ...state,
        setShipping,
        setIntent,
        setConfirmed,
        setPromoCode,
        reset,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
}
