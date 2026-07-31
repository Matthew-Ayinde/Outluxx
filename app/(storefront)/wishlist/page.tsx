"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/store/WishlistContext";
import ProductGrid from "@/components/product/ProductGrid";

export default function WishlistPage() {
  const { items, clear, count } = useWishlist();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-12 flex items-end justify-between border-b border-border pb-8">
        <div>
          <p className="eyebrow mb-3">Your Selection</p>
          <h1 className="section-title text-4xl sm:text-5xl">Wishlist</h1>
          {count > 0 && (
            <p className="mt-3 text-sm font-light text-muted">{count} {count === 1 ? "piece" : "pieces"}</p>
          )}
        </div>
        {count > 0 && (
          <button
            onClick={clear}
            className="text-xs font-light text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </div>

      {count === 0 ? (
        <div className="py-28 text-center">
          <svg className="mx-auto mb-8 text-faint" width="56" height="56" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M20.84 2.61a5.5 5.5 0 0 0-7.78 0L12 3.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 19.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2 className="mb-4 font-heading text-3xl font-light text-foreground">Your wishlist is empty</h2>
          <p className="mb-10 text-sm font-light text-muted">
            Save pieces you love by clicking the heart on any product.
          </p>
          <Link
            href="/new-arrivals"
            className="inline-block border border-foreground px-10 py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Discover New Arrivals
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} columns={4} />
      )}
    </div>
  );
}
