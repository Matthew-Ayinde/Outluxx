import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Customer } from "@/lib/db/models/Customer";
import { comparePassword, hashPassword } from "@/lib/utils/auth";
import { ok, err } from "@/lib/utils/api";

const MAX_ATTEMPTS = 5;

const ResetPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const parsed = ResetPasswordSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const { email, code, newPassword } = parsed.data;

  const customer = await Customer.findOne({ email: email.toLowerCase() }).select(
    "+resetCodeHash +resetCodeExpiresAt +resetCodeAttempts"
  );
  if (!customer || !customer.resetCodeHash || !customer.resetCodeExpiresAt) {
    return err("Invalid or expired code. Please request a new one.", 400);
  }

  if (customer.resetCodeExpiresAt.getTime() < Date.now()) {
    customer.resetCodeHash = undefined;
    customer.resetCodeExpiresAt = undefined;
    customer.resetCodeAttempts = 0;
    await customer.save();
    return err("This code has expired. Please request a new one.", 400);
  }

  if ((customer.resetCodeAttempts ?? 0) >= MAX_ATTEMPTS) {
    return err("Too many incorrect attempts. Please request a new code.", 429);
  }

  const valid = await comparePassword(code, customer.resetCodeHash);
  if (!valid) {
    customer.resetCodeAttempts = (customer.resetCodeAttempts ?? 0) + 1;
    await customer.save();
    return err("Incorrect code. Please try again.", 400);
  }

  customer.passwordHash = await hashPassword(newPassword);
  customer.resetCodeHash = undefined;
  customer.resetCodeExpiresAt = undefined;
  customer.resetCodeAttempts = 0;
  await customer.save();

  return ok(null);
}
