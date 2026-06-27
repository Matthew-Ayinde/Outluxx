import { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { ok, err, requireAuth, requireAdmin, isNextResponse } from "@/lib/utils/api";
import type { JWTPayload } from "@/lib/utils/auth";

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (isNextResponse(auth)) return auth;

  await connectDB();

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const status = searchParams.get("status");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};

  if ((auth as JWTPayload).role === "admin") {
    if (status) filter.status = status;
  } else {
    filter.customerId = (auth as JWTPayload).sub;
  }

  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return ok({ orders, total, page, limit, pages: Math.ceil(total / limit) });
}
