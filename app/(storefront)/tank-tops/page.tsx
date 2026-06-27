import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data/server";

export const metadata = { title: "Tank Tops" };

export default async function TankTopsPage() {
  const products = await getProductsByCategory("tank-tops");
  return (
    <PLPTemplate
      title="Tank Tops"
      subtitle="Outluxx Essentials"
      heroSeed="olx-hero-tanktops"
      products={products}
    />
  );
}
