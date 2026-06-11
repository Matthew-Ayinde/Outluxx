import { orders, products, customers } from "@/lib/data";
import { formatMoney } from "@/lib/utils/format";

export const metadata = { title: "Dashboard" };

export default function AdminDashboard() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
  const recentOrders = orders.slice(0, 8);

  const statusStyles: Record<string, string> = {
    delivered: "bg-green-50 text-green-700",
    shipped: "bg-blue-50 text-blue-700",
    processing: "bg-yellow-50 text-yellow-700",
    pending: "bg-zinc-100 text-zinc-600",
    cancelled: "bg-red-50 text-red-700",
    returned: "bg-purple-50 text-purple-700",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: formatMoney(totalRevenue), change: "+12.4%", up: true },
          { label: "Total Orders", value: orders.length.toString(), change: "+3 this week", up: true },
          { label: "Pending", value: pendingOrders.toString(), change: "Needs attention", up: false },
          { label: "Customers", value: customers.length.toString(), change: "+2 new", up: true },
        ].map((stat) => (
          <div key={stat.label} className="border border-black/10 bg-white p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            <p className={`mt-1 text-xs ${stat.up ? "text-green-600" : "text-red-600"}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Recent orders */}
        <div className="border border-black/10 bg-white">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <h2 className="text-sm font-semibold">Recent Orders</h2>
            <a href="/admin/orders" className="text-xs text-zinc-400 hover:text-black">View all →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-zinc-50">
                  {["Order", "Customer", "Items", "Status", "Total"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-3 font-medium">{order.orderNumber}</td>
                    <td className="px-5 py-3 text-zinc-600">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</td>
                    <td className="px-5 py-3 text-zinc-500">{order.items.length}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase ${statusStyles[order.status] ?? statusStyles.pending}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-semibold">{formatMoney(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick stats sidebar */}
        <div className="space-y-4">
          <div className="border border-black/10 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold">Inventory Alerts</h2>
            <div className="space-y-3">
              {products.filter((p) => p.sizes.every((s) => !s.available)).slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium leading-tight">{p.title}</p>
                  <span className="shrink-0 border border-red-200 bg-red-50 px-2 py-0.5 text-[9px] font-semibold uppercase text-red-600">
                    Out
                  </span>
                </div>
              ))}
              {products.filter((p) => p.sizes.every((s) => !s.available)).length === 0 && (
                <p className="text-xs text-zinc-400">No alerts — all products in stock.</p>
              )}
            </div>
          </div>

          <div className="border border-black/10 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold">Top Products</h2>
            <div className="space-y-3">
              {products.filter((p) => p.isFeatured).slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-zinc-300">0{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-medium">{p.title}</p>
                    <p className="text-[11px] text-zinc-400">{formatMoney(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
