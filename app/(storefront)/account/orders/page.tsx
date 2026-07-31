import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/utils/auth";
import { getCustomerOrders } from "@/lib/data/server";
import { formatMoney } from "@/lib/utils/format";

export const metadata = { title: "My Orders" };

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/account/sign-in?redirect=/account/orders");

  const orders = await getCustomerOrders(session.sub);

  return (
    <div>
      <h2 className="mb-6 font-heading text-xl font-light">Order History</h2>

      {orders.length === 0 ? (
        <div className="border border-border p-8 text-center">
          <p className="text-sm font-medium">You have no orders yet</p>
          <p className="mt-1 text-xs text-muted">When you place an order, it will show up here.</p>
          <Link
            href="/new-arrivals"
            className="mt-4 inline-block border border-foreground px-5 py-2 text-[10px] font-medium uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block border border-border p-5 hover:border-foreground transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusPill status={order.status} />
                  <span className="font-medium">{formatMoney(order.total)}</span>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-faint">
                    <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {order.items.map((item, i) => (
                  <div key={`${item.productId}-${i}`} className="text-xs text-muted">
                    {item.productTitle}
                    {i < order.items.length - 1 ? "," : ""}
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
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
