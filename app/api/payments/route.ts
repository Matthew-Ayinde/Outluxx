import { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { getSession } from "@/lib/utils/auth";
import { ok, err } from "@/lib/utils/api";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return err("Forbidden", 403);

  await connectDB();

  const { searchParams } = new URL(req.url);
  const paymentStatus = searchParams.get("paymentStatus");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "50", 10));

  const filter: Record<string, unknown> = {};
  if (paymentStatus && paymentStatus !== "all") filter.paymentStatus = paymentStatus;

  const [orders, total, stats] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("orderNumber customerEmail paymentStatus currency paymentProvider stripePaymentIntentId stripeRefundId paystackReference paystackRefundReference total subtotal shipping discount createdAt shippingAddress status")
      .lean(),
    Order.countDocuments(filter),
    // Grouped by currency too — GBP and NGN totals must never be summed
    // together, or the figure is meaningless (£ + ₦ is not a real amount).
    Order.aggregate([
      {
        $group: {
          _id: { status: "$paymentStatus", currency: "$currency" },
          count: { $sum: 1 },
          total: { $sum: "$total" },
        },
      },
    ]),
  ]);

  type StatBucket = { count: number; total: number };
  type CurrencyStats = { paid: StatBucket; failed: StatBucket; pending: StatBucket; refunded: StatBucket };
  const empty = (): CurrencyStats => ({
    paid: { count: 0, total: 0 },
    failed: { count: 0, total: 0 },
    pending: { count: 0, total: 0 },
    refunded: { count: 0, total: 0 },
  });

  const byCurrency: Record<"GBP" | "NGN", CurrencyStats> = { GBP: empty(), NGN: empty() };
  for (const s of stats) {
    const currency: "GBP" | "NGN" = s._id.currency === "NGN" ? "NGN" : "GBP";
    const status = s._id.status as keyof CurrencyStats;
    if (status in byCurrency[currency]) {
      byCurrency[currency][status] = { count: s.count, total: s.total };
    }
  }

  return ok({
    payments: orders,
    total,
    page,
    stats: byCurrency,
  });
}
