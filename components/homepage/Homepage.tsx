import Link from "next/link";
import ImmersiveMediaCarousel from "@/components/homepage/ImmersiveMediaCarousel";

export default function Homepage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-black/10 bg-black text-white">
        <div className="absolute -left-16 top-12 h-56 w-56 rounded-full border border-red-500/40" />
        <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full border border-white/20" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end lg:py-24">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.24em] text-red-400">
              OUTLUXX • PREMIUM FASHION HOUSE
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              A New Language
              <span className="ml-3 text-red-500">of Luxury</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Discover timeless tailoring, elevated essentials, and editorial pieces designed to command attention.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/new-arrivals"
                className="border border-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] hover:border-red-500 hover:text-red-400"
              >
                Shop New Arrivals
              </Link>
              <Link
                href="/editorial"
                className="border border-red-500 bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-black"
              >
                View Campaign
              </Link>
            </div>
          </div>

          <div className="space-y-4 border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-red-400">Featured Capsule</p>
            <h2 className="text-3xl font-semibold">Noir Atelier 26</h2>
            <p className="text-sm leading-7 text-white/75">
              Precision tailoring, expressive textures, and sculpted monochrome statements for day-to-night dressing.
            </p>
            <div className="pt-2 text-xs uppercase tracking-[0.16em] text-white/60">
              Limited release • Worldwide shipping
            </div>
          </div>
        </div>
      </section>

      <ImmersiveMediaCarousel />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-black/10 pb-4">
          <h2 className="text-3xl font-semibold text-black sm:text-4xl">Curated Departments</h2>
          <Link href="/designers" className="text-sm font-medium uppercase tracking-[0.12em] text-red-600">
            Explore Designers
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Women", href: "/women" },
            { label: "Men", href: "/men" },
            { label: "Accessories", href: "/accessories" },
            { label: "Sale", href: "/sale" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group border border-black/15 p-6 hover:border-red-600"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-black/50">Outluxx</p>
              <p className="mt-8 text-2xl font-semibold text-black">{item.label}</p>
              <p className="mt-3 text-sm text-black/60 group-hover:text-red-600">View Collection</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-7 text-center text-xs font-medium uppercase tracking-[0.18em] text-black/70 sm:grid-cols-3">
          <p>Fast Global Shipping</p>
          <p>Easy 30-day Returns</p>
          <p>Verified Luxury Authenticity</p>
        </div>
      </section>
    </div>
  );
}