import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Customer } from "@/lib/db/models/Customer";
import { getSession } from "@/lib/utils/auth";
import { ok, err } from "@/lib/utils/api";

const UpdateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  addresses: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        line1: z.string(),
        line2: z.string().optional(),
        city: z.string(),
        state: z.string().optional(),
        postalCode: z.string(),
        country: z.string(),
        isDefault: z.boolean(),
      })
    )
    .optional(),
});

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return err("Unauthorized", 401);

  await connectDB();

  const body = await req.json();
  const parsed = UpdateProfileSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const customer = await Customer.findByIdAndUpdate(
    session.sub,
    { $set: parsed.data },
    { new: true, runValidators: true }
  ).lean();

  if (!customer) return err("Account not found", 404);

  return ok({
    id: customer._id.toString(),
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    addresses: customer.addresses,
  });
}
