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
      <h2 className="mb-2 text-xl font-semibold">Returns & Refunds</h2>
      <p className="mb-6 text-sm text-zinc-500">
        Returns are accepted within 10 days of delivery. Items must be in original condition.
      </p>

      <div className="mb-6 border border-black/10 p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest">Eligible for Return</h3>
        {eligibleOrders.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No delivered orders yet. Once an order is delivered, it will appear here and can be returned within 10 days.
          </p>
        ) : (
          <div className="space-y-3">
            {eligibleOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-zinc-500">
                    {order.items.map((i) => i.productTitle).join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">{formatMoney(order.total)}</span>
                  {order.status === "returned" ? (
                    <span className="border border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-purple-700">
                      Returned
                    </span>
                  ) : (
                    <Link
                      href="/support/contact"
                      className="border border-black px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
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

      <div className="border border-black/10 p-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Returns Policy</h3>
        <ul className="space-y-2 text-sm text-zinc-600">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black" />
            Returns accepted within 10 days of delivery
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black" />
            Items must be unworn, with all original tags attached
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black" />
            Refunds are processed within 5–7 business days
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black" />
            Final sale items are non-returnable
          </li>
        </ul>
        <Link
          href="/returns-refunds"
          className="mt-4 inline-block text-xs text-zinc-400 underline underline-offset-2 hover:text-black"
        >
          Full returns policy →
        </Link>
      </div>
    </div>
  );
}
