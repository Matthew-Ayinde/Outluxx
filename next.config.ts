import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Tank Tops was merged into Armless — keep old links, bookmarks and indexed
  // URLs alive by pointing them at the merged listing.
  async redirects() {
    return [{ source: "/tank-tops", destination: "/armless", permanent: true }];
  },
};

export default nextConfig;
