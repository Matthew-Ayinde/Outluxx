import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Product } from "@/lib/db/models/Product";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const { slug } = await params;
  const product = await Product.findOne({ slug }).lean();
  if (!product) return err("Product not found", 404);
  return ok(product);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const { slug } = await params;

  const body = await req.json();
  const UpdateSchema = z.object({
    title: z.string().min(1).optional(),
    brand: z.string().min(1).optional(),
    category: z.enum(["tshirts", "pants", "armless", "tank-tops"]).optional(),
    subcategory: z.string().optional(),
    price: z.number().positive().optional(),
    compareAtPrice: z.number().positive().nullable().optional(),
    stock: z.number().int().min(0).optional(),
    isNew: z.boolean().optional(),
    isSale: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string(), cloudinaryPublicId: z.string().optional() })).optional(),
    description: z.string().min(1).optional(),
    sizes: z.array(z.object({ label: z.string(), value: z.string(), available: z.boolean() })).optional(),
    colors: z.array(z.object({ label: z.string(), value: z.string(), available: z.boolean() })).optional(),
    material: z.string().optional(),
    careInstructions: z.string().optional(),
    tags: z.array(z.string()).optional(),
  });

  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const product = await Product.findOneAndUpdate(
    { slug },
    { $set: parsed.data },
    { new: true, runValidators: true }
  ).lean();

  if (!product) return err("Product not found", 404);
  return ok(product);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const { slug } = await params;

  const product = await Product.findOne({ slug });
  if (!product) return err("Product not found", 404);

  // Delete images from Cloudinary
  const publicIds = product.images
    .map((img) => img.cloudinaryPublicId)
    .filter(Boolean) as string[];

  if (publicIds.length > 0) {
    await cloudinary.api.delete_resources(publicIds);
  }

  await product.deleteOne();
  return ok({ deleted: true });
}
