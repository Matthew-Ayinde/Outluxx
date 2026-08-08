import { unstable_cache, revalidateTag } from "next/cache";
import connectDB from "@/lib/db/mongoose";
import { Settings, SETTINGS_KEY, type ISettingsNotifications } from "@/lib/db/models/Settings";
import { SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/config/seo";

export interface StoreSettings {
  deliveryFee: number;
  deliveryFeeNGN?: number;
  storeName: string;
  contactEmail: string;
  supportPhone: string;
  currency: string;
  metaTitle: string;
  metaDescription: string;
  notifications: ISettingsNotifications;
}

export const SETTINGS_CACHE_TAG = "store-settings";

// Mirrors the schema defaults in lib/db/models/Settings.ts — needed here too
// because `setDefaultsOnInsert` only backfills brand-new documents, not older
// singleton docs saved before a field was added to the schema.
const FALLBACK: Omit<StoreSettings, "deliveryFee"> = {
  storeName: SITE_NAME,
  contactEmail: "support@outlxx.co.uk",
  supportPhone: "+44 (0) 20 7946 0958",
  currency: "GBP",
  metaTitle: DEFAULT_TITLE,
  metaDescription: DEFAULT_DESCRIPTION,
  notifications: {
    orderConfirmation: true,
    shippingNotification: true,
    lowStockAlerts: true,
    newCustomerRegistrations: false,
    weeklyRevenueSummary: true,
  },
};

// Fetches the singleton settings document, creating it with defaults on first access.
async function fetchStoreSettings(): Promise<StoreSettings> {
  await connectDB();
  const doc = await Settings.findOneAndUpdate(
    { key: SETTINGS_KEY },
    { $setOnInsert: { key: SETTINGS_KEY } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();

  return {
    deliveryFee: doc.deliveryFee ?? 3.98,
    deliveryFeeNGN: doc.deliveryFeeNGN,
    storeName: doc.storeName ?? FALLBACK.storeName,
    contactEmail: doc.contactEmail ?? FALLBACK.contactEmail,
    supportPhone: doc.supportPhone ?? FALLBACK.supportPhone,
    currency: doc.currency ?? FALLBACK.currency,
    metaTitle: doc.metaTitle ?? FALLBACK.metaTitle,
    metaDescription: doc.metaDescription ?? FALLBACK.metaDescription,
    notifications: doc.notifications ?? FALLBACK.notifications,
  };
}

// Cached so root-layout metadata and every checkout/email read don't each hit
// Mongo — invalidated on-demand by invalidateStoreSettingsCache() after a save.
export const getStoreSettings = unstable_cache(fetchStoreSettings, ["store-settings"], {
  tags: [SETTINGS_CACHE_TAG],
  revalidate: 60,
});

export function invalidateStoreSettingsCache() {
  // { expire: 0 } forces immediate invalidation (not stale-while-revalidate) —
  // an admin saving settings expects the very next read to see the new value.
  revalidateTag(SETTINGS_CACHE_TAG, { expire: 0 });
}
