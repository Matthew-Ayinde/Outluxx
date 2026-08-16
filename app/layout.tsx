import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Providers } from "@/lib/store/Providers";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/config/seo";
import { getStoreSettings } from "@/lib/data/settings";
import type { Currency } from "@/lib/store/CurrencyContext";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { storeName, metaTitle, metaDescription } = await getStoreSettings();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${storeName}`,
      default: metaTitle,
    },
    description: metaDescription,
    applicationName: storeName,
    keywords: [
      storeName,
      "luxury fashion",
      "premium clothing",
      "designer apparel UK",
      "menswear",
      "womenswear",
      "tailoring",
      "editorial fashion",
    ],
    category: "shopping",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: { canonical: "/" },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: "/",
      siteName: storeName,
      type: "website",
      locale: "en_GB",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: storeName }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    manifest: "/site.webmanifest",
    // icon.png / apple-icon.png / favicon.ico are picked up automatically via
    // Next's file-based icon convention (app/icon.png etc.) — no need to
    // declare them here too, and doing so risks conflicting <link> tags.
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getStoreSettings();
  const currency: Currency = (await headers()).get("x-currency") === "NGN" ? "NGN" : "GBP";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.storeName,
    url: SITE_URL,
    logo: `${SITE_URL}/black-logo.png`,
  };

  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Prevent dark mode flash — runs before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('outlxx-theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Providers initialSettings={settings} initialCurrency={currency}>{children}</Providers>
      </body>
    </html>
  );
}
