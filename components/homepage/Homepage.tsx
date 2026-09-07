import Link from "next/link";
import Image from "next/image";
import HeroSlideshow from "@/components/homepage/HeroSlideshow";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import BrandStatement from "@/components/homepage/BrandStatement";
import { getSiteMedia } from "@/lib/data/server";
import { PRODUCT_CATEGORIES } from "@/lib/config/categories";

// Desktop column count, chosen so the category grid never ends on a dangling
// card. Spelled out as literal classes because Tailwind scans source text and
// cannot see a class name built at runtime.
const LG_GRID_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-4",
  8: "lg:grid-cols-4",
  9: "lg:grid-cols-3",
};
const lgGridCols = LG_GRID_COLS[PRODUCT_CATEGORIES.length] ?? "lg:grid-cols-4";

const trustItems = [
  { label: "Authenticated Luxury", sub: "Every piece verified" },
  { label: "10-Day Returns",       sub: "Free, no questions asked" },
];

const HERO_SLOTS = ["hero-slide-1", "hero-slide-2", "hero-slide-3", "hero-slide-4"];

export default async function Homepage() {
  const media = await getSiteMedia();
  const heroMedia = HERO_SLOTS.map((slot) => {
    const m = media[slot];
    return m.type === "video"
      ? { type: "video" as const, src: m.url }
      : { type: "image" as const, src: m.url, alt: "" };
  });

  return (
    <div className="bg-background">
      {/* -- Hero ------------------------------------------------------------ */}
      <HeroSlideshow media={heroMedia} />

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

        <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4 ${lgGridCols}`}>
          {PRODUCT_CATEGORIES.map((cat, i) => {
            // With an odd number of categories the final card would sit alone in
            // the 2-up mobile grid — let it run full width instead.
            const orphaned = i === PRODUCT_CATEGORIES.length - 1 && PRODUCT_CATEGORIES.length % 2 === 1;
            return (
              <Link
                key={cat.path}
                href={cat.path}
                className={[
                  "group relative overflow-hidden bg-surface",
                  orphaned ? "col-span-2 sm:col-span-1" : "",
                ].join(" ")}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={[
                    "relative w-full overflow-hidden",
                    orphaned ? "aspect-[3/2] sm:aspect-[3/4]" : "aspect-[3/4]",
                  ].join(" ")}
                >
                  <Image
                    src={media[cat.gridSlot].url}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/30" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
                  <p className="mt-1 font-heading text-xl font-light sm:text-2xl">
                    {cat.label}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/50 transition-opacity duration-300 group-hover:text-white/80">
                    Explore →
                  </p>
                </div>
              </Link>
            );
          })}
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
          <div className="grid gap-6 sm:grid-cols-2">
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
