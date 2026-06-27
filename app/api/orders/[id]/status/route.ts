import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

type Params = { params: Promise<{ id: string }> };

const Schema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled", "returned"]),
});

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const { id } = await params;

  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const order = await Order.findByIdAndUpdate(
    id,
    { $set: { status: parsed.data.status } },
    { new: true }
  ).lean();

  if (!order) return err("Order not found", 404);
  return ok(order);
}
