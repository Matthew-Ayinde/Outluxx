"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconGrid,
  IconShirt,
  IconReceipt,
  IconUsers,
  IconCard,
  IconChartBar,
  IconGear,
  IconLayout,
  IconMenu,
  IconChevronLeft,
  IconArrowLeft,
} from "./icons";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: IconGrid },
  { label: "Products", href: "/admin/products", icon: IconShirt },
  { label: "Orders", href: "/admin/orders", icon: IconReceipt },
  { label: "Customers", href: "/admin/customers", icon: IconUsers },
  { label: "Payments", href: "/admin/payments", icon: IconCard },
  { label: "Analytics", href: "/admin/analytics", icon: IconChartBar },
  { label: "Content", href: "/admin/content", icon: IconLayout },
  { label: "Settings", href: "/admin/settings", icon: IconGear },
];

export default function AdminShell({
  children,
  adminEmail,
  adminName,
}: {
  children: React.ReactNode;
  adminEmail?: string;
  adminName?: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const activeLabel = NAV.find((item) => isActive(item.href))?.label ?? "Admin";

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-30 flex h-full flex-col bg-zinc-950 text-white transition-all duration-200",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <Link
          href="/admin"
          className={["flex flex-col items-center gap-3 border-b border-white/10 px-4 py-5", collapsed ? "justify-center" : ""].join(" ")}
        >
          <Image
            src="/white-logo.png"
            alt="Outlxx"
            width={120}
            height={32}
            priority
            className={collapsed ? "h-4 w-auto object-contain" : "h-6 w-auto object-contain"}
          />
          {!collapsed && (
            <span className="block text-[9px] font-medium uppercase tracking-widest text-white/40">Admin Console</span>
          )}
        </Link>

        <nav className="flex-1 overflow-y-auto py-4">
          {NAV.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "relative flex items-center gap-3 px-4 py-3 text-xs font-medium transition-colors",
                  collapsed ? "justify-center" : "",
                  active ? "bg-white/[0.07] text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white",
                ].join(" ")}
                title={collapsed ? item.label : undefined}
              >
                {active && <span className="absolute left-0 top-0 h-full w-0.5 bg-white" />}
                <Icon className={active ? "h-4 w-4 text-white" : "h-4 w-4 text-white/50"} />
                {!collapsed && <span className="uppercase tracking-wider">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className={["flex items-center gap-2 px-2 py-2 text-xs text-white/40 transition-colors hover:text-white", collapsed ? "justify-center" : ""].join(" ")}
            title={collapsed ? "Back to Store" : undefined}
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            {!collapsed && <span>Back to Store</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-1 flex w-full items-center justify-center py-2 text-white/30 transition-colors hover:text-white"
            aria-label="Toggle sidebar"
          >
            <IconChevronLeft className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={["flex flex-1 flex-col transition-all duration-200", collapsed ? "lg:ml-16" : "lg:ml-60"].join(" ")}>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:px-6">
          <button className="text-zinc-500 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">
            <IconMenu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block">
            <span className="text-sm font-medium text-zinc-400">
              Admin <span className="mx-1.5 text-zinc-300">/</span> <span className="text-zinc-700">{activeLabel}</span>
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-zinc-400 sm:inline">{adminEmail ?? "Admin"}</span>
            <div className="flex h-8 w-8 items-center justify-center border border-zinc-200 bg-zinc-950 text-xs font-semibold text-white">
              {(adminName?.[0] ?? "A").toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
