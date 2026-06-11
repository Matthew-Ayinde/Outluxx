"use client";

import { useEffect } from "react";
import Link from "next/link";

type NavItem = { label: string; href: string; accent?: boolean };

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
};

const utilityLinks = [
  { label: "Search",   href: "/search" },
  { label: "Account",  href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
];

const helpLinks = [
  { label: "Shipping & Delivery",  href: "/shipping-delivery" },
  { label: "Returns & Refunds",    href: "/returns-refunds" },
  { label: "Size Guide",           href: "/size-guide" },
  { label: "Contact",              href: "/support/contact" },
  { label: "FAQ",                  href: "/support/faq" },
];

export default function MobileNav({ open, onClose, nav }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        className={[
          "fixed left-0 top-0 z-50 h-full w-80 max-w-[90vw] bg-white flex flex-col shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Menu</p>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-black transition-colors p-1"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-5 py-6">
            <ul className="space-y-0.5">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={[
                      "block py-3 text-base font-medium border-b border-black/5 transition-colors",
                      item.accent ? "text-red-600" : "text-black hover:text-red-600",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-black/10 px-5 py-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              My Account
            </p>
            <ul className="space-y-1">
              {utilityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 text-sm text-black hover:text-red-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-black/10 px-5 py-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Help
            </p>
            <ul className="space-y-1">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 text-sm text-black/60 hover:text-red-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-black/10 px-5 py-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400">
            Global shipping on orders over $250
          </p>
        </div>
      </aside>
    </>
  );
}
