import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/data/server";

export default async function FeaturedProducts() {
  const products = (await getFeaturedProducts(4));

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-10 flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
            Outluxx Selection
          </p>
          <h2 className="font-heading text-4xl font-light sm:text-5xl">Featured Pieces</h2>
        </div>
        <Link
          href="/new-arrivals"
          className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground opacity-50 transition-opacity hover:opacity-100"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
