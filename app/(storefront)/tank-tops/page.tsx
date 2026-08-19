import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory, getSiteMedia } from "@/lib/data/server";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/config/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Tank Tops",
  description: "Shop premium tank tops at Outlxx — cotton, silk, and cashmere essentials for a considered wardrobe.",
  path: "/tank-tops",
});

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function TankTopsPage() {
  const [products, media] = await Promise.all([
    getProductsByCategory("tank-tops"),
    getSiteMedia(),
  ]);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Tank Tops", path: "/tank-tops" }])} />
      <PLPTemplate
        title="Tank Tops"
        subtitle="Outlxx Essentials"
        heroImage={media["plp-hero-tanktops"].url}
        products={products}
      />
    </>
  );
}
