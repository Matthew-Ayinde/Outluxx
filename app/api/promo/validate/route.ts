import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { PromoCode } from "@/lib/db/models/PromoCode";
import { ok, err } from "@/lib/utils/api";

const Schema = z.object({ code: z.string().min(1) });

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return err("Promo code is required", 422);

  const promo = await PromoCode.findOne({
    code: parsed.data.code.toUpperCase(),
    active: true,
  });

  if (!promo) return err("Invalid or expired promo code", 400, "INVALID_PROMO");

  if (promo.expiresAt && promo.expiresAt < new Date()) {
    return err("This promo code has expired", 400, "PROMO_EXPIRED");
  }

  if (promo.usageLimit != null && promo.usedCount >= promo.usageLimit) {
    return err("This promo code has reached its usage limit", 400, "PROMO_LIMIT");
  }

  return ok({ code: promo.code, discount: promo.discount });
}
