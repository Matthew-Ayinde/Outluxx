import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/utils/auth";
import { getCustomerOrders } from "@/lib/data/server";
import { formatMoney } from "@/lib/utils/format";

export const metadata = { title: "Returns" };

export default async function ReturnsPage() {
  const session = await getSession();
  if (!session) redirect("/account/sign-in?redirect=/account/returns");

  const orders = await getCustomerOrders(session.sub);
  const eligibleOrders = orders.filter((o) => o.status === "returned" || o.status === "delivered");

  return (
    <div>
      <h2 className="mb-2 font-heading text-xl font-light">Returns & Refunds</h2>
      <p className="mb-6 text-sm text-muted">
        Returns are accepted within 14 days of delivery. Items must be in original condition.
      </p>

      <div className="mb-6 border border-border p-5">
        <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">Eligible for Return</h3>
        {eligibleOrders.length === 0 ? (
          <p className="text-sm text-muted">
            No delivered orders yet. Once an order is delivered, it will appear here and can be returned within 14 days.
          </p>
        ) : (
          <div className="space-y-3">
            {eligibleOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-muted">
                    {order.items.map((i) => i.productTitle).join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{formatMoney(order.total)}</span>
                  {order.status === "returned" ? (
                    <span className="border border-hairline px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                      Returned
                    </span>
                  ) : (
                    <Link
                      href="/support/contact"
                      className="border border-foreground px-4 py-1.5 text-[10px] font-medium uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                    >
                      Start Return
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-border p-5">
        <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">Returns Policy</h3>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
            Returns accepted within 14 days of delivery
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
            Items must be unworn, with all original tags attached
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
            Refunds are processed within 5–7 business days
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
            Final sale items are non-returnable
          </li>
        </ul>
        <Link
          href="/returns-refunds"
          className="mt-4 inline-block text-xs text-faint underline underline-offset-4 hover:text-foreground"
        >
          Full returns policy →
        </Link>
      </div>
    </div>
  );
}
