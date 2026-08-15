import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { isValidPaystackSignature } from "@/lib/payments/paystack";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  if (!isValidPaystackSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  await connectDB();

  if (event.event === "charge.success") {
    const reference = event.data?.reference;
    if (reference) {
      await Order.findOneAndUpdate(
        { paystackReference: reference },
        { $set: { paymentStatus: "paid", status: "processing" } }
      );
    }
  }

  if (event.event === "refund.processed" || event.event === "refund.failed") {
    const reference = event.data?.transaction_reference ?? event.data?.transaction?.reference;
    if (reference && event.event === "refund.processed") {
      await Order.findOneAndUpdate(
        { paystackReference: reference },
        { $set: { paymentStatus: "refunded", status: "returned" } }
      );
    }
  }

  return NextResponse.json({ received: true });
}
