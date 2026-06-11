"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/lib/store/CartContext";
import { formatMoney } from "@/lib/utils/format";

export default function ReviewPage() {
  const router = useRouter();
  const { items, subtotal, total, discount, clearCart } = useCart();
  const shipping = subtotal >= 500 ? 0 : 15;

  function placeOrder() {
    clearCart();
    router.push("/checkout/confirmation");
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-semibold">Review Your Order</h1>
        <p className="text-sm text-zinc-500">Step 3 of 3 · Please confirm everything looks right before placing your order.</p>
      </div>

      {/* Items */}
      <section className="mb-8 border border-black/10">
        <div className="border-b border-black/10 px-5 py-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest">Items ({items.reduce((n, i) => n + i.quantity, 0)})</h2>
        </div>
        <div className="divide-y divide-black/5">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 px-5 py-4">
              <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-zinc-50">
                <Image src={item.product.images[0].src} alt={item.product.title} fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex flex-1 items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium">{item.product.title}</p>
                  <p className="mt-0.5 text-[11px] text-zinc-500">{item.product.brand}</p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">
                    {item.selectedSize} · {item.selectedColor} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatMoney(item.product.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping info (mock) */}
      <section className="mb-8 border border-black/10">
        <div className="border-b border-black/10 px-5 py-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest">Shipping Address</h2>
          <button onClick={() => router.push("/checkout/shipping")} className="text-[11px] text-zinc-400 underline hover:text-black">Edit</button>
        </div>
        <div className="px-5 py-4 text-sm text-zinc-600">
          <p>Sarah Mitchell</p>
          <p>24 Eaton Square, London SW1W 9BB</p>
          <p>United Kingdom</p>
          <p className="mt-1 text-xs text-zinc-400">Standard Delivery · 3–5 business days</p>
        </div>
      </section>

      {/* Payment info (mock) */}
      <section className="mb-8 border border-black/10">
        <div className="border-b border-black/10 px-5 py-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest">Payment</h2>
          <button onClick={() => router.push("/checkout/payment")} className="text-[11px] text-zinc-400 underline hover:text-black">Edit</button>
        </div>
        <div className="px-5 py-4 text-sm text-zinc-600">
          <p>Visa ending in 4242</p>
          <p className="text-xs text-zinc-400">Expires 12/28</p>
        </div>
      </section>

      {/* Total */}
      <section className="mb-8 border border-black/10 p-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-zinc-500">
            <span>Subtotal</span><span>{formatMoney(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Discount</span><span>–{formatMoney(subtotal * discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-zinc-500">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-3 font-semibold">
            <span>Total</span><span>{formatMoney(total + shipping)}</span>
          </div>
        </div>
      </section>

      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-12 items-center justify-center border border-black/20 px-8 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors"
        >
          Back
        </button>
        <button
          onClick={placeOrder}
          className="flex h-12 flex-1 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
