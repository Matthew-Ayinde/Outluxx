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
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6">
        <Link href="/" className="inline-flex items-center" aria-label="Outluxx home">
          <Image
            src="/logo.jpg"
            alt="Outluxx"
            width={140}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {topLevelNav.map((item) => (
            <Link key={item.label} href={item.href} className="text-black hover:text-red-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="flex items-center gap-3 text-xs sm:text-sm">
          {utilityNav.map((item) => (
            <Link key={item.label} href={item.href} className="text-black hover:text-red-600">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <nav className="border-t border-black/10 px-4 py-3 md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto text-sm">
          {topLevelNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-black hover:text-red-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}