import type { Metadata } from "next";
import Homepage from "@/components/homepage/Homepage";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/config/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Outlxx — Premium Fashion House",
    description:
      "Curated luxury fashion for the modern wardrobe. Shop timeless tailoring, elevated essentials, and editorial pieces at Outlxx, with UK delivery and 10-day returns.",
    path: "/",
  }),
  // Bypass the "%s | Outlxx" title template — the homepage title already is the site name.
  title: { absolute: "Outlxx — Premium Fashion House" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// FeaturedProducts fetches from MongoDB — render per-request instead of
// baking product data into static HTML at build time.
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Homepage />
    </>
  );
}
