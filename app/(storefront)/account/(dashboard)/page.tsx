import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/utils/auth";
import { getCustomerProfile, getCustomerOrders } from "@/lib/data/server";
import { formatMoney } from "@/lib/utils/format";
import OrderStatusBadge from "@/components/account/OrderStatusBadge";

export const metadata = { title: "Account Overview" };

export default async function AccountOverviewPage() {
  const session = await getSession();
  if (!session) redirect("/account/sign-in?redirect=/account");

  const [customer, orders] = await Promise.all([
    getCustomerProfile(session.sub),
    getCustomerOrders(session.sub),
  ]);
  if (!customer) redirect("/account/sign-in?redirect=/account");

  const totalSpent = orders
    .filter((o) => o.paymentStatus === "paid" && o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const recentOrders = orders.slice(0, 3);
  const memberSince = new Date(customer.memberSince).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div className="border border-black/10 p-6 dark:border-white/10">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Welcome back</p>
        <h2 className="mt-1 text-2xl font-semibold">
          {customer.firstName} {customer.lastName}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">{customer.email}</p>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/10 pt-5 sm:grid-cols-3">
          <Stat label="Total Orders" value={orders.length.toString()} />
          <Stat label="Total Spent" value={formatMoney(totalSpent)} />
          <Stat label="Member Since" value={memberSince} />
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-widest">Recent Orders</h3>
          <Link href="/account/orders" className="text-xs text-zinc-400 underline hover:text-black">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="border border-black/10 p-6 text-center dark:border-white/10">
            <p className="text-sm text-zinc-500">You haven't placed any orders yet.</p>
            <Link href="/new-arrivals" className="mt-2 inline-block text-xs font-medium underline underline-offset-2 hover:text-black">
              Start shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between border border-black/10 p-4 hover:border-black transition-colors dark:border-white/10 dark:hover:border-white"
              >
                <div>
                  <p className="text-sm font-medium">{order.orderNumber}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    {" · "}{order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <OrderStatusBadge status={order.status} />
                  <span className="text-sm font-semibold">{formatMoney(order.total)}</span>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-zinc-300">
                    <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
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
            className="flex h-20 items-center justify-center border border-black/10 text-sm font-medium hover:border-black transition-colors dark:border-white/10 dark:hover:border-white"
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
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
