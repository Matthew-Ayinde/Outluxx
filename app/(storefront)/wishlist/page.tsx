"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/store/WishlistContext";
import ProductGrid from "@/components/product/ProductGrid";

export default function WishlistPage() {
  const { items, clear, count } = useWishlist();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-6">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Your Selection
          </p>
          <h1 className="text-4xl font-semibold">Wishlist</h1>
          {count > 0 && (
            <p className="mt-1 text-sm text-zinc-500">{count} {count === 1 ? "item" : "items"}</p>
          )}
        </div>
        {count > 0 && (
          <button
            onClick={clear}
            className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {count === 0 ? (
        <div className="py-24 text-center">
          <svg className="mx-auto mb-6 text-zinc-200" width="64" height="64" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20.84 2.61a5.5 5.5 0 0 0-7.78 0L12 3.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 19.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2 className="mb-3 text-xl font-semibold">Your wishlist is empty</h2>
          <p className="mb-8 text-sm text-zinc-500">
            Save pieces you love by clicking the heart on any product.
          </p>
          <Link
            href="/new-arrivals"
            className="inline-block border border-black px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
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
