"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/store/CartContext";
import { formatMoney } from "@/lib/utils/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total, discount, applyPromo, promoCode } =
    useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(false);

  function handlePromo(e: React.FormEvent) {
    e.preventDefault();
    const ok = applyPromo(promoInput.trim());
    if (ok) {
      setPromoSuccess(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code.");
      setPromoSuccess(false);
    }
  }

  const shipping = subtotal >= 500 ? 0 : 15;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 border-b border-black/10 pb-6 text-4xl font-semibold">Your Bag</h1>
        <div className="py-24 text-center">
          <svg className="mx-auto mb-6 text-zinc-200" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h2 className="mb-3 text-xl font-semibold">Your bag is empty</h2>
          <p className="mb-8 text-sm text-zinc-500">Add items to your bag to see them here.</p>
          <Link
            href="/women"
            className="inline-block border border-black px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 border-b border-black/10 pb-6 text-4xl font-semibold">
        Your Bag{" "}
        <span className="text-2xl font-normal text-zinc-400">
          ({items.reduce((n, i) => n + i.quantity, 0)})
        </span>
      </h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="divide-y divide-black/10">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-5 py-6">
              <Link href={`/products/${item.product.slug}`} className="shrink-0">
                <div className="relative h-28 w-20 overflow-hidden bg-zinc-50">
                  <Image
                    src={item.product.images[0].src}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      {item.product.brand}
                    </p>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="mt-0.5 block text-sm font-medium hover:text-red-600 transition-colors"
                    >
                      {item.product.title}
                    </Link>
                    <p className="mt-1 text-xs text-zinc-500">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && " · "}
                      {item.selectedColor && `Colour: ${item.selectedColor}`}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">
                    {formatMoney(item.product.price * item.quantity)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity */}
                  <div className="flex h-8 w-24 items-center border border-black/15">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      className="flex h-full w-8 items-center justify-center text-sm hover:bg-zinc-50"
                    >–</button>
                    <span className="flex-1 text-center text-xs font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      className="flex h-full w-8 items-center justify-center text-sm hover:bg-zinc-50"
                    >+</button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-[11px] text-zinc-400 underline underline-offset-2 hover:text-black transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="border border-black/10 p-6 h-fit">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">Order Summary</h2>

          {/* Promo code */}
          {!promoCode && (
            <form onSubmit={handlePromo} className="mb-5 flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code"
                className="flex-1 border border-black/15 px-3 py-2 text-xs outline-none focus:border-black"
              />
              <button
                type="submit"
                className="border border-black px-4 py-2 text-[10px] font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Apply
              </button>
            </form>
          )}
          {promoError && <p className="mb-3 text-xs text-red-600">{promoError}</p>}
          {promoSuccess && (
            <p className="mb-3 text-xs text-green-700">
              Code applied: {promoCode} ({Math.round(discount * 100)}% off)
            </p>
          )}

          <div className="space-y-3 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-medium">{formatMoney(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Discount ({Math.round(discount * 100)}%)</span>
                <span>–{formatMoney(subtotal * discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-zinc-500">Shipping</span>
              <span className={shipping === 0 ? "text-green-700" : ""}>
                {shipping === 0 ? "Free" : formatMoney(shipping)}
              </span>
            </div>
            {subtotal < 500 && (
              <p className="text-[11px] text-zinc-400">
                Spend {formatMoney(500 - subtotal)} more for free shipping
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-between border-t border-black/10 pt-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatMoney(total + shipping)}</span>
          </div>

          <Link
            href="/checkout/shipping"
            className="mt-6 flex h-12 w-full items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/women"
            className="mt-3 flex items-center justify-center text-xs text-zinc-400 underline underline-offset-2 hover:text-black transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
