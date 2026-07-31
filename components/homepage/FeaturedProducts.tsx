import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/data/server";

export default async function FeaturedProducts() {
  const products = (await getFeaturedProducts(4));

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
      <div className="mb-14 flex items-end justify-between border-b border-border pb-8">
        <div>
          <p className="eyebrow mb-3">The Selection</p>
          <h2 className="section-title text-4xl sm:text-5xl">Featured Pieces</h2>
        </div>
        <Link
          href="/new-arrivals"
          className="nav-link shrink-0 text-[10px] font-medium uppercase tracking-[0.24em] text-muted transition-colors duration-300 hover:text-foreground"
        >
          View All
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
