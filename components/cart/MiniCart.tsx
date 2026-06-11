"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/store/CartContext";
import { formatMoney } from "@/lib/utils/format";

export default function MiniCart() {
  const { items, isOpen, closeCart, removeItem, itemCount, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={closeCart} aria-hidden="true" />
      )}

      <aside
        className={[
          "fixed right-0 top-0 z-50 h-full w-96 max-w-[100vw] bg-white flex flex-col shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.14em]">Cart</p>
            {itemCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-zinc-400 hover:text-black transition-colors p-1"
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-zinc-200">
                <path d="M14 17V11a6 6 0 1112 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="5" y="16" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <div>
                <p className="font-medium text-sm">Your cart is empty</p>
                <p className="text-xs text-zinc-500 mt-1">Add items to get started</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 border border-black px-6 py-2 text-xs font-medium uppercase tracking-[0.12em] hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4">
                  <div className="relative h-24 w-16 shrink-0 overflow-hidden border border-black/10">
                    <Image
                      src={item.product.images[0].src}
                      alt={item.product.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                        {item.product.brand}
                      </p>
                      <p className="mt-0.5 text-sm font-medium leading-tight">
                        {item.product.title}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {item.selectedSize} · {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {formatMoney(item.product.price * item.quantity)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">Qty {item.quantity}</span>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-black/10 px-5 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Subtotal</p>
              <p className="text-sm font-semibold">{formatMoney(subtotal)}</p>
            </div>
            <p className="text-[11px] text-zinc-400">
              Shipping & taxes calculated at checkout
            </p>
            <Link
              href="/checkout/shipping"
              onClick={closeCart}
              className="block w-full bg-black py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-zinc-800 transition-colors"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full border border-black/20 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-black hover:border-black transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
