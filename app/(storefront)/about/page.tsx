import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "About Outlxx",
  description: "The story behind Outlxx — a premium fashion house dedicated to timeless tailoring and considered design.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">About Outlxx</p>
        <h1 className="font-heading text-5xl font-semibold leading-tight">
          Redefining Contemporary Fashion
        </h1>
        <p className="mt-5 text-base leading-relaxed text-zinc-600">
          At Outlxx, we believe style is more than what you wear&mdash;it&apos;s an expression of confidence, ambition, and individuality.
        </p>
      </div>

      {/* Image */}
      <div className="relative mb-14 h-[400px] overflow-hidden bg-zinc-50">
        <Image
          src="https://picsum.photos/seed/olx-about1/1200/400"
          alt="Outlxx atelier"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Story */}
      <div className="mb-14 max-w-3xl space-y-6 text-base leading-relaxed text-zinc-600">
        <p>
          Founded with a vision to bridge contemporary streetwear and premium craftsmanship, Outlxx delivers carefully curated pieces designed for those who appreciate quality, timeless design, and effortless style. Every collection reflects our commitment to creating garments that elevate everyday wear while maintaining comfort and durability.
        </p>
        <p>
          With operations based in both the United Kingdom and Nigeria, we proudly serve customers across both regions, combining global standards with exceptional customer service.
        </p>
        <p>
          Our focus extends beyond clothing. We&apos;re dedicated to building a community that values authenticity, confidence, and self-expression. Every order is handled with care, from secure checkout to doorstep delivery, ensuring your shopping experience is seamless from start to finish.
        </p>
        <p>
          Whether you&apos;re refreshing your wardrobe or making a statement, Outlxx is here to help you wear confidence every day.
        </p>
      </div>

      {/* Closing note */}
      <div className="mb-14 border-l-4 border-black pl-8">
        <p className="font-heading text-2xl font-medium leading-relaxed text-zinc-700">
          Thank you for choosing Outlxx.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/new-arrivals"
          className="inline-block border border-black px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Shop New Arrivals
        </Link>
        <Link
          href="/tshirts"
          className="inline-block border border-black/20 px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors"
        >
          Explore T-Shirts
        </Link>
      </div>
    </div>
  );
}
