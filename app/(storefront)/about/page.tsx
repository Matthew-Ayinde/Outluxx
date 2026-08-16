import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "About OUT.LXX",
  description: "OUT.LXX is a UK streetwear brand built for people who move different — premium quality, bold design and real street culture.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">About OUT.LXX</p>
        <h1 className="font-heading text-5xl font-semibold leading-tight">
          Built for People Who Move Different
        </h1>
        <p className="mt-5 text-base leading-relaxed text-zinc-600">
          OUT.LXX is a UK streetwear brand that blends street culture, premium quality and bold design to create pieces that feel authentic, effortless and confident. No unnecessary noise. Just clean fits, strong identity and clothing made to be worn your way.
        </p>
      </div>

      {/* Image */}
      <div className="relative mb-14 h-[400px] overflow-hidden bg-zinc-50">
        <Image
          src="/black-logo.png"
          alt="OUT.LXX"
          fill
          className=""
          sizes=""
        />
      </div>

      {/* Story */}
      <div className="mb-14 max-w-3xl space-y-6 text-base leading-relaxed text-zinc-600">
        <p>
          OUT.LXX is built on the belief that streetwear is more than just clothing; it is a form of identity, confidence and self-expression. Our mission is to create premium streetwear that reflects individuality and real street culture while maintaining high standards of quality, design and comfort. Every piece is created to give people the freedom to express themselves confidently and authentically.
        </p>
        <p>
          Our vision is to grow OUT.LXX into a globally recognised streetwear brand with a strong identity and lasting cultural impact. We aim to become known for our distinctive designs, premium quality and ability to connect with a new generation that values originality and self-expression.
        </p>
        <p>
          Our focus is simple: quality, identity, culture, community and growth. We are committed to continuously improving our products, developing unique designs and building a community around the OUT.LXX lifestyle. As we grow, we want OUT.LXX to represent more than fashion &mdash; we want it to represent a mindset: move different, stay original and never compromise who you are.
        </p>
      </div>

      {/* Closing note */}
      <div className="mb-14 border-l-4 border-black pl-8">
        <p className="font-heading text-2xl font-medium leading-relaxed text-zinc-700">
          OUT.LXX &mdash; Do urban, set your trend.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/new-arrivals"
          className="inline-block border border-black px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Shop New Goodies
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
