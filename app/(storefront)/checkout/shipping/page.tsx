"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store/CartContext";
import { formatMoney } from "@/lib/utils/format";
import Image from "next/image";

export default function ShippingPage() {
  const router = useRouter();
  const { items, subtotal, total, discount } = useCart();
  const shipping = subtotal >= 500 ? 0 : 15;

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    line1: "", line2: "", city: "", state: "", postcode: "", country: "United Kingdom",
  });

  function set(field: string, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/checkout/payment");
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <h1 className="mb-1 text-2xl font-semibold">Shipping Address</h1>
          <p className="text-sm text-zinc-500">Step 1 of 3</p>
        </div>

        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" value={form.firstName} onChange={(v) => set("firstName", v)} required />
            <Field label="Last name" value={form.lastName} onChange={(v) => set("lastName", v)} required />
          </div>
          <Field label="Email address" type="email" value={form.email} onChange={(v) => set("email", v)} required />
          <Field label="Phone number" type="tel" value={form.phone} onChange={(v) => set("phone", v)} />
          <Field label="Address line 1" value={form.line1} onChange={(v) => set("line1", v)} required />
          <Field label="Address line 2 (optional)" value={form.line2} onChange={(v) => set("line2", v)} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" value={form.city} onChange={(v) => set("city", v)} required />
            <Field label="County / State" value={form.state} onChange={(v) => set("state", v)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Postcode / ZIP" value={form.postcode} onChange={(v) => set("postcode", v)} required />
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Country</label>
              <select
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
              >
                {["United Kingdom", "United States", "France", "Germany", "Italy", "Japan", "Australia", "Canada"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">Delivery Method</h2>
          <div className="space-y-3">
            {[
              { id: "standard", label: "Standard Delivery", time: "3–5 business days", price: shipping === 0 ? "Free" : formatMoney(15) },
              { id: "express", label: "Express Delivery", time: "1–2 business days", price: formatMoney(25) },
            ].map((opt) => (
              <label key={opt.id} className="flex cursor-pointer items-center justify-between border border-black/15 p-4 hover:border-black transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="delivery" defaultChecked={opt.id === "standard"} className="accent-black" />
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-zinc-500">{opt.time}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{opt.price}</span>
              </label>
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
        >
          Continue to Payment
        </button>
      </form>

      {/* Order summary */}
      <OrderSummary items={items} subtotal={subtotal} total={total} discount={discount} shipping={shipping} />
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}{required && " *"}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
      />
    </div>
  );
}

function OrderSummary({
  items, subtotal, total, discount, shipping,
}: {
  items: ReturnType<typeof useCart>["items"];
  subtotal: number; total: number; discount: number; shipping: number;
}) {
  return (
    <div className="border border-black/10 p-6 h-fit">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">Your Order</h2>
      <div className="space-y-4 border-b border-black/10 pb-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
            <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-zinc-50">
              <Image src={item.product.images[0].src} alt={item.product.title} fill className="object-cover" sizes="48px" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium leading-tight">{item.product.title}</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">{item.selectedSize} · {item.selectedColor}</p>
            </div>
            <p className="text-xs font-semibold">{formatMoney(item.product.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm">
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
    </div>
  );
}
