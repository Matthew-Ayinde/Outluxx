import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data/server";

export const metadata = { title: "Armless" };

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function ArmlessPage() {
  const products = await getProductsByCategory("armless");
  return (
    <PLPTemplate
      title="Armless"
      subtitle="Outlxx Essentials"
      heroSeed="olx-hero-armless"
      products={products}
    />
  );
}
