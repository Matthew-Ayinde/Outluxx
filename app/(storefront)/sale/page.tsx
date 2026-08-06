import PLPTemplate from "@/components/plp/PLPTemplate";
import { getSaleProducts } from "@/lib/data/server";
import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "Sale",
  description: "Shop discounted luxury fashion at Outlxx — exceptional pieces at exceptional prices, while stocks last.",
  path: "/sale",
});

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

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
