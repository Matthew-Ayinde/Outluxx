import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data/server";

export const metadata = { title: "Armless" };

export default async function ArmlessPage() {
  const products = await getProductsByCategory("armless");
  return (
    <PLPTemplate
      title="Armless"
      subtitle="Outluxx Essentials"
      heroSeed="olx-hero-armless"
      products={products}
    />
  );
}
