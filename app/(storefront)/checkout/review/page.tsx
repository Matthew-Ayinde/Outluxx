"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/lib/store/CartContext";
import { useCheckout } from "@/lib/store/CheckoutContext";
import { formatMoney } from "@/lib/utils/format";
import { confirmOrder } from "@/lib/api/checkout";
import { ApiError } from "@/lib/api/client";

export default function ReviewPage() {
  const router = useRouter();
  const { items, clearCart, promoCode } = useCart();
  const { shippingAddress, deliveryMethod, paymentIntentId, breakdown, cartItems, setConfirmed, reset } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!shippingAddress || !paymentIntentId || !breakdown) {
    router.replace("/checkout/shipping");
    return null;
  }

  const { subtotal, discountAmount, shipping, total } = breakdown;

  async function placeOrder() {
    setLoading(true);
    setError("");
    try {
      const email = sessionStorage.getItem("olx_checkout_email") ?? "";
      const order = await confirmOrder({
        paymentIntentId: paymentIntentId!,
        shippingAddress: shippingAddress!,
        deliveryMethod: deliveryMethod!,
        customerEmail: email,
        items: cartItems,
        promoCode: promoCode || undefined,
      });

      setConfirmed(order.orderNumber, order._id);
      clearCart();
      reset();
      router.push(`/checkout/confirmation?order=${order.orderNumber}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to place order. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <p className="eyebrow mb-2">Step 3 of 3</p>
        <h1 className="font-heading text-3xl font-light sm:text-4xl">Review Your Order</h1>
        <p className="mt-3 text-sm font-light text-muted">Please confirm everything looks right before placing your order.</p>
      </div>

      {error && (
        <div className="mb-6 border border-red-700/30 px-4 py-3 text-sm font-light text-red-700">{error}</div>
      )}

      {/* Items */}
      <section className="mb-8 border border-border">
        <div className="border-b border-border px-5 py-3">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">Items ({items.reduce((n, i) => n + i.quantity, 0)})</h2>
        </div>
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 px-5 py-4">
              <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-surface">
                <Image src={item.product.images[0].src} alt={item.product.title} fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex flex-1 items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-normal text-foreground">{item.product.title}</p>
                  <p className="mt-0.5 text-[11px] font-light text-muted">{item.product.brand}</p>
                  <p className="mt-0.5 text-[11px] font-light text-faint">
                    {item.selectedSize} · {item.selectedColor} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-normal text-foreground">{formatMoney(item.product.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping */}
      <section className="mb-8 border border-border">
        <div className="border-b border-border px-5 py-3 flex items-center justify-between">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">Shipping Address</h2>
          <button onClick={() => router.push("/checkout/shipping")} className="text-[11px] font-light text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground">Edit</button>
        </div>
        <div className="px-5 py-4 text-sm font-light leading-6 text-muted">
          <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
          <p>{shippingAddress.line1}{shippingAddress.line2 ? `, ${shippingAddress.line2}` : ""}</p>
          <p>{shippingAddress.city}{shippingAddress.postalCode ? `, ${shippingAddress.postalCode}` : ""}</p>
          <p>{shippingAddress.country}</p>
          <p className="mt-1 text-xs font-light text-faint">
            {deliveryMethod === "express" ? "Express Delivery · 1–2 business days" : "Standard Delivery · 3–5 business days"}
          </p>
        </div>
      </section>

      {/* Payment */}
      <section className="mb-8 border border-border">
        <div className="border-b border-border px-5 py-3 flex items-center justify-between">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">Payment</h2>
          <button onClick={() => router.push("/checkout/payment")} className="text-[11px] font-light text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground">Edit</button>
        </div>
        <div className="px-5 py-4 text-sm font-light leading-6 text-muted">
          <p>Simulated payment authorised</p>
          <p className="text-xs font-light text-faint">Test card · 4242 4242 4242 4242</p>
        </div>
      </section>

      {/* Totals */}
      <section className="mb-8 border border-border p-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between font-light text-muted">
            <span>Subtotal</span><span>{formatMoney(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between font-light text-muted">
              <span>Discount</span><span>–{formatMoney(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-light text-muted">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-4 font-normal text-foreground">
            <span>Total</span><span>{formatMoney(total)}</span>
          </div>
        </div>
      </section>

      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-13 items-center justify-center border border-hairline px-8 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground transition-colors duration-300 hover:border-foreground"
        >
          Back
        </button>
        <button
          onClick={placeOrder}
          disabled={loading}
          className="flex h-13 flex-1 items-center justify-center border border-foreground bg-foreground text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? "Placing Order…" : "Place Order"}
        </button>
      </div>
    </div>
  );
}
