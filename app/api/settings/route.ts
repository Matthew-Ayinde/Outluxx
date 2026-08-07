import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Settings, SETTINGS_KEY } from "@/lib/db/models/Settings";
import { getStoreSettings, invalidateStoreSettingsCache } from "@/lib/data/settings";
import { SITE_URL } from "@/lib/config/seo";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

export async function GET() {
  const settings = await getStoreSettings();
  // Store URL is env-driven infrastructure, not a DB setting — surfaced
  // read-only so the admin UI can display the real deployed domain.
  return ok({ ...settings, siteUrl: SITE_URL });
}

const NotificationsSchema = z.object({
  orderConfirmation: z.boolean(),
  shippingNotification: z.boolean(),
  lowStockAlerts: z.boolean(),
  newCustomerRegistrations: z.boolean(),
  weeklyRevenueSummary: z.boolean(),
});

const UpdateSchema = z.object({
  deliveryFee: z.number().min(0).max(1000),
  storeName: z.string().trim().min(1).max(80),
  contactEmail: z.string().trim().email(),
  supportPhone: z.string().trim().min(1).max(40),
  currency: z.string().trim().toUpperCase().regex(/^[A-Z]{3}$/, "Currency must be a 3-letter ISO code"),
  metaTitle: z.string().trim().min(1).max(70),
  metaDescription: z.string().trim().min(1).max(300),
  notifications: NotificationsSchema,
});

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();

  const body = await req.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const settings = await Settings.findOneAndUpdate(
    { key: SETTINGS_KEY },
    { $set: parsed.data },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
  ).lean();

  invalidateStoreSettingsCache();

  const { deliveryFee, storeName, contactEmail, supportPhone, currency, metaTitle, metaDescription, notifications } = settings;
  return ok({ deliveryFee, storeName, contactEmail, supportPhone, currency, metaTitle, metaDescription, notifications, siteUrl: SITE_URL });
}
