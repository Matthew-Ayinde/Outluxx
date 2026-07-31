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

  async function handlePromo(e: React.FormEvent) {
    e.preventDefault();
    const ok = await applyPromo(promoInput.trim());
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
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="eyebrow mb-3">Shopping Bag</p>
        <h1 className="section-title border-b border-border pb-8 text-4xl sm:text-5xl">
          Your Bag
        </h1>
        <div className="py-28 text-center">
          <svg className="mx-auto mb-8 text-faint" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h2 className="font-heading text-3xl font-light text-foreground">
            Your bag is empty
          </h2>
          <p className="mt-3 text-sm font-light text-muted">
            Pieces you add will be kept here for you.
          </p>
          <Link
            href="/tshirts"
            className="mt-10 inline-block border border-foreground px-10 py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <p className="eyebrow mb-3">Shopping Bag</p>
      <h1 className="section-title mb-10 border-b border-border pb-8 text-4xl sm:text-5xl">
        Your Bag{" "}
        <span className="text-2xl text-faint">
          ({items.reduce((n, i) => n + i.quantity, 0)})
        </span>
      </h1>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-6 py-8">
              <Link href={`/products/${item.product.slug}`} className="shrink-0">
                <div className="relative h-32 w-24 overflow-hidden bg-surface">
                  <Image
                    src={item.product.images[0].src}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-faint">
                      {item.product.brand}
                    </p>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="mt-1 block font-heading text-lg font-light text-foreground transition-opacity duration-300 hover:opacity-60"
                    >
                      {item.product.title}
                    </Link>
                    <p className="mt-1.5 text-xs font-light text-muted">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && " · "}
                      {item.selectedColor && `Colour: ${item.selectedColor}`}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-normal text-foreground">
                    {formatMoney(item.product.price * item.quantity)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity */}
                  <div className="flex h-9 w-28 items-center border border-hairline">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      className="flex h-full w-9 items-center justify-center text-sm text-foreground transition-colors duration-300 hover:bg-surface"
                      aria-label="Decrease quantity"
                    >–</button>
                    <span className="flex-1 text-center text-xs font-normal">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      className="flex h-full w-9 items-center justify-center text-sm text-foreground transition-colors duration-300 hover:bg-surface"
                      aria-label="Increase quantity"
                    >+</button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-[11px] font-light text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="h-fit border border-border p-8">
          <h2 className="mb-7 text-[11px] font-medium uppercase tracking-[0.26em] text-foreground">
            Order Summary
          </h2>

          {/* Promo code */}
          {!promoCode && (
            <form onSubmit={handlePromo} className="mb-6 flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code"
                className="flex-1 border border-hairline bg-transparent px-3.5 py-2.5 text-xs font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
              />
              <button
                type="submit"
                className="border border-foreground px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                Apply
              </button>
            </form>
          )}
          {promoError && <p className="mb-4 text-xs font-light text-red-700">{promoError}</p>}
          {promoSuccess && (
            <p className="mb-4 text-xs font-light text-emerald-700 dark:text-emerald-500">
              Code applied: {promoCode} ({Math.round(discount * 100)}% off)
            </p>
          )}

          <div className="space-y-3.5 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <span className="font-light text-muted">Subtotal</span>
              <span className="font-normal text-foreground">{formatMoney(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between font-light text-muted">
                <span>Discount ({Math.round(discount * 100)}%)</span>
                <span>–{formatMoney(subtotal * discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-light text-muted">Shipping</span>
              <span className="font-light text-foreground">
                {shipping === 0 ? "Complimentary" : formatMoney(shipping)}
              </span>
            </div>
            {subtotal < 500 && (
              <p className="text-[11px] font-light text-faint">
                Spend {formatMoney(500 - subtotal)} more for complimentary shipping
              </p>
            )}
          </div>

          <div className="mt-5 flex justify-between border-t border-border pt-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground">
              Total
            </span>
            <span className="text-base font-normal text-foreground">
              {formatMoney(total + shipping)}
            </span>
          </div>

          <Link
            href="/checkout/shipping"
            className="mt-7 flex h-13 w-full items-center justify-center border border-foreground bg-foreground text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/tshirts"
            className="mt-4 flex items-center justify-center text-xs font-light text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
