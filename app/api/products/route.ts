import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Product } from "@/lib/db/models/Product";
import { ok, err, requireAdmin, isNextResponse } from "@/lib/utils/api";

const ProductVariantSchema = z.object({
  label: z.string(),
  value: z.string(),
  available: z.boolean().default(true),
});

const ProductImageSchema = z.object({
  src: z.string().url(),
  alt: z.string(),
  cloudinaryPublicId: z.string().optional(),
});

const CreateProductSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  brand: z.string().min(1),
  category: z.enum(["tshirts", "pants", "armless", "tank-tops"]),
  subcategory: z.string().min(1),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  stock: z.number().int().min(0).default(100),
  isNew: z.boolean().default(false),
  isSale: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  images: z.array(ProductImageSchema).min(1),
  description: z.string().min(1),
  sizes: z.array(ProductVariantSchema),
  colors: z.array(ProductVariantSchema),
  material: z.string().min(1),
  careInstructions: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const sale = searchParams.get("sale");
  const newArrivals = searchParams.get("newArrivals");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "createdAt_desc";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50")));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};
  if (category) filter.category = category;
  if (featured === "true") filter.isFeatured = true;
  if (sale === "true") filter.isSale = true;
  if (newArrivals === "true") filter.isNew = true;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const [sortField, sortDir] = sort.split("_");
  const sortObj: Record<string, 1 | -1> = {
    [sortField === "price" ? "price" : "createdAt"]: sortDir === "asc" ? 1 : -1,
  };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortObj)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return ok({ products, total, page, limit, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();

  const body = await req.json();
  const parsed = CreateProductSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const existing = await Product.findOne({ slug: parsed.data.slug });
  if (existing) return err("A product with this slug already exists", 409);

  const product = await Product.create(parsed.data);
  return ok(product.toObject(), 201);
}
