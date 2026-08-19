import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory, getSiteMedia } from "@/lib/data/server";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/config/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "T-Shirts",
  description:
    "Shop premium T-shirts at Outlxx — Supima, Pima, and Modal cotton essentials cut for a considered wardrobe.",
  path: "/tshirts",
});

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function TshirtsPage() {
  const [products, media] = await Promise.all([
    getProductsByCategory("tshirts"),
    getSiteMedia(),
  ]);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "T-Shirts", path: "/tshirts" }])} />
      <PLPTemplate
        title="T-Shirts"
        subtitle="Outlxx Essentials"
        heroImage={media["plp-hero-tshirts"].url}
        products={products}
      />
    </>
  );
}
