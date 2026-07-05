import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data/server";

export const metadata = { title: "T-Shirts" };

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function TshirtsPage() {
  const products = await getProductsByCategory("tshirts");
  return (
    <PLPTemplate
      title="T-Shirts"
      subtitle="Outlxx Essentials"
      heroSeed="olx-hero-tshirts"
      products={products}
    />
  );
}
