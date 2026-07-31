import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/commerce";

type ProductGridProps = {
  products: Product[];
  columns?: 2 | 3 | 4;
};

const colMap = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-border py-28 text-center">
        <p className="eyebrow">The Edit</p>
        <p className="mt-4 font-heading text-2xl font-light text-foreground">
          No pieces found
        </p>
        <p className="mt-2 text-sm font-light text-muted">
          Try adjusting your filters or search
        </p>
      </div>
    );
  }

  return (
    <div className={["grid gap-x-4 gap-y-12 lg:gap-x-5", colMap[columns]].join(" ")}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
