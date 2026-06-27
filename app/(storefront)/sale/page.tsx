import PLPTemplate from "@/components/plp/PLPTemplate";
import { getSaleProducts } from "@/lib/data/server";

export const metadata = { title: "Sale" };

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
