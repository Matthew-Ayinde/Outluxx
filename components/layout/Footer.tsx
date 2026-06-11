import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Women", href: "/women" },
      { label: "Men", href: "/men" },
      { label: "Accessories", href: "/accessories" },
      { label: "Designers", href: "/designers" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Shipping & Delivery", href: "/shipping-delivery" },
      { label: "Returns & Refunds", href: "/returns-refunds" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Contact", href: "/support/contact" },
      { label: "FAQ", href: "/support/faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Outluxx", href: "/about" },
      { label: "Editorial", href: "/editorial" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div>
            <Link href="/" aria-label="Outluxx home">
              <Image
                src="/logo.jpg"
                alt="Outluxx"
                width={140}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-6 text-black/60">
              Curated luxury fashion for modern wardrobes. Timeless tailoring,
              elevated essentials.
            </p>
            <div className="mt-5 flex gap-3">
              {["Instagram", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs font-medium uppercase tracking-[0.12em] text-black/50 hover:text-black transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/60 transition-colors hover:text-red-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Outluxx. All rights reserved.</p>
          <p className="uppercase tracking-widest">
            Complimentary global shipping on orders over $250
          </p>
        </div>
      </div>
    </footer>
  );
}
