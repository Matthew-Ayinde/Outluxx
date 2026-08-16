import mongoose, { Schema, model, models, Document } from "mongoose";
import { SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/config/seo";

// Singleton document — always accessed via the fixed key below.
export const SETTINGS_KEY = "store";

export interface ISettingsNotifications {
  orderConfirmation: boolean;
  shippingNotification: boolean;
  lowStockAlerts: boolean;
  newCustomerRegistrations: boolean;
  weeklyRevenueSummary: boolean;
}

export interface ISettings extends Document {
  key: string;
  deliveryFee: number;
  /** Independently-set Naira delivery fee shown to Nigerian visitors — not a converted equivalent. */
  deliveryFeeNGN?: number;
  storeName: string;
  contactEmail: string;
  supportPhone: string;
  currency: string;
  metaTitle: string;
  metaDescription: string;
  notifications: ISettingsNotifications;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationsSchema = new Schema<ISettingsNotifications>(
  {
    orderConfirmation: { type: Boolean, default: true },
    shippingNotification: { type: Boolean, default: true },
    lowStockAlerts: { type: Boolean, default: true },
    newCustomerRegistrations: { type: Boolean, default: false },
    weeklyRevenueSummary: { type: Boolean, default: true },
  },
  { _id: false }
);

const SettingsSchema = new Schema<ISettings>(
  {
    key: { type: String, required: true, unique: true, default: SETTINGS_KEY },
    deliveryFee: { type: Number, required: true, min: 0, default: 3.98 },
    deliveryFeeNGN: { type: Number, min: 0 },
    storeName: { type: String, required: true, default: SITE_NAME },
    contactEmail: { type: String, required: true, default: "support@outlxx.co.uk" },
    supportPhone: { type: String, required: true, default: "+44 (0) 7350 163255" },
    currency: { type: String, required: true, default: "GBP" },
    metaTitle: { type: String, required: true, default: DEFAULT_TITLE },
    metaDescription: { type: String, required: true, default: DEFAULT_DESCRIPTION },
    notifications: { type: NotificationsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export const Settings =
  (models.Settings as mongoose.Model<ISettings>) ||
  model<ISettings>("Settings", SettingsSchema);
