import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data";

export const metadata = { title: "Accessories" };

export default function AccessoriesPage() {
  const products = getProductsByCategory("accessories");
  const subcats = [...new Set(products.map((p) => p.subcategory))];
  const colors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.label)))];
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <PLPTemplate
      title="Accessories"
      subtitle="The details that define the whole."
      products={products}
      subcategories={subcats}
      colors={colors}
      brands={brands}
    />
  );
}
