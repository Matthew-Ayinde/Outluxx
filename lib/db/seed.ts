/**
 * Run with: npm run seed
 * Requires MONGODB_URI in .env.local
 */
import "dotenv/config";
import path from "path";
import { config } from "dotenv";

// Load .env.local for the seed script
config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  customerId: String,
  customerEmail: String,
  guestCheckout: Boolean,
  status: { type: String, default: "delivered" },
  paymentStatus: { type: String, default: "paid" },
  stripePaymentIntentId: String,
  items: [],
  subtotal: Number, shipping: Number, discount: Number, total: Number,
  shippingAddress: {},
  deliveryMethod: String,
}, { timestamps: true });

// ── Product data ────────────────────────────────────────────────────────────

const B = "https://picsum.photos/seed";

const PRODUCTS = [
  // T-SHIRTS
  { slug: "supima-classic-crew-tee", title: "Supima Classic Crew", brand: "Maison Altair", category: "tshirts", subcategory: "T-Shirts", price: 195, isNew: true, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-ts1a/600/800`, alt: "Supima Classic Crew – front" }, { src: `${B}/olx-ts1b/600/800`, alt: "Supima Classic Crew – back" }], description: "Cut from 100% Supima cotton in a structured single-jersey knit. The weight and hand-feel are immediately apparent — dense without stiffness, cool without thinness.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }, { label: "XL", value: "xl", available: false }], colors: [{ label: "White", value: "white", available: true }, { label: "Black", value: "black", available: true }, { label: "Stone", value: "stone", available: true }], material: "100% Supima Cotton", careInstructions: "Machine wash cold, tumble dry low", tags: ["tshirt", "supima", "classic", "new-arrival"] },
  { slug: "pima-relaxed-v-neck", title: "Relaxed Pima V-Neck", brand: "Studio Voss", category: "tshirts", subcategory: "T-Shirts", price: 175, compareAtPrice: 225, isNew: false, isSale: true, isFeatured: false, images: [{ src: `${B}/olx-ts2a/600/800`, alt: "Relaxed V-Neck – front" }], description: "A relaxed, slightly oversized silhouette in Peruvian Pima cotton. The V-neck opening is shallow — refined rather than revealing.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: false }, { label: "XL", value: "xl", available: true }], colors: [{ label: "Ivory", value: "ivory", available: true }, { label: "Charcoal", value: "charcoal", available: true }], material: "100% Peruvian Pima Cotton", careInstructions: "Machine wash cold, hang dry", tags: ["tshirt", "pima", "relaxed", "sale"] },
  { slug: "mercerised-polo-tee", title: "Mercerised Polo Tee", brand: "Crespi Milano", category: "tshirts", subcategory: "T-Shirts", price: 285, isNew: true, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-ts3a/600/800`, alt: "Mercerised Polo Tee – front" }], description: "Mercerised Egyptian cotton with a subtle lustre and silk-like drape.", sizes: [{ label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }, { label: "XL", value: "xl", available: true }, { label: "XXL", value: "xxl", available: false }], colors: [{ label: "White", value: "white", available: true }, { label: "Navy", value: "navy", available: true }], material: "100% Mercerised Egyptian Cotton", careInstructions: "Hand wash cold or machine wash delicate", tags: ["tshirt", "polo", "mercerised", "new-arrival"] },
  { slug: "modal-longline-tee", title: "Modal Longline Tee", brand: "Nero & Co.", category: "tshirts", subcategory: "T-Shirts", price: 155, isNew: false, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-ts4a/600/800`, alt: "Modal Longline Tee – front" }], description: "A longline silhouette in TENCEL Modal — one of the softest natural fibres available.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }, { label: "XL", value: "xl", available: true }], colors: [{ label: "Black", value: "black", available: true }, { label: "Chalk", value: "chalk", available: true }], material: "100% TENCEL Modal", careInstructions: "Machine wash cold, hang dry", tags: ["tshirt", "modal", "longline"] },
  { slug: "structured-boxy-tee", title: "Structured Boxy Tee", brand: "Forma Studio", category: "tshirts", subcategory: "T-Shirts", price: 220, isNew: false, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-ts5a/600/800`, alt: "Structured Boxy Tee – front" }], description: "Japanese heavy cotton twill in a boxy, cropped silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: false }, { label: "XL", value: "xl", available: true }], colors: [{ label: "Black", value: "black", available: true }, { label: "Ecru", value: "ecru", available: true }], material: "100% Japanese Heavy Cotton", careInstructions: "Machine wash cold inside out, hang dry", tags: ["tshirt", "boxy", "structured"] },
  { slug: "silk-cotton-blend-tee", title: "Silk-Cotton Blend Tee", brand: "Valmont Atelier", category: "tshirts", subcategory: "T-Shirts", price: 340, isNew: true, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-ts6a/600/800`, alt: "Silk-Cotton Tee – front" }], description: "A 70/30 blend of cotton and Mulberry silk.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }, { label: "XL", value: "xl", available: false }], colors: [{ label: "Pearl", value: "pearl", available: true }, { label: "Black", value: "black", available: true }], material: "70% Egyptian Cotton, 30% Mulberry Silk", careInstructions: "Hand wash cold only", tags: ["tshirt", "silk", "blend", "new-arrival", "luxury"] },
  // PANTS
  { slug: "wool-flannel-wide-trousers", title: "Wool Flannel Wide Trousers", brand: "Atelier Milo", category: "pants", subcategory: "Pants", price: 890, isNew: true, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-pt1a/600/800`, alt: "Wool Flannel Wide Trousers – front" }], description: "Double-pleated, wide-leg trousers in Italian wool flannel.", sizes: [{ label: "28", value: "28", available: true }, { label: "30", value: "30", available: true }, { label: "32", value: "32", available: true }, { label: "34", value: "34", available: true }], colors: [{ label: "Charcoal", value: "charcoal", available: true }, { label: "Stone", value: "stone", available: true }], material: "100% Wool Flannel", careInstructions: "Dry clean only", tags: ["pants", "wool", "wide-leg", "new-arrival"] },
  { slug: "crepe-slim-trousers", title: "Crêpe Slim Trousers", brand: "Ligne Claire", category: "pants", subcategory: "Pants", price: 620, compareAtPrice: 780, isNew: false, isSale: true, isFeatured: false, images: [{ src: `${B}/olx-pt2a/600/800`, alt: "Crêpe Slim Trousers – front" }], description: "Fluid crêpe in a slim, straight cut.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: false }], colors: [{ label: "Black", value: "black", available: true }, { label: "Ivory", value: "ivory", available: true }], material: "75% Polyester, 25% Viscose Crêpe", careInstructions: "Machine wash cold, hang dry", tags: ["pants", "crepe", "slim", "sale"] },
  { slug: "cashmere-jogger-pant", title: "Cashmere Jogger Pant", brand: "Nero & Co.", category: "pants", subcategory: "Pants", price: 1150, isNew: true, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-pt3a/600/800`, alt: "Cashmere Jogger – front" }], description: "Grade-A Mongolian cashmere in a relaxed jogger silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }], colors: [{ label: "Camel", value: "camel", available: true }, { label: "Black", value: "black", available: true }], material: "100% Grade-A Mongolian Cashmere", careInstructions: "Hand wash cold or dry clean", tags: ["pants", "cashmere", "jogger", "new-arrival", "luxury"] },
  { slug: "linen-wide-leg-pants", title: "Linen Wide-Leg Pants", brand: "Helios Collective", category: "pants", subcategory: "Pants", price: 485, isNew: false, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-pt4a/600/800`, alt: "Linen Wide-Leg Pants – front" }], description: "Belgian linen in a generously wide cut.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: false }], colors: [{ label: "Natural", value: "natural", available: true }, { label: "Black", value: "black", available: true }], material: "100% Belgian Linen", careInstructions: "Machine wash cold, line dry", tags: ["pants", "linen", "wide-leg"] },
  { slug: "technical-tapered-trousers", title: "Technical Tapered Trousers", brand: "Forma Studio", category: "pants", subcategory: "Pants", price: 740, isNew: false, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-pt5a/600/800`, alt: "Technical Trousers – front" }], description: "Performance-derived fabric in a tailored, tapered cut.", sizes: [{ label: "28", value: "28", available: true }, { label: "30", value: "30", available: true }, { label: "32", value: "32", available: true }], colors: [{ label: "Black", value: "black", available: true }, { label: "Graphite", value: "graphite", available: true }], material: "85% Nylon, 15% Elastane", careInstructions: "Machine wash cold, hang dry", tags: ["pants", "technical", "tapered"] },
  { slug: "silk-wide-palazzo-pants", title: "Silk Wide Palazzo Pants", brand: "Valmont Atelier", category: "pants", subcategory: "Pants", price: 980, compareAtPrice: 1250, isNew: false, isSale: true, isFeatured: false, images: [{ src: `${B}/olx-pt6a/600/800`, alt: "Palazzo Pants – front" }], description: "Palazzo-width trousers cut from Habotai silk.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }], colors: [{ label: "Ivory", value: "ivory", available: true }, { label: "Black", value: "black", available: true }], material: "100% Habotai Silk", careInstructions: "Dry clean only", tags: ["pants", "silk", "palazzo", "sale"] },
  // ARMLESS
  { slug: "silk-slip-camisole", title: "Silk Slip Camisole", brand: "Maison Altair", category: "armless", subcategory: "Armless", price: 420, isNew: true, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-ar1a/600/800`, alt: "Silk Slip Camisole – front" }], description: "Washed Charmeuse silk in a languid camisole cut.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }], colors: [{ label: "Ivory", value: "ivory", available: true }, { label: "Black", value: "black", available: true }], material: "100% Washed Charmeuse Silk", careInstructions: "Dry clean only", tags: ["armless", "silk", "camisole", "new-arrival"] },
  { slug: "ribbed-knit-sleeveless-top", title: "Ribbed Knit Sleeveless", brand: "Studio Voss", category: "armless", subcategory: "Armless", price: 295, isNew: false, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-ar2a/600/800`, alt: "Ribbed Sleeveless – front" }], description: "Fine-gauge merino wool in a close-knit rib.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }], colors: [{ label: "Cream", value: "cream", available: true }, { label: "Black", value: "black", available: true }], material: "100% Fine-Gauge Merino Wool", careInstructions: "Hand wash cold or dry clean", tags: ["armless", "knit", "merino"] },
  { slug: "structured-bustier-top", title: "Structured Bustier Top", brand: "Valmont Atelier", category: "armless", subcategory: "Armless", price: 695, compareAtPrice: 890, isNew: false, isSale: true, isFeatured: false, images: [{ src: `${B}/olx-ar3a/600/800`, alt: "Structured Bustier – front" }], description: "A tailored bustier in duchess satin.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }], colors: [{ label: "Ivory", value: "ivory", available: true }, { label: "Black", value: "black", available: true }], material: "80% Silk, 20% Polyester Duchess Satin", careInstructions: "Dry clean only", tags: ["armless", "bustier", "sale"] },
  { slug: "cotton-halter-neck", title: "Cotton Halter Neck", brand: "Helios Collective", category: "armless", subcategory: "Armless", price: 185, isNew: false, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-ar4a/600/800`, alt: "Cotton Halter – front" }], description: "Organic cotton poplin in a clean halter silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }], colors: [{ label: "White", value: "white", available: true }, { label: "Navy", value: "navy", available: true }], material: "100% Organic Cotton Poplin", careInstructions: "Machine wash cold, hang dry", tags: ["armless", "halter", "cotton"] },
  { slug: "lace-trim-tank", title: "Lace Trim Tank", brand: "Crespi Milano", category: "armless", subcategory: "Armless", price: 345, isNew: true, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-ar5a/600/800`, alt: "Lace Trim Tank – front" }], description: "Silk charmeuse with delicate French lace trim at the neckline.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }], colors: [{ label: "Ecru", value: "ecru", available: true }, { label: "Black", value: "black", available: true }], material: "95% Silk Charmeuse, 5% Nylon Lace", careInstructions: "Dry clean only", tags: ["armless", "lace", "silk", "new-arrival"] },
  { slug: "oversized-knit-vest", title: "Oversized Knit Vest", brand: "Atelier Milo", category: "armless", subcategory: "Armless", price: 520, compareAtPrice: 650, isNew: false, isSale: true, isFeatured: false, images: [{ src: `${B}/olx-ar6a/600/800`, alt: "Knit Vest – front" }], description: "Chunky-gauge alpaca in a relaxed, oversized vest silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: false }], colors: [{ label: "Oatmeal", value: "oatmeal", available: true }, { label: "Camel", value: "camel", available: true }], material: "80% Alpaca, 20% Wool", careInstructions: "Dry clean only", tags: ["armless", "knit", "vest", "sale"] },
  // TANK TOPS
  { slug: "pima-muscle-tank", title: "Pima Muscle Tank", brand: "Forma Studio", category: "tank-tops", subcategory: "Tank Tops", price: 145, isNew: true, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-tt1a/600/800`, alt: "Pima Muscle Tank – front" }], description: "100% Pima cotton in a classic muscle tank silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }, { label: "XL", value: "xl", available: true }], colors: [{ label: "White", value: "white", available: true }, { label: "Black", value: "black", available: true }, { label: "Grey", value: "grey", available: true }], material: "100% Pima Cotton", careInstructions: "Machine wash cold, tumble dry low", tags: ["tank-tops", "pima", "muscle", "new-arrival"] },
  { slug: "ribbed-stretch-tank", title: "Ribbed Stretch Tank", brand: "Studio Voss", category: "tank-tops", subcategory: "Tank Tops", price: 175, isNew: false, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-tt2a/600/800`, alt: "Ribbed Tank – front" }], description: "A lightweight ribbed tank with 4-way stretch — moves with you.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }], colors: [{ label: "Black", value: "black", available: true }, { label: "Ivory", value: "ivory", available: true }], material: "90% Cotton, 10% Elastane", careInstructions: "Machine wash cold, hang dry", tags: ["tank-tops", "ribbed", "stretch"] },
  { slug: "modal-scoop-tank", title: "Modal Scoop Tank", brand: "Nero & Co.", category: "tank-tops", subcategory: "Tank Tops", price: 195, compareAtPrice: 240, isNew: false, isSale: true, isFeatured: false, images: [{ src: `${B}/olx-tt3a/600/800`, alt: "Modal Scoop Tank – front" }], description: "Whisper-light modal jersey in a generous scoop-neck silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: false }], colors: [{ label: "Stone", value: "stone", available: true }, { label: "Black", value: "black", available: true }], material: "100% TENCEL Modal", careInstructions: "Machine wash cold, hang dry", tags: ["tank-tops", "modal", "sale"] },
  { slug: "linen-tank-top", title: "Linen Tank Top", brand: "Helios Collective", category: "tank-tops", subcategory: "Tank Tops", price: 210, isNew: true, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-tt4a/600/800`, alt: "Linen Tank – front" }], description: "Stonewashed linen in a relaxed tank silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }], colors: [{ label: "Natural", value: "natural", available: true }, { label: "Navy", value: "navy", available: true }], material: "100% Stonewashed Linen", careInstructions: "Machine wash cold, line dry", tags: ["tank-tops", "linen", "new-arrival"] },
  { slug: "silk-athletic-tank", title: "Silk Athletic Tank", brand: "Valmont Atelier", category: "tank-tops", subcategory: "Tank Tops", price: 480, isNew: false, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-tt5a/600/800`, alt: "Silk Athletic Tank – front" }], description: "Pure Silk in a performance-inspired silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }], colors: [{ label: "Ivory", value: "ivory", available: true }, { label: "Black", value: "black", available: true }], material: "100% Silk", careInstructions: "Dry clean only", tags: ["tank-tops", "silk", "luxury"] },
  { slug: "merino-rib-tank", title: "Merino Rib Tank", brand: "Atelier Milo", category: "tank-tops", subcategory: "Tank Tops", price: 285, compareAtPrice: 350, isNew: false, isSale: true, isFeatured: false, images: [{ src: `${B}/olx-tt6a/600/800`, alt: "Merino Rib Tank – front" }], description: "Extra-fine merino in a fitted ribbed tank.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }], colors: [{ label: "Charcoal", value: "charcoal", available: true }, { label: "Black", value: "black", available: true }], material: "100% Extra-Fine Merino Wool", careInstructions: "Hand wash cold", tags: ["tank-tops", "merino", "ribbed", "sale"] },
  // Extra products to round to 30
  { slug: "heavyweight-crew-tee", title: "Heavyweight Crew Tee", brand: "Forma Studio", category: "tshirts", subcategory: "T-Shirts", price: 245, isNew: true, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-ts7a/600/800`, alt: "Heavyweight Crew – front" }], description: "550gsm cotton terry in a boxy crew neck silhouette.", sizes: [{ label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }, { label: "XL", value: "xl", available: true }], colors: [{ label: "Black", value: "black", available: true }, { label: "White", value: "white", available: true }], material: "100% Heavy Cotton Terry", careInstructions: "Machine wash cold", tags: ["tshirt", "heavyweight", "new-arrival"] },
  { slug: "cotton-poplin-wide-leg", title: "Cotton Poplin Wide-Leg", brand: "Ligne Claire", category: "pants", subcategory: "Pants", price: 395, isNew: false, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-pt7a/600/800`, alt: "Cotton Poplin Wide-Leg – front" }], description: "100% Egyptian cotton poplin in a wide-leg cut.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }], colors: [{ label: "White", value: "white", available: true }, { label: "Navy", value: "navy", available: true }], material: "100% Egyptian Cotton Poplin", careInstructions: "Machine wash cold", tags: ["pants", "cotton", "poplin"] },
  { slug: "stretch-knit-tank", title: "Stretch Knit Tank", brand: "Crespi Milano", category: "tank-tops", subcategory: "Tank Tops", price: 225, isNew: false, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-tt7a/600/800`, alt: "Stretch Knit Tank – front" }], description: "A fine-knit stretch tank with a luxurious hand-feel.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }], colors: [{ label: "Black", value: "black", available: true }, { label: "Ivory", value: "ivory", available: true }], material: "80% Viscose, 20% Polyamide", careInstructions: "Hand wash cold", tags: ["tank-tops", "stretch", "knit"] },
  { slug: "viscose-drape-cami", title: "Viscose Drape Cami", brand: "Studio Voss", category: "armless", subcategory: "Armless", price: 265, isNew: false, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-ar7a/600/800`, alt: "Viscose Drape Cami – front" }], description: "Fluid viscose in a draped camisole silhouette.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }], colors: [{ label: "Nude", value: "nude", available: true }, { label: "Black", value: "black", available: true }], material: "100% Viscose", careInstructions: "Hand wash cold, hang dry", tags: ["armless", "viscose", "drape"] },
  { slug: "tailored-linen-shirt", title: "Tailored Linen Shirt", brand: "Atelier Milo", category: "tshirts", subcategory: "T-Shirts", price: 320, isNew: false, isSale: false, isFeatured: true, images: [{ src: `${B}/olx-ts8a/600/800`, alt: "Tailored Linen Shirt – front" }], description: "A relaxed-fit linen shirt with dropped shoulders.", sizes: [{ label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }, { label: "XL", value: "xl", available: true }], colors: [{ label: "Sand", value: "sand", available: true }, { label: "White", value: "white", available: true }], material: "100% Irish Linen", careInstructions: "Machine wash cold, line dry", tags: ["tshirt", "linen", "shirt"] },
  { slug: "ponte-slim-trousers", title: "Ponte Slim Trousers", brand: "Nero & Co.", category: "pants", subcategory: "Pants", price: 545, isNew: true, isSale: false, isFeatured: false, images: [{ src: `${B}/olx-pt8a/600/800`, alt: "Ponte Slim – front" }], description: "Double-knit ponte in a slim, straight cut.", sizes: [{ label: "XS", value: "xs", available: true }, { label: "S", value: "s", available: true }, { label: "M", value: "m", available: true }, { label: "L", value: "l", available: true }], colors: [{ label: "Black", value: "black", available: true }, { label: "Charcoal", value: "charcoal", available: true }], material: "68% Polyester, 27% Viscose, 5% Elastane", careInstructions: "Machine wash cold, hang dry", tags: ["pants", "ponte", "slim", "new-arrival"] },
];

// ── Seed function ───────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI as string);
  console.log("✅ Connected");

  const ProductModel = mongoose.model("Product", ProductSchema);
  const CustomerModel = mongoose.model("Customer", CustomerSchema);
  const PromoCodeModel = mongoose.model("PromoCode", PromoCodeSchema);
  const OrderModel = mongoose.model("Order", OrderSchema);

  // Clear collections
  console.log("🗑️  Clearing existing data…");
  await ProductModel.deleteMany({});
  await CustomerModel.deleteMany({});
  await PromoCodeModel.deleteMany({});
  await OrderModel.deleteMany({});

  // Seed products
  console.log(`📦 Seeding ${PRODUCTS.length} products…`);
  await ProductModel.insertMany(PRODUCTS.map((p) => ({ ...p, stock: 100 })));
  console.log(`✅ Products seeded`);

  // Seed admin user
  console.log("👤 Seeding admin user…");
  const passwordHash = await bcrypt.hash("Admin1234!", 12);
  await CustomerModel.create({
    firstName: "Admin",
    lastName: "Outluxx",
    email: "admin@outluxx.com",
    passwordHash,
    role: "admin",
  });
  console.log("✅ Admin: admin@outluxx.com / Admin1234!");

  // Seed a test customer
  const customerHash = await bcrypt.hash("Test1234!", 12);
  await CustomerModel.create({
    firstName: "Test",
    lastName: "Customer",
    email: "customer@outluxx.com",
    passwordHash: customerHash,
    role: "customer",
  });
  console.log("✅ Customer: customer@outluxx.com / Test1234!");

  // Seed promo codes
  console.log("🏷️  Seeding promo codes…");
  await PromoCodeModel.insertMany([
    { code: "OUTLUXX10", discount: 0.10 },
    { code: "FIRST15", discount: 0.15 },
    { code: "VIP20", discount: 0.20, usageLimit: 100 },
  ]);
  console.log("✅ Promo codes: OUTLUXX10, FIRST15, VIP20");

  await mongoose.disconnect();
  console.log("\n🎉 Seed complete!");
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
