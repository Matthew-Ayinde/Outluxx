import Link from "next/link";
import Image from "next/image";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import BrandStatement from "@/components/homepage/BrandStatement";

const categories = [
  {
    label: "T-Shirts",
    href: "/tshirts",
    seed: "olx-cat-ts",
    sub: "Supima · Pima · Modal",
  },
  {
    label: "Pants",
    href: "/pants",
    seed: "olx-cat-pt",
    sub: "Wool · Linen · Cashmere",
  },
  {
    label: "Armless",
    href: "/armless",
    seed: "olx-cat-ar",
    sub: "Silk · Knit · Linen",
  },
  {
    label: "Tank Tops",
    href: "/tank-tops",
    seed: "olx-cat-tt",
    sub: "Cotton · Silk · Cashmere",
  },
];

const trustItems = [
  { label: "Authenticated Luxury", sub: "Every piece verified" },
  { label: "Global Shipping",      sub: "Complimentary over $250" },
  { label: "30-Day Returns",       sub: "Free, no questions asked" },
];

export default function Homepage() {
  return (
    <div className="bg-background">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden bg-black">
        <Image
          src="https://picsum.photos/seed/olx-hero-main/1600/900"
          alt="Outluxx hero"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        {/* Subtle dark vignette at bottom only */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-black/50" style={{ maskImage: "linear-gradient(to bottom, transparent, black)" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
          <p className="animate-fade-up-delay-1 text-[10px] font-medium uppercase tracking-[0.35em] text-white/60">
            Outluxx · Premium Fashion House
          </p>
          <h1 className="animate-fade-up-delay-2 mt-4 font-heading text-6xl font-light leading-[1.05] tracking-[-0.01em] sm:text-7xl lg:text-8xl xl:text-9xl">
            Refined.
            <br />
            Restrained.
            <br />
            Resolute.
          </h1>
          <p className="animate-fade-up-delay-3 mt-8 max-w-sm text-sm font-light leading-7 text-white/60 sm:max-w-md">
            Considered apparel built on exceptional material and precise construction. For wardrobes that outlast trends.
          </p>
          <div className="animate-fade-up-delay-4 mt-10 flex items-center gap-6">
            <Link
              href="/new-arrivals"
              className="border border-white px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              Shop New Arrivals
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-10 w-px bg-white/30" />
          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/40">Scroll</p>
        </div>
      </section>

      {/* ── Category Grid ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
          <div>
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
              Collections
            </p>
            <h2 className="font-heading text-4xl font-light sm:text-5xl">
              Shop by Category
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative overflow-hidden bg-surface"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${cat.seed}/600/800`}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/30" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/60">
                  {cat.sub}
                </p>
                <p className="mt-1 font-heading text-xl font-light sm:text-2xl">
                  {cat.label}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/50 transition-opacity duration-300 group-hover:text-white/80">
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <FeaturedProducts />
      </div>

      {/* ── Brand Statement ────────────────────────────────────────────────── */}
      <BrandStatement />

      {/* ── Trust Strip ───────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-1 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
