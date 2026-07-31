"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STEPS = [
  { label: "Shipping", href: "/checkout/shipping" },
  { label: "Payment", href: "/checkout/payment" },
  { label: "Review", href: "/checkout/review" },
];

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeIndex = STEPS.findIndex((s) => pathname.startsWith(s.href));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
          <Link
            href="/"
            className="font-heading text-lg font-medium uppercase tracking-[0.32em] text-foreground"
          >
            Outluxx
          </Link>
          <nav className="hidden items-center gap-2 sm:flex" aria-label="Checkout progress">
            {STEPS.map((step, i) => {
              const state =
                activeIndex === -1 ? "upcoming"
                : i < activeIndex ? "done"
                : i === activeIndex ? "active"
                : "upcoming";
              return (
                <div key={step.label} className="flex items-center gap-2">
                  <span
                    className={[
                      "text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-300",
                      state === "active" ? "text-foreground"
                      : state === "done" ? "text-muted"
                      : "text-faint",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-faint">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              );
            })}
          </nav>
          <Link
            href="/cart"
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-foreground"
          >
            ← Bag
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">{children}</main>
    </div>
  );
}
