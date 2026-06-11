import Link from "next/link";
import { orders } from "@/lib/data";
import { formatMoney } from "@/lib/utils/format";

const MOCK_CUSTOMER = {
  firstName: "Sarah",
  lastName: "Mitchell",
  email: "sarah.mitchell@example.com",
  orderCount: 7,
  totalSpent: 12450,
};

export const metadata = { title: "Account Overview" };

export default function AccountOverviewPage() {
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div className="border border-black/10 p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Welcome back</p>
        <h2 className="mt-1 text-2xl font-semibold">
          {MOCK_CUSTOMER.firstName} {MOCK_CUSTOMER.lastName}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">{MOCK_CUSTOMER.email}</p>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/10 pt-5 sm:grid-cols-3">
          <Stat label="Total Orders" value={MOCK_CUSTOMER.orderCount.toString()} />
          <Stat label="Total Spent" value={formatMoney(MOCK_CUSTOMER.totalSpent)} />
          <Stat label="Member Since" value="Jan 2024" />
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-widest">Recent Orders</h3>
          <Link href="/account/orders" className="text-xs text-zinc-400 underline hover:text-black">View all</Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between border border-black/10 p-4 hover:border-black transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{order.orderNumber}</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  {" · "}{order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <StatusPill status={order.status} />
                <span className="text-sm font-semibold">{formatMoney(order.total)}</span>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-zinc-300">
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "My Orders", href: "/account/orders" },
          { label: "Addresses", href: "/account/addresses" },
          { label: "Returns", href: "/account/returns" },
          { label: "Profile", href: "/account/profile" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex h-20 items-center justify-center border border-black/10 text-sm font-medium hover:border-black transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-0.5 text-lg font-semibold">{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    delivered: "bg-green-50 text-green-700 border-green-200",
    shipped: "bg-blue-50 text-blue-700 border-blue-200",
    processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
    pending: "bg-zinc-50 text-zinc-600 border-zinc-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    returned: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return (
    <span className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${styles[status] ?? styles.pending}`}>
      {status}
    </span>
  );
}
