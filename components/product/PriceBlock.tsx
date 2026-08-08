"use client";

import { formatMoney } from "@/lib/utils/format";
import { useCurrency } from "@/lib/store/CurrencyContext";
import { resolveProductPrice, type PriceFields } from "@/lib/utils/price";

type PriceBlockProps = PriceFields & {
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };

export default function PriceBlock({ size = "md", ...product }: PriceBlockProps) {
  const currency = useCurrency();
  const { price, compareAtPrice, currency: displayCurrency } = resolveProductPrice(product, currency);

  return (
    <div className="flex items-baseline gap-3">
      <span className={[sizes[size], "font-medium text-foreground"].join(" ")}>
        {formatMoney(price, displayCurrency)}
      </span>
      {compareAtPrice && (
        <span className={[sizes[size], "text-muted line-through"].join(" ")}>
          {formatMoney(compareAtPrice, displayCurrency)}
        </span>
      )}
      {compareAtPrice && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
          {Math.round((1 - price / compareAtPrice) * 100)}% off
        </span>
      )}
    </div>
  );
}
