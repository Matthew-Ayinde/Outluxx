/**
 * Server-only data fetchers — import these in Server Components and API routes.
 * They access MongoDB directly without an HTTP round-trip.
 */
import connectDB from "@/lib/db/mongoose";
import { Product as ProductModel } from "@/lib/db/models/Product";
import { Customer as CustomerModel, type ICustomerAddress } from "@/lib/db/models/Customer";
import { Order as OrderModel, type IOrderItem, type IAddress, type OrderStatus, type PaymentStatus } from "@/lib/db/models/Order";
import type { Product, ProductCategory } from "@/types/commerce";
import type { IProduct } from "@/lib/db/models/Product";
import mongoose from "mongoose";

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
    images: doc.images.map(({ src, alt }) => ({ src, alt })),
    description: doc.description,
    sizes: doc.sizes.map(({ label, value, available }) => ({ label, value, available })),
    colors: doc.colors.map(({ label, value, available }) => ({ label, value, available })),
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

// ── Account data (session-scoped) ───────────────────────────────────────────

export interface AccountProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses: ICustomerAddress[];
  memberSince: string;
}

export interface AccountOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: IAddress;
  deliveryMethod: "standard" | "express";
  placedAt: string;
}

interface LeanOrder {
  _id: mongoose.Types.ObjectId;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: IAddress;
  deliveryMethod: "standard" | "express";
  createdAt: Date;
}

function toAccountOrder(doc: LeanOrder): AccountOrder {
  return {
    id: doc._id.toString(),
    orderNumber: doc.orderNumber,
    status: doc.status,
    paymentStatus: doc.paymentStatus,
    items: doc.items.map(({ productId, productTitle, productBrand, productImage, quantity, selectedSize, selectedColor, price }) => ({
      productId, productTitle, productBrand, productImage, quantity, selectedSize, selectedColor, price,
    })),
    subtotal: doc.subtotal,
    shipping: doc.shipping,
    discount: doc.discount,
    total: doc.total,
    shippingAddress: {
      firstName: doc.shippingAddress.firstName,
      lastName: doc.shippingAddress.lastName,
      line1: doc.shippingAddress.line1,
      line2: doc.shippingAddress.line2,
      city: doc.shippingAddress.city,
      state: doc.shippingAddress.state,
      postalCode: doc.shippingAddress.postalCode,
      country: doc.shippingAddress.country,
    },
    deliveryMethod: doc.deliveryMethod,
    placedAt: doc.createdAt.toISOString(),
  };
}

export async function getCustomerProfile(customerId: string): Promise<AccountProfile | null> {
  await connectDB();
  const doc = await CustomerModel.findById(customerId).lean();
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    phone: doc.phone,
    addresses: doc.addresses.map(({ id, label, firstName, lastName, line1, line2, city, state, postalCode, country, isDefault }) => ({
      id, label, firstName, lastName, line1, line2, city, state, postalCode, country, isDefault,
    })),
    memberSince: doc.createdAt.toISOString(),
  };
}

export async function getCustomerOrders(customerId: string): Promise<AccountOrder[]> {
  await connectDB();
  const docs = await OrderModel.find({ customerId })
    .sort({ createdAt: -1 })
    .lean<LeanOrder[]>();
  return docs.map(toAccountOrder);
}

export async function getCustomerOrder(customerId: string, orderId: string): Promise<AccountOrder | null> {
  if (!mongoose.isValidObjectId(orderId)) return null;
  await connectDB();
  const doc = await OrderModel.findOne({ _id: orderId, customerId }).lean<LeanOrder>();
  if (!doc) return null;
  return toAccountOrder(doc);
}
