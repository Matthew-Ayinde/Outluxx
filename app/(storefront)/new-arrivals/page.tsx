import PLPTemplate from "@/components/plp/PLPTemplate";
import { getNewArrivals } from "@/lib/data";

export const metadata = { title: "New Arrivals" };

export default function NewArrivalsPage() {
  const products = getNewArrivals();
  const subcats = [...new Set(products.map((p) => p.subcategory))];
  const colors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.label)))];
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <PLPTemplate
      title="New Arrivals"
      subtitle="The latest from our most considered houses."
      products={products}
      subcategories={subcats}
      colors={colors}
      brands={brands}
    />
  );
}
