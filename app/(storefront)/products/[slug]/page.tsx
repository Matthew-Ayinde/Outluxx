import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProducts } from "@/lib/data/server";
import PDPClient from "./PDPClient";
import type { Product } from "@/types/commerce";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: `${product.title} — ${product.brand}` };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Related: same category, exclude current
  const all = await getAllProducts({ category: product.category });
  const related: Product[] = all.filter((p) => p.slug !== product.slug).slice(0, 4);

  return <PDPClient product={product} related={related} />;
}
