import type { ReactNode } from "react";
import Link from "next/link";
import SignOutButton from "@/components/account/SignOutButton";

const NAV = [
  { label: "Overview", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Returns", href: "/account/returns" },
  { label: "Profile", href: "/account/profile" },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-12 border-b border-border pb-8">
        <p className="eyebrow mb-3">My Account</p>
        <h1 className="section-title text-4xl sm:text-5xl">Account</h1>
      </div>

      <div className="flex flex-col gap-12 md:flex-row md:gap-20">
        {/* Sidebar */}
        <aside className="w-full shrink-0 md:w-44">
          <nav className="flex flex-row flex-wrap gap-x-5 gap-y-1 md:flex-col md:gap-0">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-light text-muted transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-3 hidden border-border md:block" />
            <SignOutButton />
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
