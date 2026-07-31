"use client";

import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";
import { Users, Search, Trash2, Loader2, UserX } from "lucide-react";

export const dynamic = "force-dynamic";

const AVATAR_COLORS = [
  "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  "bg-violet-500/15 text-violet-700 dark:text-violet-400",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  "bg-rose-500/15 text-rose-700 dark:text-rose-400",
  "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
];

function avatarColor(name: string) {
  const sum = name.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

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
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
            <Users size={18} strokeWidth={1.75} />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-light">Customers</h1>
            <p className="mt-1 text-sm text-muted">{total} registered customers</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative w-64">
          <Search size={14} strokeWidth={1.75} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-hairline py-2 pl-9 pr-3 text-sm outline-none focus:border-foreground"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["Customer", "Email", "Orders", "Total Spent", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-medium uppercase tracking-[0.28em] text-faint">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-faint">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Loading…
                  </div>
                </td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-faint">
                  <div className="flex flex-col items-center gap-2">
                    <UserX size={24} strokeWidth={1.5} className="text-faint" />
                    No customers found
                  </div>
                </td></tr>
              ) : customers.map((customer) => {
                const fullName = `${customer.firstName} ${customer.lastName}`;
                return (
                  <tr key={customer.id} className="hover:bg-surface transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium ${avatarColor(fullName)}`}>
                          {customer.firstName[0]}{customer.lastName[0]}
                        </div>
                        <span className="font-medium">{fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted">{customer.email}</td>
                    <td className="px-5 py-3 text-muted">{customer.orderCount}</td>
                    <td className="px-5 py-3 font-medium">{formatMoney(customer.totalSpent)}</td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(customer.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleDelete(customer.id, fullName)}
                        disabled={deleting === customer.id}
                        className="flex items-center gap-1 text-xs text-faint hover:text-red-600 disabled:opacity-50"
                      >
                        {deleting === customer.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} strokeWidth={1.75} />}
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
