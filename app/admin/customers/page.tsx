"use client";

import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";
import { IconSearch, IconTrash, IconUsers } from "@/components/admin/icons";
import { IconButton, Panel, SectionHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const AVATAR_TONES = [
  "bg-blue-50 text-blue-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-50 text-rose-700",
  "bg-teal-50 text-teal-700",
  "bg-sky-50 text-sky-700",
];

function avatarTone(seed: string) {
  const code = seed.charCodeAt(0) || 0;
  return AVATAR_TONES[code % AVATAR_TONES.length];
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  orderCount: number;
  totalSpentGBP: number;
  totalSpentNGN: number;
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
      <SectionHeader title="Customers" subtitle={`${total} registered customers`} icon={<IconUsers className="h-5 w-5" />} accent="sky" />

      <div className="mb-4">
        <div className="relative w-64">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/60">
                {["Customer", "Email", "Orders", "Total Spent", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-zinc-400">Loading…</td></tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-zinc-400">
                    <div className="flex flex-col items-center gap-2">
                      <IconUsers className="h-5 w-5 text-zinc-300" />
                      No customers found
                    </div>
                  </td>
                </tr>
              ) : customers.map((customer) => (
                <tr key={customer.id} className="transition-colors hover:bg-zinc-50/80">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarTone(customer.firstName)}`}>
                        {customer.firstName[0]}{customer.lastName[0]}
                      </div>
                      <span className="font-medium">{customer.firstName} {customer.lastName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-zinc-500">{customer.email}</td>
                  <td className="px-5 py-3 text-zinc-600">{customer.orderCount}</td>
                  <td className="px-5 py-3 font-semibold">
                    <div>{formatMoney(customer.totalSpentGBP, "GBP")}</div>
                    {customer.totalSpentNGN > 0 && (
                      <div className="text-xs font-normal text-zinc-400">+ {formatMoney(customer.totalSpentNGN, "NGN")}</div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-zinc-500">
                    {new Date(customer.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <IconButton
                      icon={<IconTrash className="h-3.5 w-3.5" />}
                      label="Remove customer"
                      tone="danger"
                      disabled={deleting === customer.id}
                      onClick={() => handleDelete(customer.id, `${customer.firstName} ${customer.lastName}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
