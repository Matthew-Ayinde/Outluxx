import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data/server";

export const metadata = { title: "Pants" };

export default async function PantsPage() {
  const products = await getProductsByCategory("pants");
  return (
    <PLPTemplate
      title="Pants"
      subtitle="Outluxx Essentials"
      heroSeed="olx-hero-pants"
      products={products}
    />
  );
}
