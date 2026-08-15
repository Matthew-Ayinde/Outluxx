import { NextRequest } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { getSession } from "@/lib/utils/auth";
import { ok, err } from "@/lib/utils/api";
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from "@/lib/email/order";
import { getStoreSettings } from "@/lib/data/settings";
import { getRequestCurrency } from "@/lib/currency/getRequestCurrency";
import { priceOrder, PricingError } from "@/lib/utils/serverPricing";
import { verifyTransaction } from "@/lib/payments/paystack";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" });

const AddressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

const ItemSchema = z.object({
  slug: z.string(),
  quantity: z.number().int().positive(),
  selectedSize: z.string(),
  selectedColor: z.string(),
});

const Schema = z.object({
  provider: z.enum(["stripe", "paystack"]).default("stripe"),
  paymentReference: z.string(),
  shippingAddress: AddressSchema,
  deliveryMethod: z.enum(["standard", "express"]).default("standard"),
  customerEmail: z.string().email(),
  promoCode: z.string().optional(),
  items: z.array(ItemSchema).min(1),
});

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const { provider, paymentReference, shippingAddress, deliveryMethod, customerEmail, promoCode, items } =
    parsed.data;
  const session = await getSession();

  // Re-price server-side from the same trusted currency signal /intent used,
  // so the amount we record (and, for Paystack, cross-check against what was
  // actually captured) can never drift from what /intent authorized.
  const requestedCurrency = getRequestCurrency(req);
  const { deliveryFee, deliveryFeeNGN } = await getStoreSettings();

  let pricing;
  try {
    pricing = await priceOrder(items, promoCode, requestedCurrency, deliveryFee, deliveryFeeNGN);
  } catch (e) {
    if (e instanceof PricingError) return err(e.message, 400);
    throw e;
  }

  let paystackTransactionId: string | undefined;

  if (provider === "paystack") {
    if (process.env.PAYSTACK_SIMULATION !== "true") {
      let verified;
      try {
        verified = await verifyTransaction(paymentReference);
      } catch (e) {
        console.error("Paystack verify failed:", e);
        return err("Payment provider is temporarily unavailable. Please try again shortly.", 502);
      }
      if (verified.status !== "success") {
        return err("Payment has not been completed", 402, "PAYMENT_REQUIRED");
      }
      const expectedKobo = Math.round(pricing.total * 100);
      if (verified.currency !== "NGN" || verified.amount !== expectedKobo) {
        return err("Payment amount does not match order total", 402, "AMOUNT_MISMATCH");
      }
      paystackTransactionId = String(verified.id);
    }
  } else if (process.env.STRIPE_SIMULATION !== "true") {
    const intent = await stripe.paymentIntents.retrieve(paymentReference);
    if (intent.status !== "succeeded") {
      return err("Payment has not been completed", 402, "PAYMENT_REQUIRED");
    }
  }

  // Check for duplicate order on same reference
  const dupQuery = provider === "paystack" ? { paystackReference: paymentReference } : { stripePaymentIntentId: paymentReference };
  const existing = await Order.findOne(dupQuery);
  if (existing) return ok(existing.toObject());

  const orderItems = pricing.items.map((item) => ({
    productId: item.product._id.toString(),
    productTitle: item.product.title,
    productBrand: item.product.brand,
    productImage: item.product.images[0]?.src ?? "",
    quantity: item.quantity,
    selectedSize: item.selectedSize,
    selectedColor: item.selectedColor,
    price: item.unitPrice,
  }));

  if (pricing.promo) {
    await pricing.promo.updateOne({ $inc: { usedCount: 1 } });
  }

  const order = await Order.create({
    customerId: session?.sub,
    customerEmail,
    guestCheckout: !session,
    status: "pending",
    paymentStatus: "paid",
    currency: pricing.currency,
    paymentProvider: provider,
    stripePaymentIntentId: provider === "stripe" ? paymentReference : undefined,
    paystackReference: provider === "paystack" ? paymentReference : undefined,
    paystackTransactionId,
    items: orderItems,
    subtotal: pricing.subtotal,
    shipping: pricing.shipping,
    discount: pricing.discountAmount,
    total: pricing.total,
    promoCode: promoCode?.toUpperCase(),
    shippingAddress,
    deliveryMethod,
  });

  if (process.env.NODE_ENV !== "production") {
    const symbol = pricing.currency === "NGN" ? "₦" : "£";
    console.log(`[ORDER CREATED] ${order.orderNumber} — ${symbol}${pricing.total.toFixed(2)} for ${customerEmail}`);
  }

  try {
    await Promise.all([
      sendOrderConfirmationEmail(order),
      sendAdminOrderNotification(order),
    ]);
  } catch (e) {
    console.error("Failed to send order emails:", e);
  }

  return ok(order.toObject(), 201);
}
