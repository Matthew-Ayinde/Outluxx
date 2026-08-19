import PLPTemplate from "@/components/plp/PLPTemplate";
import { getSaleProducts, getSiteMedia } from "@/lib/data/server";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/config/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Sale",
  description: "Shop discounted luxury fashion at Outlxx — exceptional pieces at exceptional prices, while stocks last.",
  path: "/sale",
});

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function SalePage() {
  const [products, media] = await Promise.all([getSaleProducts(), getSiteMedia()]);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Sale", path: "/sale" }])} />
      <PLPTemplate
        title="Sale"
        subtitle="Exceptional pieces. Exceptional prices."
        heroImage={media["plp-hero-sale"].url}
        products={products}
      />
    </>
  );
}
