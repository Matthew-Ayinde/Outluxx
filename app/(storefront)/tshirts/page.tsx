import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data/server";

export const metadata = { title: "T-Shirts" };

export default async function TshirtsPage() {
  const products = await getProductsByCategory("tshirts");
  return (
    <PLPTemplate
      title="T-Shirts"
      subtitle="Outluxx Essentials"
      heroSeed="olx-hero-tshirts"
      products={products}
    />
  );
}
