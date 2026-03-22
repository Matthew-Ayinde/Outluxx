import Link from "next/link";
import Image from "next/image";

const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Women", href: "/women" },
      { label: "Men", href: "/men" },
      { label: "Accessories", href: "/accessories" },
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
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center" aria-label="Outluxx home">
            <Image
              src="/logo.jpg"
              alt="Outluxx"
              width={140}
              height={36}
              className="h-9 w-auto"
            />
          </Link>
          <p className="mt-3 text-sm text-black/70">
            Curated luxury fashion for modern wardrobes.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h2 className="text-sm font-semibold">{column.heading}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-black/80 hover:text-red-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Outluxx. All rights reserved.</p>
          <p className="text-black/70">Black/White foundation · Red accent highlights</p>
        </div>
      </div>
    </footer>
  );
}