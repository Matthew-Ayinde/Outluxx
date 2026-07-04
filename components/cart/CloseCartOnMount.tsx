"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/store/CartContext";

export default function CloseCartOnMount() {
  const { closeCart } = useCart();

  useEffect(() => {
    closeCart();
  }, [closeCart]);

  return null;
}
