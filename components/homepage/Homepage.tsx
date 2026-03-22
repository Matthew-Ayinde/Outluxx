import Link from "next/link";

export default function Homepage() {
  return (
    <div>
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-red-600">
              SPRING / SUMMER 2026
            </p>
            <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl">
              Luxury Fashion, Curated for Everyday Icons.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-black/70 md:text-base">
              Discover premium ready-to-wear, standout accessories, and timeless essentials from top designers.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/new-arrivals"
                className="rounded-none bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-red-600"
              >
                Shop New Arrivals
              </Link>
              <Link
                href="/sale"
                className="rounded-none border border-black px-6 py-3 text-sm font-semibold text-black hover:border-red-600 hover:text-red-600"
              >
                Explore Sale
              </Link>
            </div>
          </div>

          <div className="border border-black/20 bg-black p-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Featured Drop</p>
            <h2 className="mt-3 text-2xl font-semibold">Monochrome Essentials</h2>
            <p className="mt-3 text-sm text-white/70">
              Elevated silhouettes with bold contrast styling.
            </p>
            <Link
              href="/editorial"
              className="mt-6 inline-block border border-white px-4 py-2 text-sm hover:border-red-500 hover:text-red-400"
            >
              View Editorial
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Women", href: "/women" },
            { label: "Men", href: "/men" },
            { label: "Accessories", href: "/accessories" },
            { label: "Designers", href: "/designers" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="border border-black/15 px-5 py-8 text-center text-sm font-semibold text-black hover:border-red-600 hover:text-red-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-6 text-center text-xs font-medium uppercase tracking-[0.16em] text-black/70 sm:grid-cols-3">
          <p>Fast Global Shipping</p>
          <p>Easy 30-day Returns</p>
          <p>Verified Luxury Authenticity</p>
        </div>
      </section>
    </div>
  );
}