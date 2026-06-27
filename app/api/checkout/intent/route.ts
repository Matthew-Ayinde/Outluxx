import { NextRequest } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import connectDB from "@/lib/db/mongoose";
import { Product } from "@/lib/db/models/Product";
import { PromoCode } from "@/lib/db/models/PromoCode";
import { ok, err } from "@/lib/utils/api";

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

  const { items, deliveryMethod, promoCode, customerEmail } = parsed.data;

  // Re-price server-side — never trust the client
  const slugs = items.map((i) => i.slug);
  const products = await Product.find({ slug: { $in: slugs } }).lean();
  const productMap = new Map(products.map((p) => [p.slug, p]));

  let subtotal = 0;
  for (const item of items) {
    const product = productMap.get(item.slug);
    if (!product) return err(`Product "${item.slug}" not found`, 400);
    subtotal += product.price * item.quantity;
  }

  let discountRate = 0;
  if (promoCode) {
    const promo = await PromoCode.findOne({ code: promoCode.toUpperCase(), active: true });
    if (promo && (!promo.expiresAt || promo.expiresAt > new Date())) {
      if (!promo.usageLimit || promo.usedCount < promo.usageLimit) {
        discountRate = promo.discount;
      }
    }
  }

  const discountAmount = subtotal * discountRate;
  const shipping = deliveryMethod === "express" ? 25 : subtotal >= 500 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;
  const totalInPence = Math.round(total * 100);

  if (process.env.STRIPE_SIMULATION === "true") {
    return ok({
      clientSecret: `sim_pi_${Date.now()}_secret`,
      paymentIntentId: `sim_pi_${Date.now()}`,
      breakdown: { subtotal, discountAmount, shipping, total },
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
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    breakdown: { subtotal, discountAmount, shipping, total },
  });
}
