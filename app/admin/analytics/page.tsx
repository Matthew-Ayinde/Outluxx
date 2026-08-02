import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { Product } from "@/lib/db/models/Product";
import { formatMoney } from "@/lib/utils/format";
import { IconCard, IconChartBar, IconReceipt, IconShirt, IconTag } from "@/components/admin/icons";
import { Panel, SectionHeader, StatCard } from "@/components/admin/ui";

// Fixed categorical identity colours (never cycled/reassigned by rank) —
// keeps each product category the same hue everywhere it appears.
const CATEGORY_COLORS: Record<string, string> = {
  tshirts: "#2a78d6",
  pants: "#eb6834",
  armless: "#1baf7a",
  "tank-tops": "#eda100",
};
const CATEGORY_LABELS: Record<string, string> = {
  tshirts: "T-Shirts",
  pants: "Pants",
  armless: "Armless",
  "tank-tops": "Tank Tops",
};
function categoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? "#a1a1aa";
}

const STATUS_DOT: Record<string, string> = {
  delivered: "bg-emerald-500",
  shipped: "bg-blue-500",
  processing: "bg-orange-500",
  pending: "bg-slate-400",
  cancelled: "bg-rose-500",
  returned: "bg-teal-500",
};

export const metadata = { title: "Analytics" };
export const dynamic = "force-dynamic";

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

  return (
    <div>
      <SectionHeader title="Analytics" subtitle={`Performance overview for ${now.getFullYear()}`} icon={<IconChartBar className="h-5 w-5" />} accent="rose" />

      {/* Key metrics */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatMoney(totalRevenue)} icon={<IconCard className="h-4 w-4" />} accent="emerald" />
        <StatCard label="Paid Orders" value={paidOrders.length.toString()} icon={<IconReceipt className="h-4 w-4" />} accent="blue" />
        <StatCard label="Avg Order Value" value={formatMoney(avgOrderValue)} icon={<IconChartBar className="h-4 w-4" />} accent="gold" />
        <StatCard label="Items Sold" value={itemsSold.toString()} icon={<IconShirt className="h-4 w-4" />} accent="sky" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly revenue bar chart */}
        <Panel title="Monthly Revenue" icon={<IconChartBar className="h-4 w-4" />} accent="gold" bodyClassName="p-5">
          <div className="relative h-40">
            {[0, 25, 50, 75].map((pct) => (
              <div key={pct} className="absolute inset-x-0 border-t border-zinc-100" style={{ top: `${100 - pct}%` }} />
            ))}
            <div className="relative flex h-full items-end gap-3">
              {months.map((m, i) => {
                const height = (monthlyRevenue[i] / maxRevenue) * 100;
                return (
                  <div key={`${m.label}-${m.year}`} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[9px] font-semibold text-zinc-500 tabular-nums">
                      {monthlyRevenue[i] === 0 ? "—" : `${(monthlyRevenue[i] / 1000).toFixed(1)}k`}
                    </span>
                    <div
                      title={formatMoney(monthlyRevenue[i])}
                      className="w-full max-w-9 rounded-t-md bg-amber-400 transition-all hover:bg-amber-300"
                      style={{ height: `${Math.max(height, monthlyRevenue[i] > 0 ? 2 : 0)}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-1 flex gap-3 border-t border-zinc-200 pt-1.5">
              {months.map((m) => (
                <span key={`${m.label}-${m.year}`} className="flex-1 text-center text-[10px] text-zinc-400">{m.label}</span>
              ))}
            </div>
          </div>
        </Panel>

        {/* Order status breakdown */}
        <Panel title="Order Status Breakdown" icon={<IconReceipt className="h-4 w-4" />} accent="blue" bodyClassName="p-5">
          {allOrders.length === 0 ? (
            <p className="text-xs text-zinc-400">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(statusBreakdown).map(([status, count]) => {
                const pct = Math.round((count / allOrders.length) * 100);
                return (
                  <div key={status}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-medium capitalize">
                        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status] ?? "bg-slate-400"}`} />
                        {status}
                      </span>
                      <span className="text-zinc-500 tabular-nums">{count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-100">
                      <div
                        className={`h-full rounded-full ${STATUS_DOT[status] ?? "bg-slate-400"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>

        {/* Revenue by category */}
        <Panel title="Revenue by Category" icon={<IconTag className="h-4 w-4" />} accent="orange" bodyClassName="p-5">
          {Object.keys(categoryRevenue).length === 0 ? (
            <p className="text-xs text-zinc-400">No paid orders yet.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(categoryRevenue)
                .sort(([, a], [, b]) => b - a)
                .map(([category, revenue]) => {
                  const pct = totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 100) : 0;
                  const color = categoryColor(category);
                  return (
                    <div key={category}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                          {CATEGORY_LABELS[category] ?? category}
                        </span>
                        <span className="font-semibold tabular-nums">{formatMoney(revenue)}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-zinc-100">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-400">{pct}% of total revenue</p>
                    </div>
                  );
                })}
            </div>
          )}
        </Panel>

        {/* Top products by revenue */}
        <Panel title="Top Products by Revenue" icon={<IconCard className="h-4 w-4" />} accent="emerald" bodyClassName="p-5">
          {topProducts.length === 0 ? (
            <p className="text-xs text-zinc-400">No paid orders yet.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map(([title, data], i) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-[9px] font-bold text-emerald-700">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-medium">{title}</p>
                    <p className="text-[11px] text-zinc-400">{data.brand} · {data.units} sold</p>
                  </div>
                  <span className="text-xs font-semibold tabular-nums">{formatMoney(data.revenue)}</span>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
