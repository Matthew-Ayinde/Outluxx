import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config/seo";
import { getAllProducts } from "@/lib/data/server";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/tshirts", changeFrequency: "daily", priority: 0.8 },
  { path: "/pants", changeFrequency: "daily", priority: 0.8 },
  { path: "/armless", changeFrequency: "daily", priority: 0.8 },
  { path: "/tank-tops", changeFrequency: "daily", priority: 0.8 },
  { path: "/new-arrivals", changeFrequency: "daily", priority: 0.8 },
  { path: "/sale", changeFrequency: "daily", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/support", changeFrequency: "monthly", priority: 0.4 },
  { path: "/support/contact", changeFrequency: "monthly", priority: 0.4 },
  { path: "/support/faq", changeFrequency: "monthly", priority: 0.4 },
  { path: "/size-guide", changeFrequency: "monthly", priority: 0.4 },
  { path: "/shipping-delivery", changeFrequency: "monthly", priority: 0.4 },
  { path: "/returns-refunds", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
