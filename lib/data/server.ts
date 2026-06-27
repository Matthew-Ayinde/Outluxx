/**
 * Server-only data fetchers — import these in Server Components and API routes.
 * They access MongoDB directly without an HTTP round-trip.
 */
import connectDB from "@/lib/db/mongoose";
import { Product as ProductModel } from "@/lib/db/models/Product";
import type { Product, ProductCategory } from "@/types/commerce";
import type { IProduct } from "@/lib/db/models/Product";
import type mongoose from "mongoose";

type LeanProduct = Omit<IProduct, "_id"> & { _id: mongoose.Types.ObjectId };

function toProduct(doc: LeanProduct): Product {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    brand: doc.brand,
    category: doc.category,
    subcategory: doc.subcategory,
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    isNew: doc.isNew,
    isSale: doc.isSale,
    isFeatured: doc.isFeatured,
    images: doc.images,
    description: doc.description,
    sizes: doc.sizes,
    colors: doc.colors,
    material: doc.material,
    careInstructions: doc.careInstructions,
    tags: doc.tags,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connectDB();
  const doc = await ProductModel.findOne({ slug }).lean<LeanProduct>();
  if (!doc) return null;
  return toProduct(doc);
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  await connectDB();
  const docs = await ProductModel.find({ category }).sort({ createdAt: -1 }).lean<LeanProduct[]>();
  return docs.map(toProduct);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  await connectDB();
  const docs = await ProductModel.find({ isFeatured: true }).limit(limit).lean<LeanProduct[]>();
  return docs.map(toProduct);
}

export async function getNewArrivals(): Promise<Product[]> {
  await connectDB();
  const docs = await ProductModel.find({ isNew: true }).sort({ createdAt: -1 }).lean<LeanProduct[]>();
  return docs.map(toProduct);
}

export async function getSaleProducts(): Promise<Product[]> {
  await connectDB();
  const docs = await ProductModel.find({ isSale: true }).lean<LeanProduct[]>();
  return docs.map(toProduct);
}

export async function getAllProducts(opts: {
  category?: ProductCategory;
  search?: string;
  sort?: string;
} = {}): Promise<Product[]> {
  await connectDB();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};
  if (opts.category) filter.category = opts.category;
  if (opts.search) {
    filter.$or = [
      { title: { $regex: opts.search, $options: "i" } },
      { brand: { $regex: opts.search, $options: "i" } },
    ];
  }

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "newest": { createdAt: -1 },
  };
  const sortObj = sortMap[opts.sort ?? ""] ?? { createdAt: -1 as const };

  const docs = await ProductModel.find(filter).sort(sortObj).lean<LeanProduct[]>();
  return docs.map(toProduct);
}
