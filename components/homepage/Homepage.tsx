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
  {
    n: "01",
    label: "Authenticated Luxury",
    sub: "Every piece verified by our atelier before it ships",
  },
  {
    n: "02",
    label: "Global Shipping",
    sub: "Complimentary on all orders over $250, worldwide",
  },
  {
    n: "03",
    label: "30-Day Returns",
    sub: "Free and unconditional, arranged from your door",
  },
];

export default function Homepage() {
  return (
    <div className="bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[calc(100svh-6.5rem)] min-h-[540px] overflow-hidden bg-black">
        <Image
          src="https://picsum.photos/seed/olx-hero-main/1600/900"
          alt="Outluxx — the current collection"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
          <p className="animate-fade-up-delay-1 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">
            Maison Outluxx
          </p>
          <h1 className="animate-fade-up-delay-2 mt-6 font-heading text-6xl font-light leading-[1.04] tracking-[-0.015em] sm:text-7xl lg:text-8xl xl:text-9xl">
            Refined.
            <br />
            Restrained.
            <br />
            <span className="italic">Resolute.</span>
          </h1>
          <p className="animate-fade-up-delay-3 mt-8 max-w-sm text-sm font-light leading-7 text-white/65 sm:max-w-md">
            Considered apparel built on exceptional material and precise
            construction. For wardrobes that outlast trends.
          </p>
          <div className="animate-fade-up-delay-4 mt-12 flex items-center gap-4">
            <Link
              href="/new-arrivals"
              className="bg-white px-9 py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-black transition-colors duration-300 hover:bg-white/85"
            >
              Shop New Arrivals
            </Link>
            <Link
              href="/about"
              className="border border-white/60 px-9 py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              The House
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <div className="h-12 w-px bg-white/30" />
          <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-white/40">
            Scroll
          </p>
        </div>
      </section>

      {/* ── Category Grid ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
        <div className="mb-14 flex items-end justify-between border-b border-border pb-8">
          <div>
            <p className="eyebrow mb-3">Collections</p>
            <h2 className="section-title text-4xl sm:text-5xl">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="nav-link hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.24em] text-muted transition-colors duration-300 hover:text-foreground sm:inline-block"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="group block">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
                <Image
                  src={`https://picsum.photos/seed/${cat.seed}/600/800`}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="img-zoom object-cover"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              </div>

              {/* Gallery caption */}
              <div className="mt-5">
                <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-faint">
                  {cat.sub}
                </p>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <p className="font-heading text-xl font-light text-foreground sm:text-2xl">
                    {cat.label}
                  </p>
                  <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-faint transition-colors duration-300 group-hover:text-foreground">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <FeaturedProducts />
      </div>

      {/* ── Editorial split ──────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface lg:aspect-auto">
            <Image
              src="https://picsum.photos/seed/olx-atelier/900/1100"
              alt="Inside the Outluxx atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-20 lg:px-20 lg:py-32">
            <p className="eyebrow">The Atelier</p>
            <h2 className="section-title mt-4 text-4xl sm:text-5xl">
              Material before <span className="italic">everything</span>
            </h2>
            <p className="mt-7 max-w-md text-sm font-light leading-7 text-muted">
              We begin with cloth — Supima cotton, traceable merino, linen from
              generational mills — and let it dictate the silhouette. Nothing is
              added that the garment does not need; nothing essential is
              engineered away.
            </p>
            <Link
              href="/about"
              className="mt-10 inline-block w-fit border border-foreground px-9 py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              Our Philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand Statement ──────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <BrandStatement />
      </div>

      {/* ── Trust Strip ──────────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
          {trustItems.map((item, i) => (
            <div
              key={item.label}
              className={[
                "flex flex-col gap-3 px-5 py-12 lg:px-10",
                i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : "",
              ].join(" ")}
            >
              <p className="font-heading text-2xl font-light italic text-faint">
                {item.n}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">
                {item.label}
              </p>
              <p className="text-sm font-light leading-6 text-muted">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
