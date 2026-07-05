import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data/server";

export const metadata = { title: "Pants" };

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function PantsPage() {
  const products = await getProductsByCategory("pants");
  return (
    <PLPTemplate
      title="Pants"
      subtitle="Outlxx Essentials"
      heroSeed="olx-hero-pants"
      products={products}
    />
  );
}
