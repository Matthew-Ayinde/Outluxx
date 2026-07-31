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
  label, options, selected, onChange,
}: VariantSelectorProps) {
  return (
    <fieldset>
      <div className="mb-3 flex items-baseline justify-between">
        <legend className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
          {label}
        </legend>
        {selected && (
          <span className="text-xs font-light text-muted">{selected}</span>
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
              "min-w-11 border px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
              selected === opt.value
                ? "border-foreground bg-foreground text-background"
                : opt.available
                  ? "border-hairline text-foreground hover:border-foreground"
                  : "cursor-not-allowed border-border text-faint line-through",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
