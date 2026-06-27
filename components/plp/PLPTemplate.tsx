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
      <div className="relative h-[38vh] min-h-52 overflow-hidden bg-black">
        <Image
          src={`https://picsum.photos/seed/${heroSeed}/1600/600`}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          {subtitle && (
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/60">
              {subtitle}
            </p>
          )}
          <h1 className="font-heading text-5xl font-light sm:text-6xl lg:text-7xl">{title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* Toolbar */}
        <div className="mb-8 flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 border border-border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-foreground"
            >
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path d="M1 2h12M3 6h8M5 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Filter
            </button>
            <span className="text-xs text-muted">{filtered.length} pieces</span>
          </div>
          <SortDropdown value={sort} onChange={setSort} count={filtered.length} />
        </div>

        {/* Size filter strip */}
        {mobileFiltersOpen && allSizes.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-border pb-6">
            <p className="mr-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              Size
            </p>
            {allSizes.map((s) => (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={[
                  "border px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors",
                  sizeFilter.includes(s)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground",
                ].join(" ")}
              >
                {s}
              </button>
            ))}
            {sizeFilter.length > 0 && (
              <button
                onClick={() => setSizeFilter([])}
                className="ml-1 text-[10px] text-muted underline underline-offset-2 hover:opacity-100 transition-opacity opacity-70"
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
