import type { ReactNode } from "react";
import Link from "next/link";

const NAV = [
  { label: "Overview", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Returns", href: "/account/returns" },
  { label: "Profile", href: "/account/profile" },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b border-black/10 pb-6">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">My Account</p>
        <h1 className="text-4xl font-semibold">Account</h1>
      </div>

      <div className="flex flex-col gap-10 md:flex-row md:gap-16">
        {/* Sidebar */}
        <aside className="w-full shrink-0 md:w-44">
          <nav className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-1.5 text-sm text-zinc-600 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-black/10 hidden md:block" />
            <Link
              href="/account/sign-in"
              className="block py-1.5 text-sm text-zinc-400 hover:text-black transition-colors"
            >
              Sign Out
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
