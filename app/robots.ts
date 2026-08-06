import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /search is intentionally NOT disallowed here — a robots.txt block would stop
      // Google from crawling it at all, which means it'd never see the page's own
      // noindex meta tag and could still index the URL from external links. Letting
      // it crawl but tagging the page noindex (see search/page.tsx) is the correct way
      // to keep it out of results.
      disallow: ["/admin", "/account", "/checkout", "/api", "/cart", "/wishlist"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
