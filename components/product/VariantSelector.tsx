"use client";

import type { ProductVariant } from "@/types/commerce";

type VariantSelectorProps = {
  label: string;
  options: ProductVariant[];
  selected: string;
  onChange: (value: string) => void;
  variant?: "size" | "color";
};

export default function VariantSelector({
  label, options, selected, onChange, variant = "size",
}: VariantSelectorProps) {
  return (
    <fieldset>
      <div className="flex items-baseline justify-between mb-3">
        <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black">
          {label}
        </legend>
        {selected && (
          <span className="text-xs text-zinc-500">{selected}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={!opt.available}
            onClick={() => opt.available && onChange(opt.value)}
            title={!opt.available ? "Out of stock" : undefined}
            className={[
              "min-w-10 border px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors",
              selected === opt.value
                ? "border-black bg-black text-white"
                : opt.available
                  ? "border-black/20 text-black hover:border-black"
                  : "border-black/10 text-black/30 cursor-not-allowed line-through",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
