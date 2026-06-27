"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/store/CartContext";
import MobileNav from "@/components/navigation/MobileNav";
import MiniCart from "@/components/cart/MiniCart";

const primaryNav = [
  { label: "T-Shirts",  href: "/tshirts" },
  { label: "Pants",     href: "/pants" },
  { label: "Armless",   href: "/armless" },
  { label: "Tank Tops", href: "/tank-tops" },
];

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("outluxx-theme", next ? "dark" : "light"); } catch {}
  }

  return (
    <button
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center text-foreground opacity-50 transition-opacity hover:opacity-100"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        /* Sun icon */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13 9.5A6 6 0 016.5 3a6 6 0 000 10A6 6 0 0013 9.5z"
            stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-40 bg-background",
          "transition-[border-color] duration-300",
          scrolled ? "border-b border-border" : "border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link href="/" aria-label="Outluxx home" className="shrink-0">
            <Image
              src="/logo.jpg"
              alt="Outluxx"
              width={120}
              height={32}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  className="nav-link text-[11px] font-medium uppercase tracking-[0.18em] text-foreground opacity-60 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-0.5">
            <DarkModeToggle />

            <Link
              href="/search"
              className="flex h-8 w-8 items-center justify-center text-foreground opacity-50 transition-opacity hover:opacity-100"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </Link>

            <Link
              href="/account"
              className="hidden lg:flex h-8 w-8 items-center justify-center text-foreground opacity-50 transition-opacity hover:opacity-100"
              aria-label="Account"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </Link>

            <button
              onClick={openCart}
              className="relative flex h-8 w-8 items-center justify-center text-foreground opacity-50 transition-opacity hover:opacity-100"
              aria-label={`Cart, ${itemCount} items`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5 6V4a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <rect x="1.5" y="5.5" width="13" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[8px] font-bold text-background">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-8 w-8 items-center justify-center text-foreground opacity-50 transition-opacity hover:opacity-100 lg:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} nav={primaryNav} />
      <MiniCart />
    </>
  );
}
