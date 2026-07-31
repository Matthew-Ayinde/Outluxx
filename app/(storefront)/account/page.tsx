import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/utils/auth";
import { getCustomerProfile, getCustomerOrders } from "@/lib/data/server";
import { formatMoney } from "@/lib/utils/format";

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
      <div className="border border-border p-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-faint">Welcome back</p>
        <h2 className="mt-1 font-heading text-2xl font-light">
          {customer.firstName} {customer.lastName}
        </h2>
        <p className="mt-1 text-sm text-muted">{customer.email}</p>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-3">
          <Stat label="Total Orders" value={orders.length.toString()} />
          <Stat label="Total Spent" value={formatMoney(totalSpent)} />
          <Stat label="Member Since" value={memberSince} />
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.26em] text-foreground">Recent Orders</h3>
          <Link href="/account/orders" className="text-xs text-faint underline hover:text-foreground">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="border border-border p-6 text-center">
            <p className="text-sm text-muted">You haven't placed any orders yet.</p>
            <Link href="/new-arrivals" className="mt-2 inline-block text-xs font-medium underline underline-offset-4 hover:text-foreground">
              Start shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between border border-border p-4 hover:border-foreground transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{order.orderNumber}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    {" · "}{order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusPill status={order.status} />
                  <span className="text-sm font-medium">{formatMoney(order.total)}</span>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-faint">
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
            className="flex h-20 items-center justify-center border border-border text-sm font-medium hover:border-foreground transition-colors"
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
      <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-faint">{label}</p>
      <p className="mt-1 text-lg font-medium">{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    delivered: "border-emerald-700/40 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-500",
    shipped: "border-sky-700/40 text-sky-700 dark:border-sky-500/40 dark:text-sky-500",
    processing: "border-amber-600/40 text-amber-700 dark:border-amber-500/40 dark:text-amber-500",
    pending: "border-hairline text-muted",
    cancelled: "border-red-700/40 text-red-700 dark:border-red-500/40 dark:text-red-500",
    returned: "border-hairline text-muted",
  };
  return (
    <span className={`border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest ${styles[status] ?? styles.pending}`}>
      {status}
    </span>
  );
}
