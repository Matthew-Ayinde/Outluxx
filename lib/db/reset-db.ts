/**
 * Wipes all storefront data (orders, promo codes, products, content, and any
 * non-admin customers) and seeds exactly one product per category, tagged so
 * the homepage's Featured / New Arrivals / Sale sections each have content.
 *
 * Admin customer accounts (role: "admin") are left completely untouched.
 *
 * Run with: npm run db:reset
 * Requires MONGODB_URI in .env.local
 */
import "dotenv/config";
import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set in .env.local");
  process.exit(1);
}

// ── Inline schemas (no Next.js module resolution) ──────────────────────────

const ProductSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String, brand: String,
  category: { type: String, enum: ["tshirts", "pants", "armless", "tank-tops"] },
  subcategory: String,
  price: Number, compareAtPrice: Number,
  stock: { type: Number, default: 100 },
  isNew: Boolean, isSale: Boolean, isFeatured: Boolean,
  images: [{ src: String, alt: String, cloudinaryPublicId: String }],
  description: String,
  sizes: [{ label: String, value: String, available: Boolean }],
  colors: [{ label: String, value: String, available: Boolean }],
  material: String, careInstructions: String,
  tags: [String],
}, { timestamps: true });

const CustomerSchema = new mongoose.Schema({
  firstName: String, lastName: String,
  email: { type: String, unique: true, lowercase: true },
  passwordHash: String,
  role: { type: String, default: "customer" },
  addresses: [],
}, { timestamps: true });

const PromoCodeSchema = new mongoose.Schema({
  code: { type: String, unique: true, uppercase: true },
  discount: Number,
  usageLimit: Number,
  usedCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
}, { timestamps: true, strict: false });

const ContentSchema = new mongoose.Schema({
  key: { type: String, unique: true },
}, { timestamps: true, strict: false });

// ── Clean-slate product data (one per category) ────────────────────────────

const B = "https://picsum.photos/seed";

