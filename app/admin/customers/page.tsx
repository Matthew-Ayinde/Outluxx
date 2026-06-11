import { customers } from "@/lib/data";
import { formatMoney } from "@/lib/utils/format";

export const metadata = { title: "Customers" };

export default function AdminCustomersPage() {
  const sortedCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="mt-1 text-sm text-zinc-500">{customers.length} registered customers</p>
        </div>
        <button className="border border-black/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors">
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by name or email…"
          className="w-64 border border-black/15 px-3 py-2 text-sm outline-none focus:border-black"
        />
      </div>

      <div className="border border-black/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-zinc-50">
                {["Customer", "Email", "Orders", "Total Spent", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {sortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-zinc-100 text-xs font-semibold text-zinc-600">
                        {customer.firstName[0]}{customer.lastName[0]}
                      </div>
                      <span className="font-medium">{customer.firstName} {customer.lastName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-zinc-500">{customer.email}</td>
                  <td className="px-5 py-3 text-zinc-600">{customer.orderCount}</td>
                  <td className="px-5 py-3 font-semibold">{formatMoney(customer.totalSpent)}</td>
                  <td className="px-5 py-3 text-zinc-500">
                    {new Date(customer.joinedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black">View</button>
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
