"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import SortDropdown from "@/components/plp/SortDropdown";
import type { Product } from "@/types/commerce";

type PLPTemplateProps = {
  title: string;
  subtitle?: string;
  heroSeed: string;
  products: Product[];
};

export default function PLPTemplate({ title, subtitle, heroSeed, products }: PLPTemplateProps) {
  const [sort, setSort] = useState("featured");
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allSizes = useMemo(
    () => [...new Set(products.flatMap((p) => p.sizes.map((s) => s.label)))],
    [products]
  );

  const filtered = useMemo(() => {
    let result = [...products];
    if (sizeFilter.length)
      result = result.filter((p) => p.sizes.some((s) => sizeFilter.includes(s.label) && s.available));
    switch (sort) {
      case "price-asc":  result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest":     result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return result;
  }, [products, sizeFilter, sort]);

  function toggleSize(s: string) {
    setSizeFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="relative h-[42vh] min-h-60 overflow-hidden bg-black">
        <Image
          src={`https://picsum.photos/seed/${heroSeed}/1600/600`}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          {subtitle && (
            <p className="animate-fade-up mb-4 text-[10px] font-medium uppercase tracking-[0.36em] text-white/60">
              {subtitle}
            </p>
          )}
          <h1 className="animate-fade-up-delay-1 font-heading text-5xl font-light tracking-[-0.01em] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {/* Toolbar */}
        <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2.5 border border-hairline px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:border-foreground"
            >
              <svg width="13" height="11" viewBox="0 0 14 12" fill="none">
                <path d="M1 2h12M3 6h8M5 10h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              Refine
            </button>
            <span className="text-xs font-light text-muted">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </span>
          </div>
          <SortDropdown value={sort} onChange={setSort} count={filtered.length} />
        </div>

        {/* Size filter strip */}
        {mobileFiltersOpen && allSizes.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border pb-8">
            <p className="mr-3 text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
              Size
            </p>
            {allSizes.map((s) => (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={[
                  "border px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                  sizeFilter.includes(s)
                    ? "border-foreground bg-foreground text-background"
                    : "border-hairline text-foreground hover:border-foreground",
                ].join(" ")}
              >
                {s}
              </button>
            ))}
            {sizeFilter.length > 0 && (
              <button
                onClick={() => setSizeFilter([])}
                className="ml-2 text-[10px] font-light text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        )}

        <ProductGrid products={filtered} columns={4} />
      </div>
    </div>
  );
}
