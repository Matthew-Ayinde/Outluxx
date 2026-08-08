import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ISiteMedia extends Document {
  slot: string;
  mediaType: "image" | "video";
  url: string;
  cloudinaryPublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteMediaSchema = new Schema<ISiteMedia>(
  {
    slot: { type: String, required: true, unique: true, index: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    cloudinaryPublicId: { type: String },
  },
  { timestamps: true }
);

export const SiteMedia =
  (models.SiteMedia as mongoose.Model<ISiteMedia>) ||
  model<ISiteMedia>("SiteMedia", SiteMediaSchema);
