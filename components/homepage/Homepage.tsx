import Link from "next/link";
import ImmersiveMediaCarousel from "@/components/homepage/ImmersiveMediaCarousel";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import EditorialStrip from "@/components/homepage/EditorialStrip";

const departments = [
  { label: "Women",      href: "/women",      sub: "Dresses, Coats & More" },
  { label: "Men",        href: "/men",         sub: "Suits, Knitwear & More" },
  { label: "Accessories",href: "/accessories", sub: "Bags, Shoes & More" },
  { label: "Sale",       href: "/sale",        sub: "Up to 30% off" },
];

const trustItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 6v4c0 4 3 7.7 7 9 4-1.3 7-5 7-9V6l-7-4z"
          stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Verified Luxury",
    sub: "Every piece authenticated",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 7h14l-1.5 9H4.5L3 7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M7 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    label: "Global Shipping",
    sub: "Free on orders over $250",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10h12M4 10l4-4M4 10l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Easy Returns",
    sub: "30-day free returns",
  },
];

export default function Homepage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute -left-16 top-12 h-56 w-56 rounded-full border border-red-500/20" />
        <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end lg:py-24">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-red-400">
              Outluxx • Premium Fashion House
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              A New Language
              <span className="ml-3 text-red-500">of Luxury</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Discover timeless tailoring, elevated essentials, and editorial pieces
              designed to command attention.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/new-arrivals"
                className="border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-red-500 hover:text-red-400 transition-colors"
              >
                Shop New Arrivals
              </Link>
              <Link
                href="/editorial"
                className="border border-red-600 bg-red-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-red-700 transition-colors"
              >
                View Campaign
              </Link>
            </div>
          </div>

          <div className="border border-white/15 bg-white/5 p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-red-400">Featured Capsule</p>
            <h2 className="mt-2 text-3xl font-semibold">Noir Atelier 26</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Precision tailoring, expressive textures, and sculpted monochrome statements
              for day-to-night dressing.
            </p>
            <div className="mt-4 text-[10px] uppercase tracking-[0.18em] text-white/50">
              Limited release · Worldwide shipping
            </div>
            <Link
              href="/editorial/the-art-of-layering"
              className="mt-5 inline-block text-[11px] font-medium uppercase tracking-[0.14em] text-red-400 hover:text-red-300 transition-colors"
            >
              Explore the collection →
            </Link>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <ImmersiveMediaCarousel />

      {/* Departments */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-black/10 pb-4">
          <h2 className="text-3xl font-semibold sm:text-4xl">Curated Departments</h2>
          <Link
            href="/designers"
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-red-600 hover:text-red-700 transition-colors"
          >
            Explore Designers
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((dept) => (
            <Link
              key={dept.label}
              href={dept.href}
              className="group border border-black/15 p-6 hover:border-red-600 transition-colors"
            >
              <p className="text-[10px] uppercase tracking-widest text-black/40">Outluxx</p>
              <p className="mt-8 text-2xl font-semibold">{dept.label}</p>
              <p className="mt-2 text-xs text-black/50">{dept.sub}</p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-black group-hover:text-red-600 transition-colors">
                View Collection →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <div className="border-t border-black/10">
        <FeaturedProducts />
      </div>

      {/* Editorial */}
      <EditorialStrip />

      {/* Trust strip */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="shrink-0 text-black">{item.icon}</div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">{item.label}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
