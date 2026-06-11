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
      <span className={[sizes[size], "font-semibold", compareAtPrice ? "text-red-600" : "text-black"].join(" ")}>
        {formatMoney(price)}
      </span>
      {compareAtPrice && (
        <span className={[sizes[size], "text-zinc-400 line-through"].join(" ")}>
          {formatMoney(compareAtPrice)}
        </span>
      )}
      {compareAtPrice && (
        <span className="text-xs font-semibold text-red-600">
          {Math.round((1 - price / compareAtPrice) * 100)}% off
        </span>
      )}
    </div>
  );
}
