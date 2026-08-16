import { NextRequest } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { getSession } from "@/lib/utils/auth";
import { ok, err } from "@/lib/utils/api";
import { createRefund as createPaystackRefund } from "@/lib/payments/paystack";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-07-29.dahlia" });

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ intentId: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") return err("Forbidden", 403);

  await connectDB();

  const { intentId: reference } = await params;

  const order = await Order.findOne({
    $or: [{ stripePaymentIntentId: reference }, { paystackReference: reference }],
  });
  if (!order) return err("Order not found", 404);
  if (order.paymentStatus === "refunded") return err("Already refunded", 409);
  if (order.paymentStatus !== "paid") return err("Payment is not in a paid state", 400);

  if (order.paymentProvider === "paystack") {
    let refund;
    try {
      refund = await createPaystackRefund(reference);
    } catch (e) {
      console.error("Paystack refund failed:", e);
      return err("Refund failed. Please try again or refund from the Paystack dashboard.", 502);
    }
    await Order.findByIdAndUpdate(order._id, {
      $set: {
        paymentStatus: "refunded",
        paystackRefundReference: String(refund.id),
        status: "returned",
      },
    });
    return ok({ refundId: String(refund.id), status: refund.status });
  }

  const refund = await stripe.refunds.create({ payment_intent: reference });

  await Order.findByIdAndUpdate(order._id, {
    $set: {
      paymentStatus: "refunded",
      stripeRefundId: refund.id,
      status: "returned",
    },
  });

  return ok({ refundId: refund.id, status: refund.status });
}
