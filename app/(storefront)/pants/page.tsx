import CategoryPLP, { categoryMetadata } from "@/components/plp/CategoryPLP";

export const metadata = categoryMetadata("pants");

// Product data lives in MongoDB and changes via the admin panel — render per-request
// instead of baking it into static HTML at build time.
export const dynamic = "force-dynamic";

export default function Page() {
  return <CategoryPLP category="pants" />;
}
