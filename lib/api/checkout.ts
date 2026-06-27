import { apiFetch } from "./client";

export interface CheckoutItem {
  slug: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface IntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  breakdown: {
    subtotal: number;
    discountAmount: number;
    shipping: number;
    total: number;
  };
}

export interface ConfirmResponse {
  _id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: unknown[];
  shippingAddress: CheckoutAddress;
  createdAt: string;
}

export async function createIntent(data: {
  items: CheckoutItem[];
  deliveryMethod: "standard" | "express";
  customerEmail: string;
  promoCode?: string;
}): Promise<IntentResponse> {
  return apiFetch("/api/checkout/intent", { method: "POST", body: JSON.stringify(data) });
}

export async function confirmOrder(data: {
  paymentIntentId: string;
  shippingAddress: CheckoutAddress;
  deliveryMethod: "standard" | "express";
  customerEmail: string;
  items: CheckoutItem[];
  promoCode?: string;
}): Promise<ConfirmResponse> {
  return apiFetch("/api/checkout/confirm", { method: "POST", body: JSON.stringify(data) });
}
