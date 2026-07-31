"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Users,
  BarChart3,
  GalleryHorizontal,
  Settings,
  ArrowLeft,
  ChevronLeft,
  Menu,
  X,
  Bell,
} from "lucide-react";

type Accent = "emerald" | "violet" | "sky" | "amber" | "indigo" | "rose" | "teal";

const ACCENT_CLASSES: Record<Accent, { chip: string; bar: string; dot: string }> = {
  emerald: { chip: "bg-emerald-500/15 text-emerald-400", bar: "bg-emerald-500", dot: "bg-emerald-400" },
  violet: { chip: "bg-violet-500/15 text-violet-400", bar: "bg-violet-500", dot: "bg-violet-400" },
  sky: { chip: "bg-sky-500/15 text-sky-400", bar: "bg-sky-500", dot: "bg-sky-400" },
  amber: { chip: "bg-amber-500/15 text-amber-400", bar: "bg-amber-500", dot: "bg-amber-400" },
  indigo: { chip: "bg-indigo-500/15 text-indigo-400", bar: "bg-indigo-500", dot: "bg-indigo-400" },
  rose: { chip: "bg-rose-500/15 text-rose-400", bar: "bg-rose-500", dot: "bg-rose-400" },
  teal: { chip: "bg-teal-500/15 text-teal-400", bar: "bg-teal-500", dot: "bg-teal-400" },
};

const NAV: { label: string; href: string; icon: React.ElementType; accent: Accent }[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, accent: "emerald" },
  { label: "Products", href: "/admin/products", icon: Shirt, accent: "violet" },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag, accent: "sky" },
  { label: "Customers", href: "/admin/customers", icon: Users, accent: "amber" },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, accent: "indigo" },
  { label: "Content", href: "/admin/content", icon: GalleryHorizontal, accent: "rose" },
  { label: "Settings", href: "/admin/settings", icon: Settings, accent: "teal" },
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
  const activeAccent = activeItem ? ACCENT_CLASSES[activeItem.accent] : ACCENT_CLASSES.emerald;

  return (
    <div className="flex min-h-screen bg-surface">
      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-30 flex h-full flex-col bg-[#111010] text-[#edeae3] transition-all duration-200",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className={["flex items-center gap-3 border-b border-white/10 px-4 py-5", collapsed ? "justify-center" : ""].join(" ")}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edeae3] font-heading text-sm text-[#111010]">
            O
          </div>
          {!collapsed && (
            <div>
              <span className="block font-heading text-sm font-medium uppercase tracking-[0.3em]">Outluxx</span>
              <span className="block text-[9px] font-medium uppercase tracking-[0.24em] text-white/40">Atelier Admin</span>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {NAV.map((item) => {
            const active = isActive(item.href);
            const accent = ACCENT_CLASSES[item.accent];
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "relative flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium transition-colors duration-200",
                  collapsed ? "justify-center" : "",
                  active ? "text-white" : "text-white/45 hover:bg-white/5 hover:text-white",
                ].join(" ")}
                title={collapsed ? item.label : undefined}
              >
                {active && <span className={`absolute left-0 top-1 bottom-1 w-0.75 rounded-full ${accent.bar}`} />}
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active ? accent.chip : "text-white/40",
                  ].join(" ")}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                {!collapsed && <span className="uppercase tracking-[0.18em]">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className={["flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-white/40 hover:text-white transition-colors", collapsed ? "justify-center" : ""].join(" ")}
            title={collapsed ? "Back to Store" : undefined}
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            {!collapsed && <span>Back to Store</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-1 flex w-full items-center justify-center rounded-lg py-2 text-white/30 transition-colors duration-200 hover:text-white"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft size={14} strokeWidth={1.75} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={["flex flex-1 flex-col transition-all duration-200", collapsed ? "lg:ml-16" : "lg:ml-60"].join(" ")}>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button className="text-muted hover:text-foreground lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">
              {mobileOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
            <div className="hidden items-center gap-2 lg:flex">
              {activeItem && (
                <span className={`flex h-6 w-6 items-center justify-center rounded-md ${activeAccent.chip}`}>
                  <activeItem.icon size={14} strokeWidth={1.75} />
                </span>
              )}
              <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-muted">
                {activeItem?.label ?? "Outluxx Admin"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button
              className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell size={16} strokeWidth={1.75} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </button>
            <span className="hidden text-xs font-light text-muted sm:inline">{adminEmail ?? "Admin"}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 font-heading text-sm text-indigo-500">
              {(adminName?.[0] ?? "A").toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
