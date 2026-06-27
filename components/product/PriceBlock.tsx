import { formatMoney } from "@/lib/utils/format";

type PriceBlockProps = {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };

export default function PriceBlock({ price, compareAtPrice, size = "md" }: PriceBlockProps) {
  return (
    <div className="flex items-baseline gap-3">
      <span className={[sizes[size], "font-medium text-foreground"].join(" ")}>
        {formatMoney(price)}
      </span>
      {compareAtPrice && (
        <span className={[sizes[size], "text-muted line-through"].join(" ")}>
          {formatMoney(compareAtPrice)}
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
