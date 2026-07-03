"use client";

import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

const STRIPE_DASHBOARD = "https://dashboard.stripe.com/test/payments";

const PAYMENT_STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-50 text-green-700",
  failed: "bg-red-50 text-red-600",
  pending: "bg-zinc-100 text-zinc-500",
  refunded: "bg-purple-50 text-purple-700",
};

const FILTERS = ["all", "paid", "failed", "pending", "refunded"] as const;
type Filter = (typeof FILTERS)[number];

interface Payment {
  _id: string;
  orderNumber: string;
  customerEmail: string;
  paymentStatus: string;
  status: string;
  stripePaymentIntentId?: string;
  stripeRefundId?: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  createdAt: string;
  shippingAddress: { firstName: string; lastName: string; city: string; country: string };
}

interface Stats {
  paid: { count: number; total: number };
  failed: { count: number; total: number };
  pending: { count: number; total: number };
  refunded: { count: number; total: number };
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [refundingId, setRefundingId] = useState<string | null>(null);
  const [detail, setDetail] = useState<Payment | null>(null);
  const [refundError, setRefundError] = useState("");

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (filter !== "all") params.set("paymentStatus", filter);
      const res = await fetch(`/api/payments?${params}`);
      const json = await res.json();
      setPayments(json.data?.payments ?? []);
      setTotal(json.data?.total ?? 0);
      setStats(json.data?.stats ?? null);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  async function issueRefund(payment: Payment) {
    if (!payment.stripePaymentIntentId) return;
    if (!confirm(`Refund ${formatMoney(payment.total)} to ${payment.customerEmail}?`)) return;

    setRefundingId(payment._id);
    setRefundError("");
    try {
      const res = await fetch(`/api/payments/${payment.stripePaymentIntentId}/refund`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setRefundError(json.error ?? "Refund failed.");
        return;
      }
      setPayments((prev) =>
        prev.map((p) =>
          p._id === payment._id
            ? { ...p, paymentStatus: "refunded", status: "returned", stripeRefundId: json.data?.refundId }
            : p
        )
      );
      if (detail?._id === payment._id) {
        setDetail((d) => d ? { ...d, paymentStatus: "refunded", status: "returned" } : d);
      }
    } finally {
      setRefundingId(null);
    }
  }

  const totalRevenue = stats?.paid.total ?? 0;
  const totalRefunded = stats?.refunded.total ?? 0;
  const netRevenue = totalRevenue - totalRefunded;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <p className="mt-1 text-sm text-zinc-500">All payment transactions powered by Stripe</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Net Revenue" value={formatMoney(netRevenue)} sub="Paid minus refunded" positive />
        <StatCard
          label="Paid"
          value={stats ? `${stats.paid.count}` : "—"}
          sub={stats ? formatMoney(stats.paid.total) : ""}
          positive
        />
        <StatCard
          label="Failed"
          value={stats ? `${stats.failed.count}` : "—"}
          sub={stats ? `${stats.pending.count} pending` : ""}
          positive={false}
        />
        <StatCard
          label="Refunded"
          value={stats ? `${stats.refunded.count}` : "—"}
          sub={stats ? formatMoney(stats.refunded.total) : ""}
          positive={false}
        />
      </div>

