import { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Customer } from "@/lib/db/models/Customer";
import { Order } from "@/lib/db/models/Order";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const { id } = await params;

  const customer = await Customer.findById(id).lean();
  if (!customer) return err("Customer not found", 404);

  const orders = await Order.find({ customerId: id }).sort({ createdAt: -1 }).lean();

  return ok({
    id: customer._id.toString(),
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    createdAt: customer.createdAt,
    addresses: customer.addresses,
    orders,
    orderCount: orders.length,
    totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
  });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const { id } = await params;

  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) return err("Customer not found", 404);

  return ok({ deleted: true });
}
