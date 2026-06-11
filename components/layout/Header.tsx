"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/store/CartContext";
import { useWishlist } from "@/lib/store/WishlistContext";
import MobileNav from "@/components/navigation/MobileNav";
import MegaMenu from "@/components/navigation/MegaMenu";
import MiniCart from "@/components/cart/MiniCart";

const primaryNav = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Women",        href: "/women" },
  { label: "Men",          href: "/men" },
  { label: "Accessories",  href: "/accessories" },
  { label: "Designers",    href: "/designers" },
  { label: "Sale",         href: "/sale",  accent: true },
];

export default function Header() {
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaHover, setMegaHover] = useState<string | null>(null);

  return (
    <>
      <header className="sticky top-0 z-40 bg-black px-3 pt-3 md:px-4">
        <div className="mx-auto max-w-6xl">
          {/* Announcement bar */}
          <div className="rounded-xl border border-white/10 bg-black px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white">
            Complimentary global shipping on orders over $250
          </div>

          {/* Main header */}
          <div className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              {/* Left — desktop utility + mobile hamburger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="rounded-full border border-black/15 p-2 text-black hover:border-black transition-colors md:hidden"
                  aria-label="Open menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/search"
                    className="flex items-center gap-1.5 rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-black transition hover:border-black sm:text-xs">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Search
                  </Link>
                  <Link href="/account"
                    className="flex items-center gap-1.5 rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-black transition hover:border-black sm:text-xs">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M1 11c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Account
                  </Link>
                </div>
              </div>

              {/* Center — logo */}
              <Link href="/" aria-label="Outluxx home" className="justify-self-center">
                <Image
                  src="/logo.jpg"
                  alt="Outluxx"
                  width={140}
                  height={36}
                  priority
                  className="h-8 w-auto sm:h-9"
                />
              </Link>

              {/* Right — wishlist + cart */}
              <div className="flex items-center gap-2 justify-self-end">
                <Link href="/wishlist"
                  className="relative flex items-center gap-1.5 rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-black transition hover:border-black sm:text-xs">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 10.5S1 7 1 3.8A2.8 2.8 0 016 1.8a2.8 2.8 0 015 2C11 7 6 10.5 6 10.5z"
                      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                  <span className="hidden sm:inline">Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={openCart}
                  className="relative flex items-center gap-1.5 rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-black transition hover:border-black sm:text-xs"
                  aria-label={`Cart, ${itemCount} items`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 5V3a2 2 0 114 0v2" stroke="currentColor"
                      strokeWidth="1.2" strokeLinecap="round" />
                    <rect x="1" y="4.5" width="10" height="7" rx="1"
                      stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span className="hidden sm:inline">Cart</span>
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Primary nav — desktop only */}
            <nav className="mt-3 hidden border-t border-black/10 pt-3 md:block"
              onMouseLeave={() => setMegaHover(null)}>
              <div className="flex items-center justify-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em]">
                {primaryNav.map((item) => (
                  <div key={item.label} className="relative"
                    onMouseEnter={() => setMegaHover(item.label)}>
                    <Link
                      href={item.href}
                      className={[
                        "whitespace-nowrap rounded-full border border-transparent px-4 py-2 transition",
                        item.accent
                          ? "text-red-600 hover:border-red-200 hover:bg-red-50"
                          : "text-black/85 hover:border-black/15 hover:bg-zinc-50",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                    {megaHover === item.label && (
                      <MegaMenu category={item.href.replace("/", "")} />
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        nav={primaryNav}
      />
      <MiniCart />
    </>
  );
}
