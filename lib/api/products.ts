import { apiFetch } from "./client";
import type { Product, ProductCategory } from "@/types/commerce";

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ProductQueryOpts {
  category?: ProductCategory;
  featured?: boolean;
  sale?: boolean;
  newArrivals?: boolean;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

function buildQuery(opts: ProductQueryOpts = {}): string {
  const params = new URLSearchParams();
  if (opts.category) params.set("category", opts.category);
  if (opts.featured) params.set("featured", "true");
  if (opts.sale) params.set("sale", "true");
  if (opts.newArrivals) params.set("newArrivals", "true");
  if (opts.search) params.set("search", opts.search);
  if (opts.sort) params.set("sort", opts.sort);
  if (opts.page) params.set("page", String(opts.page));
  if (opts.limit) params.set("limit", String(opts.limit));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function getProducts(opts?: ProductQueryOpts): Promise<ProductListResponse> {
  return apiFetch(`/api/products${buildQuery(opts)}`, { cache: "no-store" });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/api/products/${slug}`, { cache: "no-store" });
  } catch {
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await getProducts({ featured: true, limit: 8 });
  return res.products;
}

export async function getSaleProducts(): Promise<Product[]> {
  const res = await getProducts({ sale: true });
  return res.products;
}

export async function getNewArrivals(): Promise<Product[]> {
  const res = await getProducts({ newArrivals: true });
  return res.products;
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const res = await getProducts({ category });
  return res.products;
}
