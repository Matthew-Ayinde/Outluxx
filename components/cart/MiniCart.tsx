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
        <div className="fixed inset-0 z-50 bg-black/50" onClick={closeCart} aria-hidden="true" />
      )}

      <aside
        className={[
          "fixed right-0 top-0 z-50 flex h-full w-96 max-w-[100vw] flex-col border-l border-border bg-background",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-baseline gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-foreground">
              Your Bag
            </p>
            {itemCount > 0 && (
              <span className="text-xs font-light text-muted">({itemCount})</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1 text-faint transition-colors duration-300 hover:text-foreground"
            aria-label="Close cart"
          >
            <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
              <svg width="38" height="38" viewBox="0 0 40 40" fill="none" className="text-faint">
                <path d="M14 17V11a6 6 0 1112 0v6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <rect x="5" y="16" width="30" height="22" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div>
                <p className="font-heading text-2xl font-light text-foreground">
                  Your bag is empty
                </p>
                <p className="mt-2 text-xs font-light text-muted">
                  Pieces you add will appear here
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 border border-foreground px-7 py-3 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4">
                  <div className="relative h-24 w-16 shrink-0 overflow-hidden bg-surface">
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
                      <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-faint">
                        {item.product.brand}
                      </p>
                      <p className="mt-1 font-heading text-base font-light leading-tight text-foreground">
                        {item.product.title}
                      </p>
                      <p className="mt-1 text-xs font-light text-muted">
                        {item.selectedSize} · {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-normal text-foreground">
                        {formatMoney(item.product.price * item.quantity)}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-light text-muted">Qty {item.quantity}</span>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-foreground"
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
          <div className="space-y-4 border-t border-border px-6 py-6">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                Subtotal
              </p>
              <p className="text-base font-normal text-foreground">{formatMoney(subtotal)}</p>
            </div>
            <p className="text-[11px] font-light text-faint">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              href="/checkout/shipping"
              onClick={closeCart}
              className="block w-full border border-foreground bg-foreground py-4 text-center text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full border border-hairline py-3.5 text-center text-[10px] font-medium uppercase tracking-[0.26em] text-foreground transition-colors duration-300 hover:border-foreground"
            >
              View Bag
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
