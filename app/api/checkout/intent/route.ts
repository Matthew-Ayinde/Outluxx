import { NextRequest } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import connectDB from "@/lib/db/mongoose";
import { ok, err } from "@/lib/utils/api";
import { getStoreSettings } from "@/lib/data/settings";
import { getRequestCurrency } from "@/lib/currency/getRequestCurrency";
import { priceOrder, PricingError } from "@/lib/utils/serverPricing";
import { generatePaystackReference, initializeTransaction } from "@/lib/payments/paystack";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" });

const ItemSchema = z.object({
  slug: z.string(),
  quantity: z.number().int().positive(),
  selectedSize: z.string(),
  selectedColor: z.string(),
});

const Schema = z.object({
  items: z.array(ItemSchema).min(1),
  deliveryMethod: z.enum(["standard", "express"]).default("standard"),
  promoCode: z.string().optional(),
  customerEmail: z.string().email(),
});

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const { items, promoCode, customerEmail } = parsed.data;

  // The visitor's currency is resolved server-side from the same cookie the
  // storefront already trusts for pricing (see proxy.ts) — never from client
  // input — so a request can't ask for GBP/Stripe while browsing in NGN, or
  // vice versa. Nigerian visitors get Naira pricing and Paystack; everyone
  // else gets GBP and Stripe.
  const requestedCurrency = getRequestCurrency(req);
  const { deliveryFee, deliveryFeeNGN } = await getStoreSettings();

  let pricing;
  try {
    pricing = await priceOrder(items, promoCode, requestedCurrency, deliveryFee, deliveryFeeNGN);
  } catch (e) {
    if (e instanceof PricingError) return err(e.message, 400);
    throw e;
  }

  const breakdown = {
    currency: pricing.currency,
    subtotal: pricing.subtotal,
    discountAmount: pricing.discountAmount,
    shipping: pricing.shipping,
    total: pricing.total,
  };

  if (pricing.currency === "NGN") {
    const slugs = items.map((i) => i.slug);
    const amountKobo = Math.round(pricing.total * 100);

    if (process.env.PAYSTACK_SIMULATION === "true") {
      return ok({
        provider: "paystack" as const,
        reference: `sim_ps_${Date.now()}`,
        accessCode: `sim_access_${Date.now()}`,
        breakdown,
      });
    }

    const reference = generatePaystackReference();
    let access_code: string;
    try {
      ({ access_code } = await initializeTransaction({
        email: customerEmail,
        amountKobo,
        reference,
        metadata: { slugs: JSON.stringify(slugs), promoCode: promoCode ?? "" },
      }));
    } catch (e) {
      console.error("Paystack initialize failed:", e);
      return err("Payment provider is temporarily unavailable. Please try again shortly.", 502);
    }

    return ok({
      provider: "paystack" as const,
      reference,
      accessCode: access_code,
      breakdown,
    });
  }

  const slugs = items.map((i) => i.slug);
  const totalInPence = Math.round(pricing.total * 100);

  if (process.env.STRIPE_SIMULATION === "true") {
    return ok({
      provider: "stripe" as const,
      clientSecret: `sim_pi_${Date.now()}_secret`,
      paymentIntentId: `sim_pi_${Date.now()}`,
      breakdown,
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalInPence,
    currency: "gbp",
    receipt_email: customerEmail,
    metadata: {
      slugs: JSON.stringify(slugs),
      promoCode: promoCode ?? "",
    },
  });

  return ok({
    provider: "stripe" as const,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    breakdown,
  });
}
