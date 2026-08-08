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
  IconImage,
  IconMenu,
  IconChevronLeft,
  IconArrowLeft,
} from "./icons";
import { ACCENT_CHIP, ACCENT_CHIP_DARK, type Accent } from "./ui";


const NAV: { label: string; href: string; icon: typeof IconGrid; accent: Accent }[] = [
  { label: "Dashboard", href: "/admin", icon: IconGrid, accent: "gold" },
  { label: "Products", href: "/admin/products", icon: IconShirt, accent: "blue" },
  { label: "Orders", href: "/admin/orders", icon: IconReceipt, accent: "emerald" },
  { label: "Customers", href: "/admin/customers", icon: IconUsers, accent: "sky" },
  { label: "Payments", href: "/admin/payments", icon: IconCard, accent: "teal" },
  { label: "Analytics", href: "/admin/analytics", icon: IconChartBar, accent: "rose" },
  { label: "Content", href: "/admin/content", icon: IconLayout, accent: "orange" },
  { label: "Media", href: "/admin/media", icon: IconImage, accent: "teal" },
  { label: "Settings", href: "/admin/settings", icon: IconGear, accent: "slate" },
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

  const activeItem = NAV.find((item) => isActive(item.href));
  const activeLabel = activeItem?.label ?? "Admin";

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-30 flex h-full flex-col bg-zinc-950 text-white transition-all duration-200",
          collapsed ? "w-16" : "w-64",
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
            <span className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-widest text-white/40">
              <span className="h-1 w-1 rounded-full bg-amber-400" /> Admin Console
            </span>
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
                  "relative mx-2 mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors",
                  collapsed ? "justify-center" : "",
                  active ? "bg-white/[0.08] text-white" : "text-white/50 hover:bg-white/[0.05] hover:text-white",
                ].join(" ")}
                title={collapsed ? item.label : undefined}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    active ? ACCENT_CHIP_DARK[item.accent] : "text-white/40"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {!collapsed && <span className="uppercase tracking-wider">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className={["flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white", collapsed ? "justify-center" : ""].join(" ")}
            title={collapsed ? "Back to Store" : undefined}
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            {!collapsed && <span>Back to Store</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-1 flex w-full items-center justify-center rounded-lg py-2 text-white/30 transition-colors hover:bg-white/[0.05] hover:text-white"
            aria-label="Toggle sidebar"
          >
            <IconChevronLeft className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={["flex flex-1 flex-col transition-all duration-200", collapsed ? "lg:ml-16" : "lg:ml-64"].join(" ")}>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/90 px-4 backdrop-blur lg:px-6">
          <button className="text-zinc-500 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">
            <IconMenu className="h-5 w-5" />
          </button>
          <div className="hidden items-center gap-3 lg:flex">
            {activeItem && (
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${ACCENT_CHIP[activeItem.accent]}`}>
                <activeItem.icon className="h-4 w-4" />
              </span>
            )}
            <span className="text-sm font-medium text-zinc-400">
              Admin <span className="mx-1.5 text-zinc-300">/</span> <span className="text-zinc-800">{activeLabel}</span>
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-zinc-400 sm:inline">{adminEmail ?? "Admin"}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-zinc-900">
              {(adminName?.[0] ?? "A").toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
