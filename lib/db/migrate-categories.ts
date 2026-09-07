/**
 * One-off migration: retires the `tank-tops` category by folding it into
 * `armless`.
 *
 * Every product with `category: "tank-tops"` is moved to `category: "armless"`
 * and given `subcategory: "Tank Tops"` — the merged Armless listing exposes
 * subcategory as a filter, so the distinction survives the merge instead of
 * being flattened away. Products already on a live category are untouched, so
 * the script is safe to re-run.
 *
 * Run with: npm run migrate:categories
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

// Kept in step with lib/config/categories.ts. Declared inline (rather than
// imported) so the script runs under plain tsx without Next.js path resolution.
const LIVE_CATEGORIES = ["tshirts", "armless", "pants", "tracksuit", "jacket", "others"];
const MERGES: Array<{ from: string; to: string; subcategory: string }> = [
  { from: "tank-tops", to: "armless", subcategory: "Tank Tops" },
  { from: "tanktops", to: "armless", subcategory: "Tank Tops" },
];

// ── Inline schema (no Next.js module resolution) ────────────────────────────

const ProductSchema = new mongoose.Schema(
  {
    slug: String,
    title: String,
    category: String,
    subcategory: String,
    tags: [String],
  },
  { strict: false }
);

async function migrate() {
  console.log("🌱 Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI as string);
  const Product = mongoose.model("Product", ProductSchema, "products");

  let moved = 0;

  for (const { from, to, subcategory } of MERGES) {
    const docs = await Product.find({ category: from }, { slug: 1, title: 1 }).lean();
    if (docs.length === 0) continue;

    const res = await Product.updateMany(
      { category: from },
      {
        $set: { category: to, subcategory },
        // Keep the old slug as a tag so search and merchandising still find these.
        $addToSet: { tags: from },
      }
    );
    moved += res.modifiedCount;
    console.log(`  ✔ "${from}" → "${to}" (subcategory "${subcategory}"): ${res.modifiedCount} product(s)`);
    for (const doc of docs) console.log(`      · ${doc.title ?? doc.slug}`);
  }

  // Anything left on a slug we no longer recognise would be invisible on the
  // storefront (no listing page queries it) — surface it rather than silently
  // dropping it into a category it may not belong in.
  const orphans = await Product.find(
    { category: { $nin: LIVE_CATEGORIES } },
    { slug: 1, title: 1, category: 1 }
  ).lean();

  if (orphans.length > 0) {
    console.warn(`\n⚠️  ${orphans.length} product(s) sit on an unknown category and will not appear on any listing page:`);
    for (const o of orphans) console.warn(`      · ${o.title ?? o.slug} → "${o.category}"`);
    console.warn("   Reassign them in the admin panel (Products → Edit → Category).");
  }

  console.log(
    moved > 0
      ? `\n✅  Migrated ${moved} product(s).`
      : "\n✅  Nothing to migrate — no products on a retired category."
  );

  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("❌  Migration failed:", err);
  process.exit(1);
});
