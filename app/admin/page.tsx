import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { Product } from "@/lib/db/models/Product";
import { Customer } from "@/lib/db/models/Customer";
import { formatMoney } from "@/lib/utils/format";
import { IconCard, IconReceipt, IconAlertTriangle, IconUsers, IconPackageAlert, IconGrid, IconStar } from "@/components/admin/icons";
import { Panel, SectionHeader, StatCard, StatusBadge, ORDER_STATUS_TONES, type Accent } from "@/components/admin/ui";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectDB();

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    revenueAgg,
    totalOrders,
    pendingOrders,
    ordersThisWeek,
    customerCount,
    newCustomersThisWeek,
    recentOrders,
    outOfStock,
    topProductsAgg,
  ] = await Promise.all([
    Order.aggregate([
      { $match: { paymentStatus: "paid", status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
    Order.countDocuments({}),
    Order.countDocuments({ status: { $in: ["pending", "processing"] } }),
    Order.countDocuments({ createdAt: { $gte: weekAgo } }),
    Customer.countDocuments({ role: "customer" }),
    Customer.countDocuments({ role: "customer", createdAt: { $gte: weekAgo } }),
    Order.find({}).sort({ createdAt: -1 }).limit(8).lean(),
    Product.find({ $or: [{ stock: { $lte: 0 } }, { "sizes.available": { $ne: true } }] })
      .limit(4)
      .lean(),
    Order.aggregate([
      { $match: { paymentStatus: "paid", status: { $ne: "cancelled" } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productTitle",
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          unitsSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
    ]),
  ]);

  const totalRevenue = revenueAgg[0]?.total ?? 0;

  const stats: { label: string; value: string; change: string; trend: "up" | "down" | "flat"; icon: React.ReactNode; accent: Accent }[] = [
    { label: "Total Revenue", value: formatMoney(totalRevenue), change: "Paid orders, all time", trend: "flat", icon: <IconCard className="h-4 w-4" />, accent: "emerald" },
    { label: "Total Orders", value: totalOrders.toString(), change: `+${ordersThisWeek} this week`, trend: ordersThisWeek > 0 ? "up" : "flat", icon: <IconReceipt className="h-4 w-4" />, accent: "blue" },
    { label: "Pending", value: pendingOrders.toString(), change: pendingOrders > 0 ? "Needs attention" : "All clear", trend: pendingOrders === 0 ? "up" : "down", icon: <IconAlertTriangle className="h-4 w-4" />, accent: "orange" },
    { label: "Customers", value: customerCount.toString(), change: `+${newCustomersThisWeek} this week`, trend: newCustomersThisWeek > 0 ? "up" : "flat", icon: <IconUsers className="h-4 w-4" />, accent: "sky" },
  ];

  return (
    <div>
      <SectionHeader title="Dashboard" subtitle="Welcome back. Here's what's happening today." icon={<IconGrid className="h-5 w-5" />} accent="gold" />

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} sub={stat.change} trend={stat.trend} icon={stat.icon} accent={stat.accent} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Recent orders */}
        <Panel
          title="Recent Orders"
          icon={<IconReceipt className="h-4 w-4" />}
          accent="blue"
          action={
            <a href="/admin/orders" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View all →
            </a>
          }
        >
          <div className="overflow-x-auto">
            {recentOrders.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-zinc-400">No orders yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/60">
                    {["Order", "Customer", "Items", "Status", "Total"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {recentOrders.map((order) => (
                    <tr key={order._id.toString()} className="transition-colors hover:bg-zinc-50/80">
                      <td className="px-5 py-3 font-medium">{order.orderNumber}</td>
                      <td className="px-5 py-3 text-zinc-600">
                        {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                      </td>
                      <td className="px-5 py-3 text-zinc-500">{order.items.length}</td>
                      <td className="px-5 py-3">
                        <StatusBadge label={order.status} tone={ORDER_STATUS_TONES[order.status] ?? "neutral"} />
                      </td>
                      <td className="px-5 py-3 font-semibold">{formatMoney(order.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Panel>

        {/* Quick stats sidebar */}
        <div className="space-y-4">
          <Panel title="Inventory Alerts" icon={<IconPackageAlert className="h-4 w-4" />} accent="orange" bodyClassName="p-5">
            <div className="space-y-3">
              {outOfStock.map((p) => (
                <div key={p._id.toString()} className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium leading-tight">{p.title}</p>
                  <StatusBadge label="Out" tone="danger" className="shrink-0" />
                </div>
              ))}
              {outOfStock.length === 0 && (
                <p className="text-xs text-zinc-400">No alerts — all products in stock.</p>
              )}
            </div>
          </Panel>

          <Panel title="Top Products" icon={<IconStar className="h-4 w-4" />} accent="gold" bodyClassName="p-5">
            <div className="space-y-3">
              {topProductsAgg.length === 0 ? (
                <p className="text-xs text-zinc-400">No sales yet.</p>
              ) : (
                topProductsAgg.map((p, i) => (
                  <div key={p._id} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-50 text-[9px] font-bold text-amber-700">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-medium">{p._id}</p>
                      <p className="text-[11px] text-zinc-400">
                        {p.unitsSold} sold · {formatMoney(p.revenue)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
