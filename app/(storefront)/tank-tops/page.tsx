import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data/server";
import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "Tank Tops",
  description: "Shop premium tank tops at Outlxx — cotton, silk, and cashmere essentials for a considered wardrobe.",
  path: "/tank-tops",
});

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function TankTopsPage() {
  const products = await getProductsByCategory("tank-tops");
  return (
    <PLPTemplate
      title="Tank Tops"
      subtitle="Outlxx Essentials"
      heroSeed="olx-hero-tanktops"
      products={products}
    />
  );
}
