"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store/CartContext";
import { useCheckout } from "@/lib/store/CheckoutContext";
import { formatMoney } from "@/lib/utils/format";
import { createIntent } from "@/lib/api/checkout";
import type { CheckoutItem } from "@/lib/api/checkout";
import { ApiError } from "@/lib/api/client";
import Image from "next/image";

export default function ShippingPage() {
  const router = useRouter();
  const { items, subtotal, total, discount, promoCode } = useCart();
  const { setShipping, setIntent, setCartItems } = useCheckout();

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shipping = deliveryMethod === "express" ? 25 : subtotal >= 500 ? 0 : 15;

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    line1: "", line2: "", city: "", state: "", postalCode: "", country: "United Kingdom",
  });

  function set(field: string, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const checkoutItems: CheckoutItem[] = items.map((i) => ({
        slug: i.product.slug,
        quantity: i.quantity,
        selectedSize: i.selectedSize,
        selectedColor: i.selectedColor,
      }));

      const { shippingAddress, deliveryMethod: dm, ...rest } = {
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city,
          state: form.state || undefined,
          postalCode: form.postalCode,
          country: form.country,
        },
        deliveryMethod,
        ...({} as object),
      };
      void rest;

      const address = {
        firstName: form.firstName,
        lastName: form.lastName,
        line1: form.line1,
        line2: form.line2 || undefined,
        city: form.city,
        state: form.state || undefined,
        postalCode: form.postalCode,
        country: form.country,
      };

      const result = await createIntent({
        items: checkoutItems,
        deliveryMethod,
        customerEmail: form.email,
        promoCode: promoCode || undefined,
      });

      setShipping(address, deliveryMethod);
      setIntent(result.paymentIntentId, result.breakdown);
      setCartItems(checkoutItems);

      // Store email in sessionStorage for use on confirm
      sessionStorage.setItem("olx_checkout_email", form.email);

      router.push("/checkout/payment");
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-heading text-2xl font-light text-foreground">Your bag is empty.</p>
        <a
          href="/"
          className="mt-6 inline-block text-[10px] font-medium uppercase tracking-[0.24em] text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_360px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div>
          <p className="eyebrow mb-2">Step 1 of 3</p>
          <h1 className="font-heading text-3xl font-light sm:text-4xl">Shipping Address</h1>
        </div>

        {error && (
          <div className="border border-red-700/30 px-4 py-3 text-sm font-light text-red-700">{error}</div>
        )}

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
            <Field label="Postcode / ZIP" value={form.postalCode} onChange={(v) => set("postalCode", v)} required />
            <div>
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">Country</label>
              <select
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                className="w-full cursor-pointer border border-hairline bg-background px-3.5 py-3 text-sm font-light text-foreground outline-none transition-colors duration-300 focus:border-foreground"
              >
                {["United Kingdom", "United States", "France", "Germany", "Italy", "Japan", "Australia", "Canada"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-foreground">Delivery Method</h2>
          <div className="space-y-3">
            {([
              { id: "standard" as const, label: "Standard Delivery", time: "3–5 business days", price: subtotal >= 500 ? "Free" : formatMoney(15) },
              { id: "express" as const, label: "Express Delivery", time: "1–2 business days", price: formatMoney(25) },
            ]).map((opt) => (
              <label
                key={opt.id}
                className={[
                  "flex cursor-pointer items-center justify-between border p-5 transition-colors duration-300",
                  deliveryMethod === opt.id ? "border-foreground" : "border-hairline hover:border-foreground",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === opt.id}
                    onChange={() => setDeliveryMethod(opt.id)}
                    className="accent-current"
                  />
                  <div>
                    <p className="text-sm font-normal text-foreground">{opt.label}</p>
                    <p className="mt-0.5 text-xs font-light text-muted">{opt.time}</p>
                  </div>
                </div>
                <span className="text-sm font-normal text-foreground">{opt.price}</span>
              </label>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex h-13 w-full items-center justify-center border border-foreground bg-foreground text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? "Please wait…" : "Continue to Payment"}
        </button>
      </form>

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
      <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
        {label}{required && " *"}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground outline-none transition-colors duration-300 focus:border-foreground"
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
    <div className="h-fit border border-border p-7">
      <h2 className="mb-6 text-[11px] font-medium uppercase tracking-[0.26em] text-foreground">Your Order</h2>
      <div className="space-y-5 border-b border-border pb-5">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3.5">
            <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-surface">
              <Image src={item.product.images[0].src} alt={item.product.title} fill className="object-cover" sizes="48px" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-normal leading-tight text-foreground">{item.product.title}</p>
              <p className="mt-1 text-[11px] font-light text-muted">{item.selectedSize} · {item.selectedColor}</p>
            </div>
            <p className="text-xs font-normal text-foreground">{formatMoney(item.product.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2.5 text-sm">
        <div className="flex justify-between font-light text-muted">
          <span>Subtotal</span><span>{formatMoney(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between font-light text-muted">
            <span>Discount</span><span>–{formatMoney(subtotal * discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-light text-muted">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Complimentary" : formatMoney(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-4 font-normal text-foreground">
          <span>Total</span><span>{formatMoney(total + shipping)}</span>
        </div>
      </div>
    </div>
  );
}
