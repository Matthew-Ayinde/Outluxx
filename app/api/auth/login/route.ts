import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Customer } from "@/lib/db/models/Customer";
import { comparePassword, signToken, setAuthCookie } from "@/lib/utils/auth";
import { err } from "@/lib/utils/api";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const { email, password } = parsed.data;

  const customer = await Customer.findOne({ email: email.toLowerCase() }).select("+passwordHash");
  if (!customer) return err("Invalid email or password", 401);

  const valid = await comparePassword(password, customer.passwordHash);
  if (!valid) return err("Invalid email or password", 401);

  const token = signToken({
    sub: customer._id.toString(),
    email: customer.email,
    role: customer.role,
    firstName: customer.firstName,
  });

  const res = NextResponse.json({
    data: {
      id: customer._id.toString(),
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      role: customer.role,
      addresses: customer.addresses,
    },
  });

  setAuthCookie(res, token);
  return res;
}
