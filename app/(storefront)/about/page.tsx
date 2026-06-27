import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About Outluxx" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Our Story</p>
        <h1 className="font-heading text-5xl font-semibold leading-tight">
          Luxury, without compromise.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-zinc-600">
          Outluxx was founded on a single conviction: that exceptional fashion should be accessible to those who know what they are looking for. We are not a marketplace. We are a considered edit — a small portfolio of the world's most rigorous fashion houses, brought together under one roof.
        </p>
      </div>

      {/* Image */}
      <div className="relative mb-14 h-[400px] overflow-hidden bg-zinc-50">
        <Image
          src="https://picsum.photos/seed/olx-about1/1200/400"
          alt="Outluxx atelier"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Three-column values */}
      <div className="mb-14 grid gap-8 sm:grid-cols-3">
        {[
          {
            title: "Curation over Volume",
            body: "We carry fewer than 200 products at any time. Every piece is chosen because it is genuinely exceptional — not because it sells.",
          },
          {
            title: "Craft Over Marketing",
            body: "The houses we work with spend their budgets on materials and craftspeople, not celebrity endorsements. We think this shows.",
          },
          {
            title: "Investment Over Impulse",
            body: "Everything in our portfolio is designed to be worn for a decade, not a season. We believe this is the only defensible way to buy fashion.",
          },
        ].map((v) => (
          <div key={v.title}>
            <h3 className="mb-3 text-sm font-semibold">{v.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-600">{v.body}</p>
          </div>
        ))}
      </div>

      {/* Team quote */}
      <div className="mb-14 border-l-4 border-black pl-8">
        <blockquote className="font-heading text-2xl font-medium leading-relaxed text-zinc-700">
          "We built Outluxx because we were tired of choosing between accessibility and quality. The two should not be in opposition."
        </blockquote>
        <cite className="mt-4 block text-sm text-zinc-500">— Founders, Outluxx</cite>
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
