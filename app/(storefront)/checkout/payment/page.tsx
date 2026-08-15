"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCheckout } from "@/lib/store/CheckoutContext";
import { useCart } from "@/lib/store/CartContext";
import { confirmOrder } from "@/lib/api/checkout";
import { ApiError } from "@/lib/api/client";
import { PaystackButton } from "@/components/checkout/PaystackButton";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
  const { provider, clientSecret, paystackAccessCode } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (!provider) router.replace("/checkout/shipping");
  }, [provider, router]);

  if (!provider) return null;

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-semibold">Payment Details</h1>
        <p className="text-sm text-zinc-500">
          Step 2 of 2 · Your payment is encrypted and secure
          {provider === "paystack" ? " with Paystack." : "."}
        </p>
      </div>

      {provider === "stripe" && clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#000000",
                colorBackground: "#ffffff",
                colorText: "#18181b",
                colorDanger: "#dc2626",
                fontFamily: "inherit",
                borderRadius: "0px",
                spacingUnit: "4px",
              },
              rules: {
                ".Input": {
                  border: "1px solid rgba(0,0,0,0.15)",
                  padding: "10px 12px",
                  fontSize: "14px",
                },
                ".Input:focus": {
                  border: "1px solid #000000",
                  boxShadow: "none",
                  outline: "none",
                },
                ".Label": {
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#71717a",
                  marginBottom: "4px",
                },
              },
            },
          }}
        >
          <StripePaymentForm />
        </Elements>
      ) : provider === "paystack" && paystackAccessCode ? (
        <PaystackPaymentForm />
      ) : null}
    </div>
  );
}

const COUNTRY_CODES: Record<string, string> = {
  "United Kingdom": "GB",
  "United States": "US",
  "France": "FR",
  "Germany": "DE",
  "Italy": "IT",
  "Japan": "JP",
  "Australia": "AU",
  "Canada": "CA",
};

/** Shared by both provider forms: verifies + creates the order, then routes to confirmation. */
function useFinalizeOrder() {
  const router = useRouter();
  const { shippingAddress, deliveryMethod, cartItems, setConfirmed } = useCheckout();
  const { promoCode } = useCart();

  return async function finalize(provider: "stripe" | "paystack", paymentReference: string) {
    const email = sessionStorage.getItem("olx_checkout_email") ?? "";
    const order = await confirmOrder({
      provider,
      paymentReference,
      shippingAddress: shippingAddress!,
      deliveryMethod,
      customerEmail: email,
      items: cartItems,
      promoCode: promoCode || undefined,
    });

    setConfirmed(order.orderNumber, order._id);
    router.push(`/checkout/confirmation?order=${order.orderNumber}`);
  };
}

function SecureNotice() {
  return (
    <div className="flex items-center gap-2 rounded border border-black/10 bg-zinc-50 px-4 py-3">
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="shrink-0 text-zinc-400">
        <rect x="1" y="6" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 6V4a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <p className="text-[11px] text-zinc-500">
        Your payment details are encrypted with 256-bit SSL. We never store card data.
      </p>
    </div>
  );
}

function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { setPaymentMethodDescription, shippingAddress, paymentIntentId } = useCheckout();
  const finalize = useFinalizeOrder();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Payment details invalid.");
      setLoading(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/checkout/review`,
        payment_method_data: {
          billing_details: {
            name: shippingAddress
              ? `${shippingAddress.firstName} ${shippingAddress.lastName}`
              : undefined,
            address: shippingAddress
              ? {
                  line1: shippingAddress.line1,
                  line2: shippingAddress.line2 ?? "",
                  city: shippingAddress.city,
                  state: shippingAddress.state ?? "",
                  postal_code: shippingAddress.postalCode,
                  country: COUNTRY_CODES[shippingAddress.country] ?? shippingAddress.country,
                }
              : undefined,
          },
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "requires_capture") {
      const pm = paymentIntent.payment_method_types?.[0] ?? "card";
      setPaymentMethodDescription(pm === "card" ? "Card ending in ····" : pm);

      try {
        await finalize("stripe", paymentIntentId!);
      } catch (e) {
        setError(
          e instanceof ApiError
            ? e.message
            : "Payment succeeded but we couldn't finalize your order. Please contact support."
        );
        setLoading(false);
      }
    } else {
      setError("Payment was not completed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement
        options={{
          layout: "tabs",
          fields: { billingDetails: { address: "never" } },
        }}
      />

      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <SecureNotice />

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
          disabled={!stripe || loading}
          className="flex h-12 flex-1 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:opacity-60"
        >
          {loading ? "Placing Order…" : "Place Order"}
        </button>
      </div>
    </form>
  );
}

function PaystackPaymentForm() {
  const router = useRouter();
  const { setPaymentMethodDescription, paystackAccessCode } = useCheckout();
  const finalize = useFinalizeOrder();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSuccess(reference: string) {
    setLoading(true);
    setError("");
    setPaymentMethodDescription("Paid via Paystack");

    try {
      await finalize("paystack", reference);
    } catch (e) {
      setError(
        e instanceof ApiError
          ? e.message
          : "Payment succeeded but we couldn't finalize your order. Please contact support."
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <SecureNotice />

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-12 items-center justify-center border border-black/20 px-8 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors"
        >
          Back
        </button>
        <PaystackButton
          accessCode={paystackAccessCode!}
          loading={loading}
          onSuccess={handleSuccess}
          onCancel={() => setError("Payment was cancelled.")}
          onError={(message) => setError(message)}
        />
      </div>
    </div>
  );
}
