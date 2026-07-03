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
      .select("orderNumber customerEmail paymentStatus stripePaymentIntentId stripeRefundId total subtotal shipping discount createdAt shippingAddress status")
      .lean(),
    Order.countDocuments(filter),
    Order.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
          total: { $sum: "$total" },
        },
      },
    ]),
  ]);

  const statMap: Record<string, { count: number; total: number }> = {};
  for (const s of stats) statMap[s._id] = { count: s.count, total: s.total };

  return ok({
    payments: orders,
    total,
    page,
    stats: {
      paid: statMap.paid ?? { count: 0, total: 0 },
      failed: statMap.failed ?? { count: 0, total: 0 },
      pending: statMap.pending ?? { count: 0, total: 0 },
      refunded: statMap.refunded ?? { count: 0, total: 0 },
    },
  });
}
