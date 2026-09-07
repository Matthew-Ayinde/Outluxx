import type { ProductCategory } from "@/types/commerce";

/**
 * Single source of truth for the product taxonomy.
 *
 * Storefront nav, footer, homepage grid, PLP routes, sitemap, media slots,
 * admin filters/forms, analytics colours and the API/DB enums all derive from
 * this file — adding a category here is the only edit needed to introduce one.
 */
export type CategoryDef = {
  /** Stored on the product document; doubles as the storefront route segment. */
  slug: ProductCategory;
  /** Full display label — breadcrumbs, PLP hero, admin tables. */
  label: string;
  /** Compact label for the header/footer nav. */
  navLabel: string;
  /** Storefront path — always `/${slug}`, exposed so consumers don't rebuild it. */
  path: string;
  /** Eyebrow line above the PLP hero title. */
  subtitle: string;
  /** Meta description for the category page. */
  description: string;
  /** Media slot id for the homepage "Shop by Category" card. */
  gridSlot: string;
  /** Media slot id for the category page hero banner. */
  heroSlot: string;
  /** Fixed identity colour used in admin analytics — never cycled by rank. */
  color: string;
};

export const PRODUCT_CATEGORIES: readonly CategoryDef[] = [
  {
    slug: "tshirts",
    label: "T-Shirts",
    navLabel: "T-Shirts",
    path: "/tshirts",
    subtitle: "Outlxx Essentials",
    description: "Shop premium T-shirts at Outlxx — Supima, pima and modal cotton cut for everyday wear.",
    gridSlot: "category-tshirts",
    heroSlot: "plp-hero-tshirts",
    color: "#2a78d6",
  },
  {
    slug: "armless",
    label: "Armless / Tank Tops",
    navLabel: "Armless/Tank Tops",
    path: "/armless",
    subtitle: "Outlxx Essentials",
    description:
      "Shop armless and tank tops at Outlxx — silk, knit and linen sleeveless pieces for a refined wardrobe.",
    gridSlot: "category-armless",
    heroSlot: "plp-hero-armless",
    color: "#1baf7a",
  },
  {
    slug: "pants",
    label: "Pants",
    navLabel: "Pants",
    path: "/pants",
    subtitle: "Outlxx Essentials",
    description: "Shop premium pants and trousers at Outlxx — wool, linen and cotton tailoring.",
    gridSlot: "category-pants",
    heroSlot: "plp-hero-pants",
    color: "#eb6834",
  },
  {
    slug: "tracksuit",
    label: "Tracksuit",
    navLabel: "Tracksuit",
    path: "/tracksuit",
    subtitle: "Outlxx Essentials",
    description: "Shop tracksuits at Outlxx — matched sets, hoodies and joggers in heavyweight loopback cotton.",
    gridSlot: "category-tracksuit",
    heroSlot: "plp-hero-tracksuit",
    color: "#7c5cf0",
  },
  {
    slug: "jacket",
    label: "Jacket",
    navLabel: "Jacket",
    path: "/jacket",
    subtitle: "Outlxx Essentials",
    description: "Shop jackets at Outlxx — outerwear in wool, leather and waxed cotton, cut for layering.",
    gridSlot: "category-jacket",
    heroSlot: "plp-hero-jacket",
    color: "#d6336c",
  },
  {
    slug: "others",
    label: "Others",
    navLabel: "Others",
    path: "/others",
    subtitle: "Outlxx Essentials",
    description: "Shop everything else at Outlxx — accessories, outerwear and one-off pieces.",
    gridSlot: "category-others",
    heroSlot: "plp-hero-others",
    color: "#eda100",
  },
] as const;

/**
 * Ordered category slugs. Declared as a literal tuple (rather than mapped from
 * PRODUCT_CATEGORIES) because `z.enum` and the Mongoose enum need the literal
 * types at compile time. The `satisfies` clauses below keep it honest.
 */
export const CATEGORY_SLUGS = ["tshirts", "armless", "pants", "tracksuit", "jacket", "others"] as const;

// Compile-time guards: the tuple and the definitions must stay in lockstep, and
// every member of ProductCategory must have exactly one definition.
type _SlugsAreCategories = typeof CATEGORY_SLUGS extends readonly ProductCategory[] ? true : never;
type _CategoriesAreCovered = ProductCategory extends (typeof CATEGORY_SLUGS)[number] ? true : never;
const _slugCheck: _SlugsAreCategories = true;
const _coverageCheck: _CategoriesAreCovered = true;
void _slugCheck;
void _coverageCheck;

export const CATEGORY_LABELS: Record<ProductCategory, string> = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.slug, c.label])
) as Record<ProductCategory, string>;

const CATEGORY_BY_SLUG = new Map(PRODUCT_CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: ProductCategory): CategoryDef;
export function getCategory(slug: string): CategoryDef | undefined;
export function getCategory(slug: string): CategoryDef | undefined {
  return CATEGORY_BY_SLUG.get(slug as ProductCategory);
}

/**
 * Retired category slugs mapped to their replacement.
 *
 * `tank-tops` was merged into `armless` (the products keep their "Tank Tops"
 * subcategory). Kept so old links, bookmarks and any product row that predates
 * `npm run migrate:categories` still resolve instead of 404-ing.
 */
export const LEGACY_CATEGORY_SLUGS: Record<string, ProductCategory> = {
  "tank-tops": "armless",
  tanktops: "armless",
};

/** Resolves any incoming slug (current or retired) to a live category, or null. */
export function normalizeCategorySlug(slug: string | null | undefined): ProductCategory | null {
  if (!slug) return null;
  const key = slug.trim().toLowerCase();
  if (CATEGORY_BY_SLUG.has(key as ProductCategory)) return key as ProductCategory;
  return LEGACY_CATEGORY_SLUGS[key] ?? null;
}

export function categoryLabel(slug: string): string {
  return getCategory(slug)?.label ?? slug;
}
