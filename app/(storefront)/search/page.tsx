"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchProducts } from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";

function SearchInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [submitted, setSubmitted] = useState(!!initial);

  const results = useMemo(
    () => (submitted && query.trim() ? searchProducts(query.trim()) : []),
    [query, submitted]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setSubmitted(true);
      router.replace(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
    }
  }

  return (
    <div>
      {/* Search bar */}
      <div className="mb-12">
        <form onSubmit={handleSubmit} className="flex items-stretch border-b-2 border-black">
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
            placeholder="Search for products, brands, or styles…"
            className="flex-1 bg-transparent py-4 text-lg outline-none placeholder:text-zinc-400"
            autoFocus
          />
          <button
            type="submit"
            className="px-6 text-xs font-semibold uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      {submitted && query.trim() && (
        <div>
          <p className="mb-8 text-sm text-zinc-500">
            {results.length === 0
              ? `No results for "${query}"`
              : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
          </p>
          {results.length > 0 ? (
            <ProductGrid products={results} columns={4} />
          ) : (
            <div className="py-20 text-center">
              <p className="mb-2 text-lg font-semibold">Nothing found</p>
              <p className="text-sm text-zinc-500">Try searching for a brand, category, or style.</p>
            </div>
          )}
        </div>
      )}

      {!submitted && (
        <div className="py-16 text-center">
          <p className="text-sm text-zinc-500">
            Try searching for "cashmere", "Maison Altair", or "blazer"
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Suspense fallback={<div className="py-8 text-center text-sm text-zinc-400">Loading…</div>}>
        <SearchInner />
      </Suspense>
    </div>
  );
}
