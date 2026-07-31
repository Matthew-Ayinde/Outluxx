"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [form, setForm] = useState({ card: "", expiry: "", cvv: "", name: "" });

  function set(field: string, val: string) {
    setForm((p) => ({ ...p, [field]: val }));
  }

  function formatCard(v: string) {
    return v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  }

  function formatExpiry(v: string) {
    const d = v.replace(/\D/g, "");
    return d.length >= 2 ? `${d.slice(0, 2)}/${d.slice(2, 4)}` : d;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/checkout/review");
  }

  return (
    <div className="max-w-lg">
      <div className="mb-10">
        <p className="eyebrow mb-2">Step 2 of 3</p>
        <h1 className="font-heading text-3xl font-light sm:text-4xl">Payment Details</h1>
        <p className="mt-3 text-sm font-light text-muted">Your payment is encrypted and secure.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Card logos */}
        <div className="flex gap-2">
          {["VISA", "MC", "AMEX"].map((brand) => (
            <div
              key={brand}
              className="flex h-8 w-12 items-center justify-center border border-border text-[10px] font-medium text-faint"
            >
              {brand}
            </div>
          ))}
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
            Card number *
          </label>
          <input
            type="text"
            value={form.card}
            onChange={(e) => set("card", formatCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
            className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
              Expiry *
            </label>
            <input
              type="text"
              value={form.expiry}
              onChange={(e) => set("expiry", formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              required
              className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
              CVV *
            </label>
            <input
              type="text"
              value={form.cvv}
              onChange={(e) => set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              maxLength={4}
              required
              className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
            Cardholder name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Name as it appears on card"
            required
            className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
          />
        </div>

        <div className="flex items-center gap-3 border border-border bg-surface px-4 py-3.5">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="shrink-0 text-faint">
            <rect x="1" y="6" width="12" height="9" stroke="currentColor" strokeWidth="1" />
            <path d="M4 6V4a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1" />
          </svg>
          <p className="text-[11px] font-light text-muted">
            Your payment details are encrypted with 256-bit SSL. We never store card data.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-13 items-center justify-center border border-hairline px-8 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground transition-colors duration-300 hover:border-foreground"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex h-13 flex-1 items-center justify-center border border-foreground bg-foreground text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
          >
            Review Order
          </button>
        </div>
      </form>
    </div>
  );
}
