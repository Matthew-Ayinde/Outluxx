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
    <div className="border-b border-border py-5">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
          {title}
        </span>
        <svg
          width="11" height="11" viewBox="0 0 12 12" fill="none"
          className={["text-faint transition-transform duration-300", open ? "rotate-180" : ""].join(" ")}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function FilterCheckbox({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <span
        className={[
          "flex h-3.5 w-3.5 items-center justify-center border transition-colors duration-300",
          checked
            ? "border-foreground bg-foreground"
            : "border-hairline bg-transparent group-hover:border-foreground",
        ].join(" ")}
      >
        {checked && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4l2 2 3-4" stroke="var(--background)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm font-light text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>
    </label>
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
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
          Refine
        </p>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[10px] font-light text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <ul className="space-y-3">
          {subcategories.map((cat) => (
            <li key={cat}>
              <FilterCheckbox
                label={cat}
                checked={filters.subcategories.includes(cat)}
                onChange={() => toggle("subcategories", cat)}
              />
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Colour">
        <ul className="space-y-3">
          {colors.map((color) => (
            <li key={color}>
              <FilterCheckbox
                label={color}
                checked={filters.colors.includes(color)}
                onChange={() => toggle("colors", color)}
              />
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Brand">
        <ul className="space-y-3">
          {brands.map((brand) => (
            <li key={brand}>
              <FilterCheckbox
                label={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => toggle("brands", brand)}
              />
            </li>
          ))}
        </ul>
      </FilterSection>
    </aside>
  );
}
