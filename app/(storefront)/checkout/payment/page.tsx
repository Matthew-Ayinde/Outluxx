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
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-semibold">Payment Details</h1>
        <p className="text-sm text-zinc-500">Step 2 of 3 · Your payment is encrypted and secure.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Card logos */}
        <div className="flex gap-2">
          {["VISA", "MC", "AMEX"].map((brand) => (
            <div
              key={brand}
              className="flex h-8 w-12 items-center justify-center border border-black/10 text-[10px] font-bold text-zinc-400"
            >
              {brand}
            </div>
          ))}
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Card number *
          </label>
          <input
            type="text"
            value={form.card}
            onChange={(e) => set("card", formatCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
            className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Expiry *
            </label>
            <input
              type="text"
              value={form.expiry}
              onChange={(e) => set("expiry", formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              required
              className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black font-mono"
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              CVV *
            </label>
            <input
              type="text"
              value={form.cvv}
              onChange={(e) => set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              maxLength={4}
              required
              className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black font-mono"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Cardholder name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Name as it appears on card"
            required
            className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2 rounded border border-black/10 bg-zinc-50 px-4 py-3">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="shrink-0 text-zinc-400">
            <rect x="1" y="6" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 6V4a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <p className="text-[11px] text-zinc-500">
            Your payment details are encrypted with 256-bit SSL. We never store card data.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-12 items-center justify-center border border-black/20 px-8 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex h-12 flex-1 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
          >
            Review Order
          </button>
        </div>
      </form>
    </div>
  );
}
