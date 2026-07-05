import Link from "next/link";
import Image from "next/image";
import HeroSlideshow from "@/components/homepage/HeroSlideshow";
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
      {/* -- Hero ------------------------------------------------------------ */}
      <HeroSlideshow />

      {/* -- Category Grid --------------------------------------------------─ */}
      <section id="collections" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
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

      {/* -- Featured Products ------------------------------------------------ */}
      <div className="border-t border-border">
        <FeaturedProducts />
      </div>

      {/* -- Brand Statement -------------------------------------------------- */}
      <BrandStatement />

      {/* -- Trust Strip ----------------------------------------------------─ */}
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
