import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data/server";
import ProductGrid from "@/components/product/ProductGrid";

export const metadata: Metadata = { title: "Search" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await getAllProducts({ search: query }) : [];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      {/* Search bar */}
      <div className="mx-auto mb-16 max-w-3xl">
        <p className="eyebrow mb-6 text-center">Search the Maison</p>
        <form action="/search" method="get" className="flex items-stretch border-b border-foreground">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search for pieces, materials, or styles…"
            className="flex-1 bg-transparent py-4 font-heading text-2xl font-light text-foreground outline-none placeholder:text-faint sm:text-3xl"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 text-[10px] font-medium uppercase tracking-[0.26em] text-foreground transition-opacity duration-300 hover:opacity-60"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      {query ? (
        <div>
          <p className="mb-10 border-b border-border pb-6 text-sm font-light text-muted">
            {results.length === 0
              ? `No results for “${query}”`
              : `${results.length} result${results.length !== 1 ? "s" : ""} for “${query}”`}
          </p>
          {results.length > 0 ? (
            <ProductGrid products={results} columns={4} />
          ) : (
            <div className="border border-border py-24 text-center">
              <p className="font-heading text-3xl font-light text-foreground">
                Nothing found
              </p>
              <p className="mt-3 text-sm font-light text-muted">
                Try searching for a brand, category, or style.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm font-light text-muted">
            Try searching for <span className="italic">“cashmere”</span>,{" "}
            <span className="italic">“Maison Altair”</span>, or{" "}
            <span className="italic">“silk”</span>
          </p>
        </div>
      )}
    </div>
  );
}