const PRODUCTS = [
  {
    slug: "supima-classic-crew-tee",
    title: "Supima Classic Crew", brand: "Maison Altair",
    category: "tshirts", subcategory: "T-Shirts",
    price: 195, isNew: true, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-ts1a/600/800`, alt: "Supima Classic Crew – front" },
      { src: `${B}/olx-ts1b/600/800`, alt: "Supima Classic Crew – back" },
    ],
    description: "Cut from 100% Supima cotton in a structured single-jersey knit. The weight and hand-feel are immediately apparent — dense without stiffness, cool without thinness.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S", value: "s", available: true },
      { label: "M", value: "m", available: true },
      { label: "L", value: "l", available: true },
      { label: "XL", value: "xl", available: false },
    ],
    colors: [
      { label: "White", value: "white", available: true },
      { label: "Black", value: "black", available: true },
      { label: "Stone", value: "stone", available: true },
    ],
    material: "100% Supima Cotton",
    careInstructions: "Machine wash cold, tumble dry low",
    tags: ["tshirt", "supima", "classic", "new-arrival", "featured"],
  },
  {
    slug: "wool-flannel-wide-trousers",
    title: "Wool Flannel Wide Trousers", brand: "Atelier Milo",
    category: "pants", subcategory: "Pants",
    price: 890, compareAtPrice: 1120, isNew: false, isSale: true, isFeatured: true,
    images: [
      { src: `${B}/olx-pt1a/600/800`, alt: "Wool Flannel Wide Trousers – front" },
      { src: `${B}/olx-pt1b/600/800`, alt: "Wool Flannel Wide Trousers – detail" },
    ],
    description: "Double-pleated, wide-leg trousers in Italian wool flannel. A high-rise waist with belt loops and side adjusters — a silhouette with genuine character.",
    sizes: [
      { label: "28", value: "28", available: true },
      { label: "30", value: "30", available: true },
      { label: "32", value: "32", available: true },
      { label: "34", value: "34", available: true },
    ],
    colors: [
      { label: "Charcoal", value: "charcoal", available: true },
      { label: "Stone", value: "stone", available: true },
    ],
    material: "100% Wool Flannel",
    careInstructions: "Dry clean only",
    tags: ["pants", "wool", "wide-leg", "sale", "featured"],
  },
  {
    slug: "silk-slip-camisole",
    title: "Silk Slip Camisole", brand: "Maison Altair",
    category: "armless", subcategory: "Armless",
    price: 420, isNew: true, isSale: false, isFeatured: false,
    images: [
      { src: `${B}/olx-ar1a/600/800`, alt: "Silk Slip Camisole – front" },
      { src: `${B}/olx-ar1b/600/800`, alt: "Silk Slip Camisole – back" },
    ],
    description: "Washed Charmeuse silk in a languid camisole cut. Adjustable satin straps and a fluid hem — worn alone or layered, both are correct choices.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S", value: "s", available: true },
      { label: "M", value: "m", available: true },
      { label: "L", value: "l", available: true },
    ],
    colors: [
      { label: "Ivory", value: "ivory", available: true },
      { label: "Black", value: "black", available: true },
    ],
    material: "100% Washed Charmeuse Silk",
    careInstructions: "Dry clean only",
    tags: ["armless", "silk", "camisole", "new-arrival"],
  },
  {
    slug: "pima-muscle-tank",
    title: "Pima Muscle Tank", brand: "Forma Studio",
    category: "tank-tops", subcategory: "Tank Tops",
    price: 145, isNew: false, isSale: false, isFeatured: true,
    images: [
      { src: `${B}/olx-tt1a/600/800`, alt: "Pima Muscle Tank – front" },
    ],
    description: "100% Pima cotton in a classic muscle tank silhouette — the tank every wardrobe needs to exist.",
    sizes: [
      { label: "XS", value: "xs", available: true },
      { label: "S", value: "s", available: true },
      { label: "M", value: "m", available: true },
      { label: "L", value: "l", available: true },
      { label: "XL", value: "xl", available: true },
    ],
    colors: [
      { label: "White", value: "white", available: true },
      { label: "Black", value: "black", available: true },
      { label: "Grey", value: "grey", available: true },
    ],
    material: "100% Pima Cotton",
    careInstructions: "Machine wash cold, tumble dry low",
    tags: ["tank-tops", "pima", "muscle", "featured"],
  },
];

// ── Reset function ──────────────────────────────────────────────────────────

async function reset() {
  console.log("🌱 Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI as string);
  console.log("✅ Connected");

  const ProductModel = mongoose.model("Product", ProductSchema);
  const CustomerModel = mongoose.model("Customer", CustomerSchema);
  const PromoCodeModel = mongoose.model("PromoCode", PromoCodeSchema);
  const OrderModel = mongoose.model("Order", OrderSchema);
  const ContentModel = mongoose.model("Content", ContentSchema);

  console.log("🗑️  Clearing products, orders, promo codes, content…");
  const [{ deletedCount: productsDeleted }, { deletedCount: ordersDeleted }, { deletedCount: promosDeleted }, { deletedCount: contentDeleted }] =
    await Promise.all([
      ProductModel.deleteMany({}),
      OrderModel.deleteMany({}),
      PromoCodeModel.deleteMany({}),
      ContentModel.deleteMany({}),
    ]);
  console.log(`   Products: ${productsDeleted}, Orders: ${ordersDeleted}, Promo codes: ${promosDeleted}, Content: ${contentDeleted}`);

  console.log("🗑️  Clearing non-admin customers (admins preserved)…");
  const { deletedCount: customersDeleted } = await CustomerModel.deleteMany({ role: { $ne: "admin" } });
  console.log(`   Customers removed: ${customersDeleted}`);

  const remainingAdmins = await CustomerModel.find({ role: "admin" }).lean();
  console.log(`   Admins kept: ${remainingAdmins.map((a) => a.email).join(", ")}`);

  console.log(`📦 Seeding ${PRODUCTS.length} products (one per category)…`);
  await ProductModel.insertMany(PRODUCTS.map((p) => ({ ...p, stock: 100 })));
  console.log("✅ Products seeded");

  await mongoose.disconnect();
  console.log("\n🎉 Clean slate ready.");
}

reset().catch((e) => {
  console.error("❌ Reset failed:", e);
  process.exit(1);
});
