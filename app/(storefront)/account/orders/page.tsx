import Link from "next/link";
import { orders } from "@/lib/data";
import { formatMoney } from "@/lib/utils/format";

export const metadata = { title: "My Orders" };

export default function OrdersPage() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-sm text-zinc-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block border border-black/10 p-5 hover:border-black transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusPill status={order.status} />
                  <span className="font-semibold">{formatMoney(order.total)}</span>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-zinc-300">
                    <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="text-xs text-zinc-500">
                    {item.productTitle}
                    {order.items.indexOf(item) < order.items.length - 1 ? "," : ""}
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
