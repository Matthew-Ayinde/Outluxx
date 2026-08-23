import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProducts } from "@/lib/data/server";
import PDPClient from "./PDPClient";
import type { Product } from "@/types/commerce";
import { pageMetadata, SITE_URL, breadcrumbJsonLd } from "@/lib/config/seo";
import { getPageCurrency } from "@/lib/currency/getPageCurrency";
import { resolveProductPrice } from "@/lib/utils/price";
import { CATEGORY_LABELS } from "@/lib/config/categories";
import JsonLd from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const description = product.description?.trim().length
    ? product.description.slice(0, 155)
    : `Shop the ${product.title} by ${product.brand} at Outlxx — ${product.material}.`;

  return pageMetadata({
    title: `${product.title} — ${product.brand}`,
    description,
    path: `/products/${product.slug}`,
    image: product.images[0]?.src,
    imageAlt: product.images[0]?.alt ?? product.title,
    type: "website",
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Related: same category, exclude current
  const all = await getAllProducts({ category: product.category });
  const related: Product[] = all.filter((p) => p.slug !== product.slug).slice(0, 4);

  const inStock = product.sizes.some((s) => s.available) && product.colors.some((c) => c.available);
  const currency = await getPageCurrency();
  const { price, currency: resolvedCurrency } = resolveProductPrice(product, currency);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => img.src),
    brand: { "@type": "Brand", name: product.brand },
    sku: product.id,
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: resolvedCurrency,
      price,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: categoryLabel, path: `/${product.category}` },
    { name: product.title, path: `/products/${product.slug}` },
  ]);

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumb} />
      <PDPClient product={product} related={related} />
    </>
  );
}