      {refundError && (
        <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{refundError}</div>
      )}

      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={[
              "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
              f === filter ? "bg-black text-white" : "border border-black/15 hover:border-black",
            ].join(" ")}
          >
            {f}
            {f !== "all" && stats && (
              <span className="ml-1.5 opacity-60">
                {stats[f as keyof Stats]?.count ?? 0}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-black/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-zinc-50">
                {["Order #", "Date", "Customer", "Stripe PI", "Status", "Amount", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-zinc-400">Loading…</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-zinc-400">No payments found</td></tr>
              ) : payments.map((p) => (
                <tr key={p._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3 font-semibold">{p.orderNumber}</td>
                  <td className="px-5 py-3 text-zinc-500 whitespace-nowrap">
                    {new Date(p.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{p.shippingAddress.firstName} {p.shippingAddress.lastName}</p>
                    <p className="text-xs text-zinc-400">{p.customerEmail}</p>
                  </td>
                  <td className="px-5 py-3">
                    {p.stripePaymentIntentId ? (
                      <a
                        href={`${STRIPE_DASHBOARD}/${p.stripePaymentIntentId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-zinc-400 hover:text-black underline underline-offset-2 transition-colors"
                        title={p.stripePaymentIntentId}
                      >
                        {p.stripePaymentIntentId.slice(0, 18)}…
                      </a>
                    ) : (
                      <span className="text-xs text-zinc-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase ${PAYMENT_STATUS_STYLES[p.paymentStatus] ?? PAYMENT_STATUS_STYLES.pending}`}>
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold">{formatMoney(p.total)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setDetail(p)}
                        className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black transition-colors"
                      >
                        View
                      </button>
                      {p.paymentStatus === "paid" && p.stripePaymentIntentId && (
                        <button
                          onClick={() => issueRefund(p)}
                          disabled={refundingId === p._id}
                          className="text-xs text-red-500 underline underline-offset-2 hover:text-red-700 transition-colors disabled:opacity-40"
                        >
                          {refundingId === p._id ? "Refunding…" : "Refund"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > payments.length && (
          <div className="border-t border-black/5 px-5 py-3 text-xs text-zinc-400">
            Showing {payments.length} of {total} payments
          </div>
        )}
      </div>

      {/* Detail panel */}
      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-end bg-black/30"
          onClick={() => setDetail(null)}
        >
          <div
            className="h-full w-full max-w-md overflow-y-auto bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-black/10 bg-white px-6 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest">{detail.orderNumber}</h2>
              <button onClick={() => setDetail(null)} className="text-zinc-400 hover:text-black">✕</button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase ${PAYMENT_STATUS_STYLES[detail.paymentStatus] ?? PAYMENT_STATUS_STYLES.pending}`}>
                  {detail.paymentStatus}
                </span>
                <span className="text-xs text-zinc-400">Order status: {detail.status}</span>
              </div>

              {/* Customer */}
              <div>
                <Label>Customer</Label>
                <p>{detail.shippingAddress.firstName} {detail.shippingAddress.lastName}</p>
                <p className="text-zinc-500">{detail.customerEmail}</p>
                <p className="text-zinc-400 text-xs mt-1">{detail.shippingAddress.city}, {detail.shippingAddress.country}</p>
              </div>

              {/* Stripe info */}
              <div>
                <Label>Stripe Payment Intent</Label>
                {detail.stripePaymentIntentId ? (
                  <>
                    <p className="font-mono text-xs text-zinc-600 break-all">{detail.stripePaymentIntentId}</p>
                    <a
                      href={`${STRIPE_DASHBOARD}/${detail.stripePaymentIntentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-zinc-400 underline hover:text-black transition-colors"
                    >
                      View in Stripe Dashboard ↗
                    </a>
                  </>
                ) : (
                  <p className="text-zinc-400">No Stripe ID (simulation)</p>
                )}
              </div>

              {detail.stripeRefundId && (
                <div>
                  <Label>Stripe Refund ID</Label>
                  <p className="font-mono text-xs text-zinc-600 break-all">{detail.stripeRefundId}</p>
                </div>
              )}

              {/* Amount breakdown */}
              <div>
                <Label>Amount Breakdown</Label>
                <div className="space-y-1.5 text-sm">
                  <Row label="Subtotal" value={formatMoney(detail.subtotal)} />
                  {detail.discount > 0 && (
                    <Row label="Discount" value={`–${formatMoney(detail.discount)}`} className="text-red-600" />
                  )}
                  <Row label="Shipping" value={detail.shipping === 0 ? "Free" : formatMoney(detail.shipping)} />
                  <div className="border-t border-black/10 pt-2">
                    <Row label="Total" value={formatMoney(detail.total)} bold />
                  </div>
                </div>
              </div>

              {/* Date */}
              <div>
                <Label>Date</Label>
                <p>{new Date(detail.createdAt).toLocaleString("en-GB", {
                  day: "numeric", month: "long", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}</p>
              </div>

              {/* Refund action */}
              {detail.paymentStatus === "paid" && detail.stripePaymentIntentId && (
                <div className="border-t border-black/10 pt-4">
                  <button
                    onClick={() => issueRefund(detail)}
                    disabled={refundingId === detail._id}
                    className="flex h-10 w-full items-center justify-center border border-red-300 text-xs font-semibold uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                  >
                    {refundingId === detail._id ? "Processing Refund…" : `Refund ${formatMoney(detail.total)}`}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-zinc-400">
                    Full refund via Stripe · Cannot be undone
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sub, positive }: { label: string; value: string; sub: string; positive: boolean }) {
  return (
    <div className="border border-black/10 bg-white p-5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className={`mt-1 text-xs ${positive ? "text-green-600" : "text-zinc-400"}`}>{sub}</p>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{children}</p>;
}

function Row({ label, value, bold, className }: { label: string; value: string; bold?: boolean; className?: string }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold" : "text-zinc-600"} ${className ?? ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
