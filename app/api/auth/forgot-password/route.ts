import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Customer } from "@/lib/db/models/Customer";
import { generateVerificationCode, hashPassword } from "@/lib/utils/auth";
import { sendPasswordResetCode } from "@/lib/email/passwordReset";
import { ok, err } from "@/lib/utils/api";

const RESET_CODE_TTL_MS = 10 * 60 * 1000;

const ForgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

const GENERIC_MESSAGE = "If an account exists for that email, we've sent a verification code.";

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const parsed = ForgotPasswordSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const { email } = parsed.data;
  const customer = await Customer.findOne({ email: email.toLowerCase() });

  // Always return the same response whether or not the account exists, so the
  // form can't be used to enumerate registered emails.
  if (!customer) return ok({ message: GENERIC_MESSAGE });

  const code = generateVerificationCode();
  customer.resetCodeHash = await hashPassword(code);
  customer.resetCodeExpiresAt = new Date(Date.now() + RESET_CODE_TTL_MS);
  customer.resetCodeAttempts = 0;
  await customer.save();

  try {
    await sendPasswordResetCode({ email: customer.email, firstName: customer.firstName, code });
  } catch (e) {
    console.error("Failed to send password reset email:", e);
    return err("We couldn't send the verification code. Please try again shortly.", 502);
  }

  return ok({ message: GENERIC_MESSAGE });
}
