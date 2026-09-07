import { PRODUCT_CATEGORIES } from "@/lib/config/categories";

export type NavItem = { label: string; href: string };

/** Header + mobile drawer nav — one entry per product category, in taxonomy order. */
export const primaryNavigation: NavItem[] = PRODUCT_CATEGORIES.map((c) => ({
  label: c.navLabel,
  href: c.path,
}));

/** Footer "Shop" column — the categories plus the evergreen edits. */
export const footerShopLinks: NavItem[] = [
  ...primaryNavigation,
  { label: "New Arrivals", href: "/new-arrivals" },
];
