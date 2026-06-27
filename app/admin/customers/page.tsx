"use client";

import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (search) params.set("search", search);
      const res = await fetch(`/api/customers?${params}`);
      const json = await res.json();
      setCustomers(json.data?.customers ?? []);
      setTotal(json.data?.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remove customer "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/customers/${id}`, { method: "DELETE" });
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      setTotal((t) => t - 1);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="mt-1 text-sm text-zinc-500">{total} registered customers</p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 border border-black/15 px-3 py-2 text-sm outline-none focus:border-black"
        />
      </div>

      <div className="border border-black/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-zinc-50">
                {["Customer", "Email", "Orders", "Total Spent", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-zinc-400">Loading…</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-zinc-400">No customers found</td></tr>
              ) : customers.map((customer) => (
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
                    {new Date(customer.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleDelete(customer.id, `${customer.firstName} ${customer.lastName}`)}
                      disabled={deleting === customer.id}
                      className="text-xs text-red-400 underline underline-offset-2 hover:text-red-600 disabled:opacity-50"
                    >
                      {deleting === customer.id ? "…" : "Remove"}
                    </button>
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
