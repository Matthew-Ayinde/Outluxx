import { NextRequest } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import connectDB from "@/lib/db/mongoose";
import { Product } from "@/lib/db/models/Product";
import { Order } from "@/lib/db/models/Order";
import { PromoCode } from "@/lib/db/models/PromoCode";
import { getSession } from "@/lib/utils/auth";
import { ok, err } from "@/lib/utils/api";

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
  paymentIntentId: z.string(),
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

  const { paymentIntentId, shippingAddress, deliveryMethod, customerEmail, promoCode, items } = parsed.data;
  const session = await getSession();

  // Verify payment (skip check in simulation mode)
  if (process.env.STRIPE_SIMULATION !== "true") {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== "succeeded") {
      return err("Payment has not been completed", 402, "PAYMENT_REQUIRED");
    }
  }

  // Check for duplicate order on same intent
  const existing = await Order.findOne({ stripePaymentIntentId: paymentIntentId });
  if (existing) return ok(existing.toObject());

  // Re-price server-side
  const slugs = items.map((i) => i.slug);
  const products = await Product.find({ slug: { $in: slugs } }).lean();
  const productMap = new Map(products.map((p) => [p.slug, p]));

  let subtotal = 0;
  const orderItems = items.map((item) => {
    const product = productMap.get(item.slug);
    if (!product) throw new Error(`Product not found: ${item.slug}`);
    subtotal += product.price * item.quantity;
    return {
      productId: product._id.toString(),
      productTitle: product.title,
      productBrand: product.brand,
      productImage: product.images[0]?.src ?? "",
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      price: product.price,
    };
  });

  let discountRate = 0;
  if (promoCode) {
    const promo = await PromoCode.findOne({ code: promoCode.toUpperCase(), active: true });
    if (promo) {
      discountRate = promo.discount;
      await PromoCode.updateOne({ _id: promo._id }, { $inc: { usedCount: 1 } });
    }
  }

  const discountAmount = subtotal * discountRate;
  const shipping = deliveryMethod === "express" ? 25 : subtotal >= 500 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;

  const order = await Order.create({
    customerId: session?.sub,
    customerEmail,
    guestCheckout: !session,
    status: "pending",
    paymentStatus: "paid",
    stripePaymentIntentId: paymentIntentId,
    items: orderItems,
    subtotal,
    shipping,
    discount: discountAmount,
    total,
    promoCode: promoCode?.toUpperCase(),
    shippingAddress,
    deliveryMethod,
  });

  if (process.env.NODE_ENV !== "production") {
    console.log(`[ORDER CREATED] ${order.orderNumber} — £${total.toFixed(2)} for ${customerEmail}`);
  }

  return ok(order.toObject(), 201);
}
