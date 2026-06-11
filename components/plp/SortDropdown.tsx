"use client";

type SortOption = { label: string; value: string };

const sortOptions: SortOption[] = [
  { label: "Featured",       value: "featured" },
  { label: "Newest",         value: "newest" },
  { label: "Price: Low–High",value: "price-asc" },
  { label: "Price: High–Low",value: "price-desc" },
];

type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  count: number;
};

export default function SortDropdown({ value, onChange, count }: SortDropdownProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs text-zinc-500">{count} items</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none border border-black/15 bg-white py-2 pl-4 pr-8 text-xs font-medium text-black focus:border-black focus:outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
          width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
