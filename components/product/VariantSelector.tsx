"use client";

import Image from "next/image";
import type { ProductVariant, ProductColor } from "@/types/commerce";

type VariantSelectorProps = {
  label: string;
  options: ProductVariant[] | ProductColor[];
  selected: string;
  onChange: (value: string) => void;
  variant?: "size" | "color";
  extra?: React.ReactNode;
};

export default function VariantSelector({
  label, options, selected, onChange, variant = "size", extra,
}: VariantSelectorProps) {
  return (
    <fieldset>
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-3">
          <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
            {label}
          </legend>
          {extra}
        </div>
        {selected && (
          <span className="text-xs text-muted">{selected}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const swatch = variant === "color" ? (opt as ProductColor).images?.[0] : undefined;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={!opt.available}
              onClick={() => opt.available && onChange(opt.value)}
              title={!opt.available ? "Out of stock" : undefined}
              className={[
                "flex min-w-10 items-center gap-2 border px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors",
                selected === opt.value
                  ? "border-foreground bg-foreground text-background"
                  : opt.available
                    ? "border-border text-foreground hover:border-foreground"
                    : "border-border text-muted opacity-50 cursor-not-allowed line-through",
              ].join(" ")}
            >
              {swatch && (
                <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-black/10">
                  <Image src={swatch.src} alt={swatch.alt} fill className="object-cover" sizes="20px" />
                </span>
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
