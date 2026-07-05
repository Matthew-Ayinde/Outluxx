import PLPTemplate from "@/components/plp/PLPTemplate";
import { getSaleProducts } from "@/lib/data/server";

export const metadata = { title: "Sale" };

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function SalePage() {
  const products = await getSaleProducts();
  return (
    <PLPTemplate
      title="Sale"
      subtitle="Exceptional pieces. Exceptional prices."
      heroSeed="olx-hero-sale"
      products={products}
    />
  );
}
