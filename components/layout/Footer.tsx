import Link from "next/link";

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
    heading: "Client Care",
    links: [
      { label: "Shipping & Delivery", href: "/shipping-delivery" },
      { label: "Returns & Refunds",   href: "/returns-refunds" },
      { label: "Size Guide",          href: "/size-guide" },
      { label: "Contact",             href: "/support/contact" },
      { label: "FAQ",                 href: "/support/faq" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "About Outluxx",    href: "/about" },
      { label: "Privacy Policy",   href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy",    href: "/cookie-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Newsletter band */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="eyebrow">The Outluxx Journal</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-tight text-foreground sm:text-4xl">
              Private previews, in your inbox
            </h2>
            <p className="mt-3 max-w-md text-sm font-light leading-6 text-muted">
              New collections, atelier notes, and early access — sent sparingly,
              as all good things should be.
            </p>
          </div>
          <form className="flex w-full max-w-md border-b border-hairline lg:justify-self-end">
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              className="w-full bg-transparent py-3.5 text-sm font-light text-foreground placeholder:text-faint outline-none"
            />
            <button
              type="submit"
              className="shrink-0 py-3.5 pl-6 text-[10px] font-medium uppercase tracking-[0.26em] text-foreground transition-opacity duration-300 hover:opacity-60"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div>
            <Link href="/" aria-label="Outluxx home">
              <span className="font-heading text-xl font-medium uppercase tracking-[0.32em] text-foreground">
                Outluxx
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm font-light leading-7 text-muted">
              Refined apparel for the considered wardrobe. Each piece made to be
              worn for decades, not seasons.
            </p>
            <div className="mt-7 flex gap-6">
              {["Instagram", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="nav-link text-[10px] font-medium uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-foreground"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.26em] text-foreground">
                {col.heading}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-muted transition-colors duration-300 hover:text-foreground"
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

      {/* Legal strip */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-xs font-light text-muted">
            © {new Date().getFullYear()} Outluxx. All rights reserved.
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.26em] text-faint">
            Maison of considered luxury
          </p>
        </div>
      </div>
    </footer>
  );
}
