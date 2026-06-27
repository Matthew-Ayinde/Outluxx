import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPromoCode extends Document {
  code: string;
  discount: number;
  usageLimit?: number;
  usedCount: number;
  expiresAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PromoCodeSchema = new Schema<IPromoCode>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, index: true },
    discount: { type: Number, required: true, min: 0, max: 1 },
    usageLimit: { type: Number },
    usedCount: { type: Number, default: 0 },
    expiresAt: { type: Date },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PromoCode =
  (models.PromoCode as mongoose.Model<IPromoCode>) ||
  model<IPromoCode>("PromoCode", PromoCodeSchema);
