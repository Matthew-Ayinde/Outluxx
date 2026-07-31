import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { Product } from "@/lib/db/models/Product";
import { formatMoney } from "@/lib/utils/format";
import {
  Wallet,
  CheckCircle2,
  Receipt,
  Package,
  BarChart3,
  PieChart,
  Layers,
  Medal,
} from "lucide-react";

export const metadata = { title: "Analytics" };
export const dynamic = "force-dynamic";

const STAT_ACCENTS = {
  emerald: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  sky: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
  violet: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  amber: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
} as const;

const CATEGORY_COLORS = ["bg-indigo-500", "bg-violet-500", "bg-sky-500", "bg-amber-500", "bg-rose-500", "bg-emerald-500"];

const STATUS_COLORS: Record<string, string> = {
  delivered: "bg-emerald-500", shipped: "bg-sky-500",
  processing: "bg-amber-500", pending: "bg-faint",
  cancelled: "bg-red-500", returned: "bg-faint",
};

const MEDAL_CLASSES = [
  "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "bg-slate-400/15 text-slate-500 dark:text-slate-300",
  "bg-orange-500/15 text-orange-600 dark:text-orange-400",
];

export default async function AdminAnalyticsPage() {
  await connectDB();

  const [allOrders, products] = await Promise.all([
    Order.find({}).select("status paymentStatus total items createdAt").lean(),
    Product.find({}).select("category").lean(),
  ]);

  const paidOrders = allOrders.filter((o) => o.paymentStatus === "paid" && o.status !== "cancelled");
  const totalRevenue = paidOrders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;
  const itemsSold = paidOrders.reduce(
    (s, o) => s + o.items.reduce((n, item) => n + item.quantity, 0),
    0
  );

  const statusBreakdown = allOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Revenue by category — join order items to products by id
  const categoryById = new Map(products.map((p) => [p._id.toString(), p.category]));
  const categoryRevenue = paidOrders.reduce((acc, o) => {
    o.items.forEach((item) => {
      const category = categoryById.get(item.productId);
      if (category) {
        acc[category] = (acc[category] ?? 0) + item.price * item.quantity;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  // Monthly revenue — last 6 calendar months from real orders
  const now = new Date();
  const months: { label: string; year: number; month: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleDateString("en-GB", { month: "short" }),
      year: d.getFullYear(),
      month: d.getMonth(),
    });
  }
  const monthlyRevenue = months.map(({ year, month }) =>
    paidOrders
      .filter((o) => {
        const d = new Date(o.createdAt);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((s, o) => s + o.total, 0)
  );
  const maxRevenue = Math.max(...monthlyRevenue, 1);

  // Top products by real revenue from order items
  const productRevenue = new Map<string, { revenue: number; units: number; brand: string }>();
  paidOrders.forEach((o) => {
    o.items.forEach((item) => {
      const entry = productRevenue.get(item.productTitle) ?? { revenue: 0, units: 0, brand: item.productBrand };
      entry.revenue += item.price * item.quantity;
      entry.units += item.quantity;
      productRevenue.set(item.productTitle, entry);
    });
  });
  const topProducts = [...productRevenue.entries()]
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 6);

  const stats = [
    { label: "Total Revenue", value: formatMoney(totalRevenue), icon: Wallet, accent: "emerald" as const },
    { label: "Paid Orders", value: paidOrders.length.toString(), icon: CheckCircle2, accent: "sky" as const },
    { label: "Avg Order Value", value: formatMoney(avgOrderValue), icon: Receipt, accent: "violet" as const },
    { label: "Items Sold", value: itemsSold.toString(), icon: Package, accent: "amber" as const },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-light">Analytics</h1>
        <p className="mt-1 text-sm text-muted">Performance overview for {now.getFullYear()}</p>
      </div>

      {/* Key metrics */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-start justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-faint">{m.label}</p>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${STAT_ACCENTS[m.accent]}`}>
                  <Icon size={16} strokeWidth={1.75} />
                </span>
              </div>
              <p className="mt-3 font-heading text-2xl font-light">{m.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly revenue bar chart */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
              <BarChart3 size={14} strokeWidth={1.75} />
            </span>
            <h2 className="text-sm font-medium">Monthly Revenue (last 6 months)</h2>
          </div>
          <div className="flex items-end gap-3 h-40">
            {months.map((m, i) => {
              const height = (monthlyRevenue[i] / maxRevenue) * 100;
              return (
                <div key={`${m.label}-${m.year}`} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[9px] font-medium text-faint">
                    {monthlyRevenue[i] === 0 ? "—" : `${(monthlyRevenue[i] / 1000).toFixed(1)}k`}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-indigo-500 transition-all"
                    style={{ height: `${Math.max(height, monthlyRevenue[i] > 0 ? 2 : 0)}%` }}
                  />
                  <span className="text-[10px] text-muted">{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
              <PieChart size={14} strokeWidth={1.75} />
            </span>
            <h2 className="text-sm font-medium">Order Status Breakdown</h2>
          </div>
          {allOrders.length === 0 ? (
            <p className="text-xs text-faint">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(statusBreakdown).map(([status, count]) => {
                const pct = Math.round((count / allOrders.length) * 100);
                return (
                  <div key={status}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium capitalize">{status}</span>
                      <span className="text-muted">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface">
                      <div
                        className={`h-full rounded-full ${STATUS_COLORS[status] ?? "bg-faint"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Revenue by category */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
              <Layers size={14} strokeWidth={1.75} />
            </span>
            <h2 className="text-sm font-medium">Revenue by Category</h2>
          </div>
          {Object.keys(categoryRevenue).length === 0 ? (
            <p className="text-xs text-faint">No paid orders yet.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(categoryRevenue)
                .sort(([, a], [, b]) => b - a)
                .map(([category, revenue], i) => {
                  const pct = totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 100) : 0;
                  const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                  return (
                    <div key={category}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-medium capitalize">
                          <span className={`h-2 w-2 rounded-full ${color}`} />
                          {category}
                        </span>
                        <span className="font-medium">{formatMoney(revenue)}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-surface">
                        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1 text-[11px] text-faint">{pct}% of total revenue</p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Top products by revenue */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
              <Medal size={14} strokeWidth={1.75} />
            </span>
            <h2 className="text-sm font-medium">Top Products by Revenue</h2>
          </div>
          {topProducts.length === 0 ? (
            <p className="text-xs text-faint">No paid orders yet.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map(([title, data], i) => (
                <div key={title} className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      i < 3 ? MEDAL_CLASSES[i] : "bg-surface text-faint"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-medium">{title}</p>
                    <p className="text-[11px] text-faint">{data.brand} · {data.units} sold</p>
                  </div>
                  <span className="text-xs font-medium">{formatMoney(data.revenue)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
