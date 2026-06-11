import { orders, products } from "@/lib/data";
import { formatMoney } from "@/lib/utils/format";

export const metadata = { title: "Analytics" };

export default function AdminAnalyticsPage() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = totalRevenue / orders.length;

  const statusBreakdown = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryRevenue = orders.reduce((acc, o) => {
    o.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        acc[product.category] = (acc[product.category] ?? 0) + item.price * item.quantity;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const mockMonthlyRevenue = [18400, 22100, 19800, 26500, 31200, totalRevenue * 0.3];

  const maxRevenue = Math.max(...mockMonthlyRevenue);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="mt-1 text-sm text-zinc-500">Performance overview for 2026</p>
      </div>

      {/* Key metrics */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: formatMoney(totalRevenue) },
          { label: "Orders", value: orders.length.toString() },
          { label: "Avg Order Value", value: formatMoney(avgOrderValue) },
          { label: "Conversion Rate", value: "3.8%" },
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
          <h2 className="mb-5 text-sm font-semibold">Monthly Revenue (2026)</h2>
          <div className="flex items-end gap-3 h-40">
            {MONTHS.map((month, i) => {
              const height = (mockMonthlyRevenue[i] / maxRevenue) * 100;
              return (
                <div key={month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[9px] font-semibold text-zinc-400">
                    {formatMoney(mockMonthlyRevenue[i] / 1000, "USD").replace("$", "")}k
                  </span>
                  <div
                    className="w-full bg-black transition-all"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-zinc-500">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="border border-black/10 bg-white p-5">
          <h2 className="mb-5 text-sm font-semibold">Order Status Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(statusBreakdown).map(([status, count]) => {
              const pct = Math.round((count / orders.length) * 100);
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
        </div>

        {/* Revenue by category */}
        <div className="border border-black/10 bg-white p-5">
          <h2 className="mb-5 text-sm font-semibold">Revenue by Category</h2>
          <div className="space-y-4">
            {Object.entries(categoryRevenue)
              .sort(([, a], [, b]) => b - a)
              .map(([category, revenue]) => {
                const pct = Math.round((revenue / totalRevenue) * 100);
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
        </div>

        {/* Top products by revenue */}
        <div className="border border-black/10 bg-white p-5">
          <h2 className="mb-5 text-sm font-semibold">Top Products by Revenue</h2>
          <div className="space-y-3">
            {products
              .filter((p) => p.isFeatured)
              .sort((a, b) => b.price - a.price)
              .slice(0, 6)
              .map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="w-5 text-[10px] font-bold text-zinc-300">0{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-medium">{p.title}</p>
                    <p className="text-[11px] text-zinc-400 capitalize">{p.category} · {p.brand}</p>
                  </div>
                  <span className="text-xs font-semibold">{formatMoney(p.price)}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
