import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data";

export const metadata = { title: "Men" };

export default function MenPage() {
  const products = getProductsByCategory("men");
  const subcats = [...new Set(products.map((p) => p.subcategory))];
  const colors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.label)))];
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <PLPTemplate
      title="Men"
      subtitle="Sharp tailoring. Considered craft."
      products={products}
      subcategories={subcats}
      colors={colors}
      brands={brands}
    />
  );
}
