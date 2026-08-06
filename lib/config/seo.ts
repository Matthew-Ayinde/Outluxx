import type { Metadata } from "next";

export const SITE_NAME = "Outlxx";
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://outlxx.co.uk").replace(/\/$/, "");
export const DEFAULT_TITLE = "Outlxx — Premium Fashion House";
export const DEFAULT_DESCRIPTION =
  "Curated luxury fashion for the modern wardrobe. Shop timeless tailoring, elevated essentials, and editorial pieces at Outlxx, with UK delivery and 10-day returns.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export const defaultSeo = {
  titleTemplate: "%s | Outlxx",
  description: DEFAULT_DESCRIPTION,
};

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/tshirts" or "/products/some-slug" */
  path: string;
  /** Absolute image URL — defaults to the site-wide OG banner */
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
};

/**
 * Shared metadata builder — keeps title/description/canonical/OG/Twitter
 * consistent across every route instead of hand-rolling each field per page.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noindex = false,
  keywords,
  type = "website",
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noindex && {
      robots: { index: false, follow: false },
    }),
  };
}

/** Robots directive for private/personalized routes (account, checkout, admin, cart). */
export const NOINDEX: Metadata = {
  robots: { index: false, follow: false },
};
