import Link from "next/link";
import Image from "next/image";

const topLevelNav = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Accessories", href: "/accessories" },
  { label: "Designers", href: "/designers" },
  { label: "Sale", href: "/sale" },
];

const utilityNav = [
  { label: "Search", href: "/search" },
  { label: "Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-black px-3 pt-3 md:px-4">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-black/10 bg-black px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white">
          Complimentary global shipping on orders over $250
        </div>

        <div className="mt-3 rounded-3xl border border-black/10 bg-white/95 px-4 py-3 shadow-sm">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <nav className="flex items-center gap-2 justify-self-start">
              {utilityNav.slice(0, 2).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-black transition hover:border-red-500 hover:text-red-600 sm:text-xs"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link href="/" className="inline-flex items-center justify-self-center" aria-label="Outluxx home">
              <Image
                src="/logo.jpg"
                alt="Outluxx"
                width={140}
                height={36}
                priority
                className="h-8 w-auto sm:h-9"
              />
            </Link>

            <nav className="flex items-center gap-2 justify-self-end">
              {utilityNav.slice(2).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-black transition hover:border-red-500 hover:text-red-600 sm:text-xs"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <nav className="mt-3 border-t border-black/10 pt-3">
            <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-medium uppercase tracking-[0.12em] sm:justify-center sm:text-xs">
              {topLevelNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-full border border-transparent bg-black/3 px-4 py-2 text-black/85 transition hover:border-red-500/60 hover:text-red-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}