import { NextRequest } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { getSession } from "@/lib/utils/auth";
import { ok, err } from "@/lib/utils/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" });

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ intentId: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") return err("Forbidden", 403);

  await connectDB();

  const { intentId } = await params;

  const order = await Order.findOne({ stripePaymentIntentId: intentId });
  if (!order) return err("Order not found", 404);
  if (order.paymentStatus === "refunded") return err("Already refunded", 409);
  if (order.paymentStatus !== "paid") return err("Payment is not in a paid state", 400);

  const refund = await stripe.refunds.create({ payment_intent: intentId });

  await Order.findByIdAndUpdate(order._id, {
    $set: {
      paymentStatus: "refunded",
      stripeRefundId: refund.id,
      status: "returned",
    },
  });

  return ok({ refundId: refund.id, status: refund.status });
}
