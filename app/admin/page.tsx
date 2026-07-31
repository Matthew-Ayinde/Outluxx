import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { Product } from "@/lib/db/models/Product";
import { Customer } from "@/lib/db/models/Customer";
import { formatMoney } from "@/lib/utils/format";
import {
  Wallet,
  ShoppingBag,
  Clock,
  Users,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Truck,
  RefreshCw,
  XCircle,
  RotateCcw,
  AlertTriangle,
  Trophy,
  PackageCheck,
} from "lucide-react";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const STAT_ACCENTS = {
  emerald: { chip: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400" },
  sky: { chip: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400" },
  amber: { chip: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400" },
  violet: { chip: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400" },
} as const;

const STATUS_META: Record<string, { label: string; icon: React.ElementType; classes: string }> = {
  delivered: { label: "Delivered", icon: CheckCircle2, classes: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" },
  shipped: { label: "Shipped", icon: Truck, classes: "bg-sky-500/10 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400" },
  processing: { label: "Processing", icon: RefreshCw, classes: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" },
  pending: { label: "Pending", icon: Clock, classes: "bg-surface text-muted" },
  cancelled: { label: "Cancelled", icon: XCircle, classes: "bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400" },
  returned: { label: "Returned", icon: RotateCcw, classes: "bg-surface text-muted" },
};

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

  const stats = [
    { label: "Total Revenue", value: formatMoney(totalRevenue), change: "Paid orders, all time", up: true, icon: Wallet, accent: "emerald" as const },
    { label: "Total Orders", value: totalOrders.toString(), change: `+${ordersThisWeek} this week`, up: ordersThisWeek > 0, icon: ShoppingBag, accent: "sky" as const },
    { label: "Pending", value: pendingOrders.toString(), change: pendingOrders > 0 ? "Needs attention" : "All clear", up: pendingOrders === 0, icon: Clock, accent: "amber" as const },
    { label: "Customers", value: customerCount.toString(), change: `+${newCustomersThisWeek} this week`, up: newCustomersThisWeek > 0, icon: Users, accent: "violet" as const },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-light">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-start justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-faint">{stat.label}</p>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${STAT_ACCENTS[stat.accent].chip}`}>
                  <Icon size={16} strokeWidth={1.75} />
                </span>
              </div>
              <p className="mt-3 font-heading text-2xl font-light">{stat.value}</p>
              <p className={`mt-1 flex items-center gap-1 text-xs ${stat.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                {stat.up && <ArrowUpRight size={12} strokeWidth={2} />}
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Recent orders */}
        <div className="rounded-xl border border-border bg-background">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                <ShoppingBag size={14} strokeWidth={1.75} />
              </span>
              <h2 className="text-sm font-medium">Recent Orders</h2>
            </div>
            <a href="/admin/orders" className="flex items-center gap-1 text-xs text-faint hover:text-foreground">
              View all <ArrowRight size={12} strokeWidth={2} />
            </a>
          </div>
          <div className="overflow-x-auto">
            {recentOrders.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-faint">No orders yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    {["Order", "Customer", "Items", "Status", "Total"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-medium uppercase tracking-[0.28em] text-faint">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map((order) => {
                    const meta = STATUS_META[order.status] ?? STATUS_META.pending;
                    const StatusIcon = meta.icon;
                    return (
                      <tr key={order._id.toString()} className="hover:bg-surface transition-colors">
                        <td className="px-5 py-3 font-medium">{order.orderNumber}</td>
                        <td className="px-5 py-3 text-muted">
                          {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                        </td>
                        <td className="px-5 py-3 text-muted">{order.items.length}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase ${meta.classes}`}>
                            <StatusIcon size={11} strokeWidth={2} />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-medium">{formatMoney(order.total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick stats sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
                <AlertTriangle size={14} strokeWidth={1.75} />
              </span>
              <h2 className="text-sm font-medium">Inventory Alerts</h2>
            </div>
            <div className="space-y-3">
              {outOfStock.map((p) => (
                <div key={p._id.toString()} className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium leading-tight">{p.title}</p>
                  <span className="shrink-0 rounded-full bg-red-500/10 px-2 py-0.5 text-[9px] font-medium uppercase text-red-600 dark:bg-red-500/15 dark:text-red-400">
                    Out
                  </span>
                </div>
              ))}
              {outOfStock.length === 0 && (
                <div className="flex items-center gap-2 text-xs text-faint">
                  <PackageCheck size={14} strokeWidth={1.75} className="text-emerald-500" />
                  No alerts — all products in stock.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
                <Trophy size={14} strokeWidth={1.75} />
              </span>
              <h2 className="text-sm font-medium">Top Products</h2>
            </div>
            <div className="space-y-3">
              {topProductsAgg.length === 0 ? (
                <p className="text-xs text-faint">No sales yet.</p>
              ) : (
                topProductsAgg.map((p, i) => (
                  <div key={p._id} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-bold text-faint">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-medium">{p._id}</p>
                      <p className="text-[11px] text-faint">
                        {p.unitsSold} sold · {formatMoney(p.revenue)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
