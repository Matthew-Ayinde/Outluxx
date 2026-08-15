"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CheckoutAddress, CheckoutItem, IntentResponse, CheckoutBreakdown } from "@/lib/api/checkout";

interface CheckoutState {
  shippingAddress: CheckoutAddress | null;
  deliveryMethod: "standard" | "express";
  provider: "stripe" | "paystack" | null;
  paymentIntentId: string | null;
  clientSecret: string | null;
  paystackReference: string | null;
  paystackAccessCode: string | null;
  breakdown: CheckoutBreakdown | null;
  confirmedOrderNumber: string | null;
  confirmedOrderId: string | null;
  promoCode: string;
  paymentMethodDescription: string | null;
}

interface CheckoutContextValue extends CheckoutState {
  setShipping: (address: CheckoutAddress, method: "standard" | "express") => void;
  setIntent: (intent: IntentResponse) => void;
  setPaymentMethodDescription: (description: string) => void;
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
  provider: null,
  paymentIntentId: null,
  clientSecret: null,
  paystackReference: null,
  paystackAccessCode: null,
  breakdown: null,
  confirmedOrderNumber: null,
  confirmedOrderId: null,
  promoCode: "",
  paymentMethodDescription: null,
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

  const setIntent = useCallback((intent: IntentResponse) => {
    setState((s) =>
      intent.provider === "stripe"
        ? {
            ...s,
            provider: "stripe",
            paymentIntentId: intent.paymentIntentId,
            clientSecret: intent.clientSecret,
            paystackReference: null,
            paystackAccessCode: null,
            breakdown: intent.breakdown,
          }
        : {
            ...s,
            provider: "paystack",
            paymentIntentId: null,
            clientSecret: null,
            paystackReference: intent.reference,
            paystackAccessCode: intent.accessCode,
            breakdown: intent.breakdown,
          }
    );
  }, []);

  const setPaymentMethodDescription = useCallback((description: string) => {
    setState((s) => ({ ...s, paymentMethodDescription: description }));
  }, []);

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
        setPaymentMethodDescription,
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
