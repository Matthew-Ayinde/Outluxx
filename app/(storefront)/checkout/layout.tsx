import type { ReactNode } from "react";
import Link from "next/link";

const STEPS = [
  { label: "Shipping", href: "/checkout/shipping" },
  { label: "Payment", href: "/checkout/payment" },
  { label: "Review", href: "/checkout/review" },
];

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal header */}
      <header className="border-b border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-heading text-xl font-semibold tracking-widest">
            OUTLUXX
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1">
                <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">
                  {step.label}
                </span>
                {i < STEPS.length - 1 && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-300">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </nav>
          <Link href="/cart" className="text-xs text-zinc-400 hover:text-black transition-colors">
            ← Bag
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
