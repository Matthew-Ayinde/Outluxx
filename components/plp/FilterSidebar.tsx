"use client";

import { useState } from "react";

export type FilterState = {
  subcategories: string[];
  colors: string[];
  brands: string[];
  priceMin: number;
  priceMax: number;
};

type FilterSidebarProps = {
  subcategories: string[];
  colors: string[];
  brands: string[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
};

function FilterSection({
  title, children, defaultOpen = true,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/10 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">{title}</span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={["transition-transform text-zinc-400", open ? "rotate-180" : ""].join(" ")}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  subcategories, colors, brands, filters, onChange,
}: FilterSidebarProps) {
  const toggle = (key: "subcategories" | "colors" | "brands", value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const clearAll = () =>
    onChange({ subcategories: [], colors: [], brands: [], priceMin: 0, priceMax: 10000 });

  const activeCount =
    filters.subcategories.length + filters.colors.length + filters.brands.length;

  return (
    <aside className="w-56 shrink-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">Filter</p>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[10px] font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <ul className="space-y-2">
          {subcategories.map((cat) => (
            <li key={cat}>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={filters.subcategories.includes(cat)}
                  onChange={() => toggle("subcategories", cat)}
                  className="h-3.5 w-3.5 accent-black"
                />
                <span className="text-sm text-black">{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Colour">
        <ul className="space-y-2">
          {colors.map((color) => (
            <li key={color}>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => toggle("colors", color)}
                  className="h-3.5 w-3.5 accent-black"
                />
                <span className="text-sm text-black">{color}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Brand">
        <ul className="space-y-2">
          {brands.map((brand) => (
            <li key={brand}>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggle("brands", brand)}
                  className="h-3.5 w-3.5 accent-black"
                />
                <span className="text-sm text-black">{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>
    </aside>
  );
}
