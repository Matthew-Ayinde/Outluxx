import mongoose, { Schema, model, models } from "mongoose";

export interface IProductImage {
  src: string;
  alt: string;
  cloudinaryPublicId?: string;
}

export interface IProductVariant {
  label: string;
  value: string;
  available: boolean;
}

// Note: IProduct does NOT extend Document to avoid conflict with Document.isNew
export interface IProduct {
  _id: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  brand: string;
  category: "tshirts" | "pants" | "armless" | "tank-tops";
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  isNew: boolean;
  isSale: boolean;
  isFeatured: boolean;
  images: IProductImage[];
  description: string;
  sizes: IProductVariant[];
  colors: IProductVariant[];
  material: string;
  careInstructions: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductSchema = new Schema<any>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true, enum: ["tshirts", "pants", "armless", "tank-tops"] },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    stock: { type: Number, default: 100, min: 0 },
    isNew: { type: Boolean, default: false },
    isSale: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    images: {
      type: [{ src: String, alt: String, cloudinaryPublicId: String, _id: false }],
      default: [],
    },
    description: { type: String, required: true },
    sizes: {
      type: [{ label: String, value: String, available: Boolean, _id: false }],
      default: [],
    },
    colors: {
      type: [{ label: String, value: String, available: Boolean, _id: false }],
      default: [],
    },
    material: { type: String, required: true },
    careInstructions: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1, isSale: 1, isFeatured: 1 });
ProductSchema.index({ tags: 1 });

export const Product =
  (models.Product as mongoose.Model<IProduct>) ||
  model<IProduct>("Product", ProductSchema);
