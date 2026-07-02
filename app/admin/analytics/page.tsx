import connectDB from "@/lib/db/mongoose";
import { Order } from "@/lib/db/models/Order";
import { Product } from "@/lib/db/models/Product";
import { formatMoney } from "@/lib/utils/format";

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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="mt-1 text-sm text-zinc-500">Performance overview for {now.getFullYear()}</p>
      </div>

      {/* Key metrics */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: formatMoney(totalRevenue) },
          { label: "Paid Orders", value: paidOrders.length.toString() },
          { label: "Avg Order Value", value: formatMoney(avgOrderValue) },
          { label: "Items Sold", value: itemsSold.toString() },
        ].map((m) => (
          <div key={m.label} className="border border-black/10 bg-white p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly revenue bar chart */}
        <div className="border border-black/10 bg-white p-5">
          <h2 className="mb-5 text-sm font-semibold">Monthly Revenue (last 6 months)</h2>
          <div className="flex items-end gap-3 h-40">
            {months.map((m, i) => {
              const height = (monthlyRevenue[i] / maxRevenue) * 100;
              return (
                <div key={`${m.label}-${m.year}`} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[9px] font-semibold text-zinc-400">
                    {monthlyRevenue[i] === 0 ? "—" : `${(monthlyRevenue[i] / 1000).toFixed(1)}k`}
                  </span>
                  <div
                    className="w-full bg-black transition-all"
                    style={{ height: `${Math.max(height, monthlyRevenue[i] > 0 ? 2 : 0)}%` }}
                  />
                  <span className="text-[10px] text-zinc-500">{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="border border-black/10 bg-white p-5">
          <h2 className="mb-5 text-sm font-semibold">Order Status Breakdown</h2>
          {allOrders.length === 0 ? (
            <p className="text-xs text-zinc-400">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(statusBreakdown).map(([status, count]) => {
                const pct = Math.round((count / allOrders.length) * 100);
                const colors: Record<string, string> = {
                  delivered: "bg-green-500", shipped: "bg-blue-500",
                  processing: "bg-yellow-500", pending: "bg-zinc-400",
                  cancelled: "bg-red-500", returned: "bg-purple-500",
                };
                return (
                  <div key={status}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium capitalize">{status}</span>
                      <span className="text-zinc-500">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100">
                      <div
                        className={`h-full ${colors[status] ?? "bg-zinc-400"}`}
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
        <div className="border border-black/10 bg-white p-5">
          <h2 className="mb-5 text-sm font-semibold">Revenue by Category</h2>
          {Object.keys(categoryRevenue).length === 0 ? (
            <p className="text-xs text-zinc-400">No paid orders yet.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(categoryRevenue)
                .sort(([, a], [, b]) => b - a)
                .map(([category, revenue]) => {
                  const pct = totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 100) : 0;
                  return (
                    <div key={category}>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="font-medium capitalize">{category}</span>
                        <span className="font-semibold">{formatMoney(revenue)}</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100">
                        <div className="h-full bg-black" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-400">{pct}% of total revenue</p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Top products by revenue */}
        <div className="border border-black/10 bg-white p-5">
          <h2 className="mb-5 text-sm font-semibold">Top Products by Revenue</h2>
          {topProducts.length === 0 ? (
            <p className="text-xs text-zinc-400">No paid orders yet.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map(([title, data], i) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="w-5 text-[10px] font-bold text-zinc-300">0{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-medium">{title}</p>
                    <p className="text-[11px] text-zinc-400">{data.brand} · {data.units} sold</p>
                  </div>
                  <span className="text-xs font-semibold">{formatMoney(data.revenue)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
