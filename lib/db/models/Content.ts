import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IContent extends Document {
  key: string;
  type: "hero" | "editorial" | "banner" | "carousel";
  title: string;
  subtitle?: string;
  cloudinaryPublicId?: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  cta?: {
    text: string;
    href: string;
  };
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    key: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      required: true,
      enum: ["hero", "editorial", "banner", "carousel"],
    },
    title: { type: String, required: true },
    subtitle: { type: String },
    cloudinaryPublicId: { type: String },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    cta: {
      type: new Schema(
        { text: { type: String }, href: { type: String } },
        { _id: false }
      ),
    },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ContentSchema.index({ active: 1, order: 1 });

export const Content =
  (models.Content as mongoose.Model<IContent>) ||
  model<IContent>("Content", ContentSchema);
