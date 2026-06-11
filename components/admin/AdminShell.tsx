"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="1" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="1" y="9" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="9" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13 5H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M11 5V4a3 3 0 0 0-6 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 2h2l1.5 8h7L14 5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="13.5" r="0.5" fill="currentColor" stroke="currentColor" />
        <circle cx="11" cy="13.5" r="0.5" fill="currentColor" stroke="currentColor" />
      </svg>
    ),
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 14c0-3 2.686-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Editorial",
    href: "/admin/content",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 2h10v12H3z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 5h4M6 8h4M6 11h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 14l3-4 3 2 3-5 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.93 2.93l1.06 1.06M12.01 12.01l1.06 1.06M2.93 13.07l1.06-1.06M12.01 3.99l1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

type AdminShellProps = { children: React.ReactNode };

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-30 flex h-full flex-col bg-black text-white transition-all duration-200",
          collapsed ? "w-16" : "w-56",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className={["flex items-center gap-3 border-b border-white/10 px-4 py-5", collapsed ? "justify-center" : ""].join(" ")}>
          <div className="h-7 w-7 shrink-0 bg-white" />
          {!collapsed && (
            <div>
              <span className="block font-heading text-sm font-semibold tracking-widest">OUTLUXX</span>
              <span className="block text-[9px] font-medium uppercase tracking-widest text-white/40">Admin</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex items-center gap-3 px-4 py-3 text-xs font-medium transition-colors",
                  collapsed ? "justify-center" : "",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white",
                ].join(" ")}
                title={collapsed ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="uppercase tracking-wider">{item.label}</span>}
                {!collapsed && active && (
                  <span className="ml-auto h-1 w-1 rounded-full bg-red-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: store link + collapse */}
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className={[
              "flex items-center gap-2 rounded px-2 py-2 text-xs text-white/40 hover:text-white transition-colors",
              collapsed ? "justify-center" : "",
            ].join(" ")}
            title={collapsed ? "Back to Store" : undefined}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {!collapsed && <span>Back to Store</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-1 flex w-full items-center justify-center py-2 text-white/30 hover:text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-transform ${collapsed ? "rotate-180" : ""}`}>
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={["flex flex-1 flex-col transition-all duration-200", collapsed ? "lg:ml-16" : "lg:ml-56"].join(" ")}>
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-black/10 bg-white px-4 lg:px-6">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="hidden lg:block">
            <span className="text-sm font-medium text-zinc-500">Outluxx Admin</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden text-xs text-zinc-400 sm:inline">admin@outluxx.com</span>
            <div className="flex h-8 w-8 items-center justify-center bg-black text-xs font-semibold text-white">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
