import PLPTemplate from "@/components/plp/PLPTemplate";
import { getProductsByCategory } from "@/lib/data";

export const metadata = { title: "Women" };

export default function WomenPage() {
  const products = getProductsByCategory("women");
  const subcats = [...new Set(products.map((p) => p.subcategory))];
  const colors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.label)))];
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <PLPTemplate
      title="Women"
      subtitle="Timeless pieces, precisely crafted."
      products={products}
      subcategories={subcats}
      colors={colors}
      brands={brands}
    />
  );
}
