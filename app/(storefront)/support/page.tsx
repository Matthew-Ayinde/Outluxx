import Link from "next/link";

export const metadata = { title: "Customer Support" };

const TOPICS = [
  { icon: "📦", title: "Orders & Delivery", desc: "Track your order, delivery times, and more.", href: "/support/faq#orders" },
  { icon: "↩", title: "Returns & Refunds", desc: "How to return items and get your refund.", href: "/returns-refunds" },
  { icon: "📐", title: "Size Guide", desc: "Find your perfect fit across all categories.", href: "/size-guide" },
  { icon: "🔒", title: "Account & Security", desc: "Manage your account, password, and privacy.", href: "/support/faq#account" },
  { icon: "💳", title: "Payments", desc: "Accepted cards, payment security, and billing.", href: "/support/faq#payments" },
  { icon: "✉️", title: "Contact Us", desc: "Reach our team — we reply within 24 hours.", href: "/support/contact" },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <p className="eyebrow mb-3">We're here to help</p>
        <h1 className="section-title text-4xl sm:text-5xl">Customer Support</h1>
        <p className="mt-3 text-sm text-muted">How can we help you today?</p>
      </div>

      {/* Search */}
      <div className="mb-10 flex items-center border-b border-foreground">
        <input
          type="search"
          placeholder="Search for help articles…"
          className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-faint"
        />
        <button className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground hover:opacity-60 transition-colors">
          Search
        </button>
      </div>

      {/* Topics grid */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="group flex gap-4 border border-border p-5 hover:border-foreground transition-colors"
          >
            <span className="text-2xl">{t.icon}</span>
            <div>
              <h3 className="font-medium group-hover:opacity-60 transition-colors">{t.title}</h3>
              <p className="mt-1 text-xs text-muted">{t.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="border border-border p-8 text-center">
        <h3 className="mb-2 font-heading text-lg font-light">Can't find what you're looking for?</h3>
        <p className="mb-6 text-sm text-muted">Our team is available Monday–Friday, 9am–6pm GMT.</p>
        <Link
          href="/support/contact"
          className="inline-block bg-foreground px-8 py-3 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground text-background hover:opacity-90 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
