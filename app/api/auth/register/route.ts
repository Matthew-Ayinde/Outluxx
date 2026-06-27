import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Customer } from "@/lib/db/models/Customer";
import { hashPassword, signToken, setAuthCookie } from "@/lib/utils/auth";
import { err } from "@/lib/utils/api";

const RegisterSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const { firstName, lastName, email, password } = parsed.data;

  const existing = await Customer.findOne({ email: email.toLowerCase() });
  if (existing) return err("An account with this email already exists", 409);

  const passwordHash = await hashPassword(password);
  const customer = await Customer.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    passwordHash,
    role: "customer",
  });

  const token = signToken({
    sub: customer._id.toString(),
    email: customer.email,
    role: customer.role,
    firstName: customer.firstName,
  });

  const res = NextResponse.json(
    {
      data: {
        id: customer._id.toString(),
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        role: customer.role,
      },
    },
    { status: 201 }
  );

  setAuthCookie(res, token);
  return res;
}
