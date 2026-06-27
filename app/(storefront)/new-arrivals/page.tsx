import PLPTemplate from "@/components/plp/PLPTemplate";
import { getNewArrivals } from "@/lib/data/server";

export const metadata = { title: "New Arrivals" };

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
