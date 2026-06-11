import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/data";

export default function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/10 pb-4">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Outluxx Selection
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Featured Pieces</h2>
        </div>
        <Link
          href="/new-arrivals"
          className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-black hover:text-red-600 transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
