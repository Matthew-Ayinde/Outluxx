import Link from "next/link";

const megaContent: Record<string, { heading: string; links: { label: string; href: string }[] }[]> = {
  women: [
    { heading: "Category", links: [
      { label: "Dresses",   href: "/women?cat=Dresses" },
      { label: "Coats",     href: "/women?cat=Coats" },
      { label: "Blazers",   href: "/women?cat=Blazers" },
      { label: "Trousers",  href: "/women?cat=Trousers" },
      { label: "Tops",      href: "/women?cat=Tops" },
      { label: "Knitwear",  href: "/women?cat=Knitwear" },
      { label: "Skirts",    href: "/women?cat=Skirts" },
    ]},
    { heading: "Featured", links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Sale",         href: "/sale" },
      { label: "Editorial",    href: "/editorial" },
    ]},
  ],
  men: [
    { heading: "Category", links: [
      { label: "Suits",     href: "/men?cat=Suits" },
      { label: "Jackets",   href: "/men?cat=Jackets" },
      { label: "Shirts",    href: "/men?cat=Shirts" },
      { label: "Trousers",  href: "/men?cat=Trousers" },
      { label: "Knitwear",  href: "/men?cat=Knitwear" },
    ]},
    { heading: "Featured", links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Designers",    href: "/designers" },
      { label: "Sale",         href: "/sale" },
    ]},
  ],
  accessories: [
    { heading: "Category", links: [
      { label: "Bags",     href: "/accessories?cat=Bags" },
      { label: "Shoes",    href: "/accessories?cat=Shoes" },
      { label: "Scarves",  href: "/accessories?cat=Scarves" },
      { label: "Eyewear",  href: "/accessories?cat=Eyewear" },
      { label: "Belts",    href: "/accessories?cat=Belts" },
    ]},
    { heading: "Featured", links: [
      { label: "New In",  href: "/new-arrivals" },
      { label: "Sale",    href: "/sale" },
    ]},
  ],
  "new-arrivals": [
    { heading: "New In", links: [
      { label: "All New Arrivals",  href: "/new-arrivals" },
      { label: "Women",             href: "/new-arrivals?gender=women" },
      { label: "Men",               href: "/new-arrivals?gender=men" },
      { label: "Accessories",       href: "/new-arrivals?gender=accessories" },
    ]},
  ],
  designers: [
    { heading: "Browse", links: [
      { label: "All Designers", href: "/designers" },
      { label: "Maison Altair", href: "/brands/maison-altair" },
      { label: "Atelier Milo",  href: "/brands/atelier-milo" },
      { label: "Studio Voss",   href: "/brands/studio-voss" },
      { label: "Crespi Milano", href: "/brands/crespi-milano" },
    ]},
  ],
  sale: [
    { heading: "Sale", links: [
      { label: "All Sale",    href: "/sale" },
      { label: "Women",       href: "/sale?cat=women" },
      { label: "Men",         href: "/sale?cat=men" },
      { label: "Accessories", href: "/sale?cat=accessories" },
    ]},
  ],
};

export default function MegaMenu({ category }: { category: string }) {
  const sections = megaContent[category];
  if (!sections) return null;

  return (
    <div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2">
      <div className="min-w-48 border border-border bg-background p-7">
        <div className="flex gap-12">
          {sections.map((section) => (
            <div key={section.heading}>
              <p className="eyebrow mb-4">{section.heading}</p>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block whitespace-nowrap text-[13px] font-light text-muted transition-colors duration-300 hover:text-foreground"
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
    </div>
  );
}
