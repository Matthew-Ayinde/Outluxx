"use client";

import { useEffect } from "react";
import Link from "next/link";

type NavItem = { label: string; href: string };

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
  { label: "Shipping & Delivery", href: "/shipping-delivery" },
  { label: "Returns & Refunds",   href: "/returns-refunds" },
  { label: "Size Guide",          href: "/size-guide" },
  { label: "Contact",             href: "/support/contact" },
];

export default function MobileNav({ open, onClose, nav }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "fixed left-0 top-0 z-50 h-full w-72 max-w-[85vw] flex flex-col",
          "bg-background border-r border-border",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
            Menu
          </p>
          <button
            onClick={onClose}
            className="p-1 text-muted transition-opacity hover:opacity-100"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Primary nav */}
          <nav className="px-6 py-6">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 font-heading text-2xl font-light leading-tight text-foreground border-b border-border transition-opacity hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Account */}
          <div className="border-t border-border px-6 py-5">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted">
              Account
            </p>
            <ul className="space-y-1">
              {utilityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 text-sm text-foreground opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="border-t border-border px-6 py-5">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted">
              Help
            </p>
            <ul className="space-y-1">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 text-sm text-muted transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer strip */}
        <div className="border-t border-border px-6 py-4">
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
            Free global shipping on orders over $250
          </p>
        </div>
      </aside>
    </>
  );
}
