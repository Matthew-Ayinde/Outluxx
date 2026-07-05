import Homepage from "@/components/homepage/Homepage";

export const metadata = { title: "Outlxx — Premium Fashion House" };

// FeaturedProducts fetches from MongoDB — render per-request instead of
// baking product data into static HTML at build time.
export const dynamic = "force-dynamic";

export default function Page() {
  return <Homepage />;
}
