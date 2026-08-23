/**
 * One-off migration: normalizes every product's `slug` to a clean
 * lowercase-hyphenated form (letters/numbers only, joined by single hyphens).
 *
 * Slugs that already match the normalized form are left untouched. If two
 * products would normalize to the same slug, a numeric suffix (-2, -3, ...)
 * is appended to keep them unique.
 *
 * Run with: npm run fix-slugs
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

// ── Inline schema (no Next.js module resolution) ────────────────────────────

const ProductSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String,
});

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function fixSlugs() {
  console.log("🌱 Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI as string);
  const Product = mongoose.model("Product", ProductSchema, "products");

  const products = await Product.find({}, { slug: 1, title: 1 }).lean();
  const takenSlugs = new Set(products.map((p) => p.slug));

  let fixed = 0;
  for (const product of products) {
    const base = slugify(product.title || product.slug);
    if (product.slug === base) continue; // already clean

    let candidate = base || product.slug;
    let suffix = 2;
    while (takenSlugs.has(candidate) && candidate !== product.slug) {
      candidate = `${base}-${suffix++}`;
    }

    if (candidate === product.slug) continue;

    takenSlugs.delete(product.slug);
    takenSlugs.add(candidate);

    await Product.updateOne({ _id: product._id }, { $set: { slug: candidate } });
    console.log(`  ✔ "${product.title}": "${product.slug}" → "${candidate}"`);
    fixed++;
  }

  console.log(fixed > 0 ? `✅  Fixed ${fixed} slug(s).` : "✅  All slugs already clean — nothing to fix.");
  await mongoose.disconnect();
}

fixSlugs().catch((err) => {
  console.error("❌  Migration failed:", err);
  process.exit(1);
});
