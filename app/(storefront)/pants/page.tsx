import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory, getSiteMedia } from "@/lib/data/server";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/config/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Pants",
  description: "Shop premium tailored and casual pants at Outlxx — wool, linen, and cashmere silhouettes.",
  path: "/pants",
});

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function PantsPage() {
  const [products, media] = await Promise.all([
    getProductsByCategory("pants"),
    getSiteMedia(),
  ]);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pants", path: "/pants" }])} />
      <PLPTemplate
        title="Pants"
        subtitle="Outlxx Essentials"
        heroImage={media["plp-hero-pants"].url}
        products={products}
      />
    </>
  );
}
