import PLPTemplate from "@/components/plp/PLPTemplate";
import { getNewArrivals } from "@/lib/data/server";

export const metadata = { title: "New Arrivals" };

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();
  return (
    <PLPTemplate
      title="New Arrivals"
      subtitle="The latest from the edit."
      heroSeed="olx-hero-newarrivals"
      products={products}
    />
  );
}
