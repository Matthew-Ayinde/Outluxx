"use client";

import { useState, useMemo } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSidebar, { type FilterState } from "@/components/plp/FilterSidebar";
import SortDropdown from "@/components/plp/SortDropdown";
import type { Product } from "@/types/commerce";

type PLPTemplateProps = {
  title: string;
  subtitle?: string;
  products: Product[];
  subcategories: string[];
  colors: string[];
  brands: string[];
};

export default function PLPTemplate({
  title, subtitle, products, subcategories, colors, brands,
}: PLPTemplateProps) {
  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState<FilterState>({
    subcategories: [], colors: [], brands: [], priceMin: 0, priceMax: 10000,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.subcategories.length)
      result = result.filter((p) => filters.subcategories.includes(p.subcategory));
    if (filters.colors.length)
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.label)));
    if (filters.brands.length)
      result = result.filter((p) => filters.brands.includes(p.brand));

    switch (sort) {
      case "price-asc":  result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest":     result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return result;
  }, [products, filters, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Page header */}
      <div className="mb-8 border-b border-black/10 pb-6">
        <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>}
      </div>

      {/* Mobile filter toggle */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 border border-black/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Filters
        </button>
        <SortDropdown value={sort} onChange={setSort} count={filtered.length} />
      </div>

      <div className="flex gap-10">
        {/* Sidebar — desktop always visible, mobile conditionally */}
        <div className={["hidden md:block", mobileFiltersOpen ? "!block" : ""].join(" ")}>
          <FilterSidebar
            subcategories={subcategories}
            colors={colors}
            brands={brands}
            filters={filters}
            onChange={setFilters}
          />
        </div>

        {/* Products */}
        <div className="flex-1 min-w-0">
          <div className="mb-6 hidden md:block">
            <SortDropdown value={sort} onChange={setSort} count={filtered.length} />
          </div>
          <ProductGrid products={filtered} columns={3} />
        </div>
      </div>
    </div>
  );
}
