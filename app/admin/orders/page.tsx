import { orders } from "@/lib/data";
import { formatMoney } from "@/lib/utils/format";

export const metadata = { title: "Orders" };

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  shipped: "bg-blue-50 text-blue-700",
  processing: "bg-yellow-50 text-yellow-700",
  pending: "bg-zinc-100 text-zinc-600",
  cancelled: "bg-red-50 text-red-700",
  returned: "bg-purple-50 text-purple-700",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="mt-1 text-sm text-zinc-500">{orders.length} total orders</p>
        </div>
        <button className="border border-black/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors">
          Export CSV
        </button>
      </div>

      {/* Status filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"].map((s, i) => (
          <button
            key={s}
            className={[
              "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
              i === 0 ? "bg-black text-white" : "border border-black/15 hover:border-black",
            ].join(" ")}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="border border-black/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-zinc-50">
                {["Order #", "Date", "Customer", "Items", "Status", "Total", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3 font-semibold">{order.orderNumber}</td>
                  <td className="px-5 py-3 text-zinc-500">
                    {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p className="text-xs text-zinc-400">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                  </td>
                  <td className="px-5 py-3 text-zinc-500">{order.items.length}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold">{formatMoney(order.total)}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-3">
                      <button className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black">View</button>
                      <button className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
