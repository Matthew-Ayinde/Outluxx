import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "T-Shirts",     href: "/tshirts" },
      { label: "Pants",        href: "/pants" },
      { label: "Armless",      href: "/armless" },
      { label: "Tank Tops",    href: "/tank-tops" },
      { label: "New Arrivals", href: "/new-arrivals" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Shipping & Delivery", href: "/shipping-delivery" },
      { label: "Returns & Refunds",   href: "/returns-refunds" },
      { label: "Size Guide",          href: "/size-guide" },
      { label: "Contact",             href: "/support/contact" },
      { label: "FAQ",                 href: "/support/faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Outluxx",   href: "/about" },
      { label: "Privacy Policy",  href: "/privacy-policy" },
      { label: "Terms of Service",href: "/terms" },
      { label: "Cookie Policy",   href: "/cookie-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div>
            <Link href="/" aria-label="Outluxx home">
              <Image
                src="/logo.jpg"
                alt="Outluxx"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm leading-7 text-muted">
              Refined apparel for the considered wardrobe. Each piece made to be worn for decades, not seasons.
            </p>
            <div className="mt-6 flex gap-5">
              {["Instagram", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted transition-opacity hover:opacity-100"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-opacity hover:opacity-100"
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

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Outluxx. All rights reserved.</p>
          <p className="text-[10px] uppercase tracking-[0.18em]">
            Complimentary global shipping on orders over $250
          </p>
        </div>
      </div>
    </footer>
  );
}
