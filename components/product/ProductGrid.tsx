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
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-medium text-black">No products found</p>
        <p className="mt-1 text-xs text-zinc-500">Try adjusting your filters or search</p>
      </div>
    );
  }

  return (
    <div className={["grid gap-x-4 gap-y-10", colMap[columns]].join(" ")}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
