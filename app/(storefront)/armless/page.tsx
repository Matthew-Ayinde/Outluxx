import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory, getSiteMedia } from "@/lib/data/server";
import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "Armless",
  description: "Shop armless and sleeveless pieces at Outlxx — silk, knit, and linen tops for a refined wardrobe.",
  path: "/armless",
});

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function ArmlessPage() {
  const [products, media] = await Promise.all([
    getProductsByCategory("armless"),
    getSiteMedia(),
  ]);
  return (
    <PLPTemplate
      title="Armless"
      subtitle="Outlxx Essentials"
      heroImage={media["plp-hero-armless"].url}
      products={products}
    />
  );
}
