import { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Customer } from "@/lib/db/models/Customer";
import { Order } from "@/lib/db/models/Order";
import { ok, requireAdmin, isNextResponse } from "@/lib/utils/api";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const search = searchParams.get("search");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = { role: "customer" };
  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const total = await Customer.countDocuments(filter);
  const customers = await Customer.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  // Enrich with order counts
  const customerIds = customers.map((c) => c._id.toString());
  const orderAgg = await Order.aggregate([
    { $match: { customerId: { $in: customerIds } } },
    { $group: { _id: "$customerId", count: { $sum: 1 }, total: { $sum: "$total" } } },
  ]);
  const orderMap = new Map(orderAgg.map((a) => [a._id, { count: a.count, total: a.total }]));

  const enriched = customers.map((c) => ({
    id: c._id.toString(),
    firstName: c.firstName,
    lastName: c.lastName,
    email: c.email,
    phone: c.phone,
    createdAt: c.createdAt,
    orderCount: orderMap.get(c._id.toString())?.count ?? 0,
    totalSpent: orderMap.get(c._id.toString())?.total ?? 0,
  }));

  return ok({ customers: enriched, total, page, limit, pages: Math.ceil(total / limit) });
}
