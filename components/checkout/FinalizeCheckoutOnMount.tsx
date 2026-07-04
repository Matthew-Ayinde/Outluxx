"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/store/CartContext";
import { useCheckout } from "@/lib/store/CheckoutContext";

export default function FinalizeCheckoutOnMount() {
  const { clearCart } = useCart();
  const { reset } = useCheckout();

  useEffect(() => {
    clearCart();
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
