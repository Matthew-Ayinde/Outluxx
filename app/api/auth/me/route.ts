import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Customer } from "@/lib/db/models/Customer";
import { Order } from "@/lib/db/models/Order";
import { getSession } from "@/lib/utils/auth";
import { ok, err } from "@/lib/utils/api";

export async function GET() {
  const session = await getSession();
  if (!session) return err("Unauthorized", 401);

  await connectDB();

  const customer = await Customer.findById(session.sub).lean();
  if (!customer) return err("Account not found", 404);

  const orders = await Order.find({ customerId: session.sub })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return ok({
    id: customer._id.toString(),
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    role: customer.role,
    addresses: customer.addresses,
    recentOrders: orders,
  });
}

export async function DELETE() {
  const session = await getSession();
  if (!session) return err("Unauthorized", 401);

  const res = NextResponse.json({ data: { loggedOut: true } });
  res.headers.set(
    "Set-Cookie",
    "olx_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );
  return res;
}
