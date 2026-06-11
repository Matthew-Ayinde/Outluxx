import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Providers } from "@/lib/store/Providers";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Outluxx",
    default: "Outluxx — Premium Fashion House",
  },
  description:
    "Curated luxury fashion for the modern wardrobe. Discover timeless tailoring, elevated essentials, and editorial pieces.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="min-h-full bg-white text-black antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
