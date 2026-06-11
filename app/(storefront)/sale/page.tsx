import PLPTemplate from "@/components/plp/PLPTemplate";
import { getSaleProducts } from "@/lib/data";

export const metadata = { title: "Sale" };

export default function SalePage() {
  const products = getSaleProducts();
  const subcats = [...new Set(products.map((p) => p.subcategory))];
  const colors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.label)))];
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <PLPTemplate
      title="Sale"
      subtitle="Exceptional pieces at exceptional prices."
      products={products}
      subcategories={subcats}
      colors={colors}
      brands={brands}
    />
  );
}
