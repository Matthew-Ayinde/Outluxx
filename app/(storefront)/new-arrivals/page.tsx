import PLPTemplate from "@/components/plp/PLPTemplate";
import { getNewArrivals } from "@/lib/data/server";
import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "New Arrivals",
  description: "Discover the latest arrivals at Outlxx — new-season tailoring, essentials, and editorial pieces.",
  path: "/new-arrivals",
});

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
