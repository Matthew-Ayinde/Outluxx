import { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { ok, err, requireAuth, isNextResponse } from "@/lib/utils/api";
import type { JWTPayload } from "@/lib/utils/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const { id } = await params;

  const order = await Order.findById(id).lean();
  if (!order) return err("Order not found", 404);

  const session = auth as JWTPayload;
  if (session.role !== "admin" && order.customerId !== session.sub) {
    return err("Forbidden", 403);
  }

  return ok(order);
}
