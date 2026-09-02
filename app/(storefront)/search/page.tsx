import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data/server";
import ProductGrid from "@/components/product/ProductGrid";
import { NOINDEX } from "@/lib/config/seo";

// Search results are query-dependent and low-value for indexing, but the
// page is deliberately left crawlable (see app/robots.ts) so this noindex
// meta tag actually gets seen instead of silently ignored.
export const metadata: Metadata = { title: "Search", ...NOINDEX };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await getAllProducts({ search: query }) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Search bar */}
      <div className="mb-12">
        <form action="/search" method="get" className="flex items-stretch border-b-2 border-black">
          <input
            type="search"
            name="q"
            defaultValue={query}
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
      {query ? (
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
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm text-zinc-500">
            Start typing to search...
          </p>
        </div>
      )}
    </div>
  );
}
