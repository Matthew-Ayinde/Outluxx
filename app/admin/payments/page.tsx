"use client";

import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";
import { IconCard, IconEye, IconExternalLink, IconClose, IconCheckCircle, IconAlertTriangle, IconRefresh } from "@/components/admin/icons";
import { IconButton, PAYMENT_STATUS_TONES, Panel, SectionHeader, StatCard, StatusBadge, FilterTab, Button } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const STRIPE_DASHBOARD = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_live_")
  ? "https://dashboard.stripe.com/payments"
  : "https://dashboard.stripe.com/test/payments";

const PAYSTACK_DASHBOARD = "https://dashboard.paystack.com/#/transactions";

const FILTERS = ["all", "paid", "failed", "pending", "refunded"] as const;
type Filter = (typeof FILTERS)[number];

interface Payment {
  _id: string;
  orderNumber: string;
  customerEmail: string;
  paymentStatus: string;
  status: string;
  currency: "GBP" | "NGN";
  paymentProvider: "stripe" | "paystack";
  stripePaymentIntentId?: string;
  stripeRefundId?: string;
  paystackReference?: string;
  paystackRefundReference?: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  createdAt: string;
  shippingAddress: { firstName: string; lastName: string; city: string; country: string };
}

function reference(p: Payment): string | undefined {
  return p.paymentProvider === "paystack" ? p.paystackReference : p.stripePaymentIntentId;
}

function dashboardUrl(p: Payment): string | undefined {
  const ref = reference(p);
  if (!ref) return undefined;
  return p.paymentProvider === "paystack"
    ? `${PAYSTACK_DASHBOARD}?ref=${encodeURIComponent(ref)}`
    : `${STRIPE_DASHBOARD}/${ref}`;
}

interface CurrencyStats {
  paid: { count: number; total: number };
  failed: { count: number; total: number };
  pending: { count: number; total: number };
  refunded: { count: number; total: number };
}

type Stats = Record<"GBP" | "NGN", CurrencyStats>;

const EMPTY_CURRENCY_STATS: CurrencyStats = {
  paid: { count: 0, total: 0 },
  failed: { count: 0, total: 0 },
  pending: { count: 0, total: 0 },
  refunded: { count: 0, total: 0 },
};

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
    const ref = reference(payment);
    if (!ref) return;
    if (!confirm(`Refund ${formatMoney(payment.total, payment.currency)} to ${payment.customerEmail}?`)) return;

    setRefundingId(payment._id);
    setRefundError("");
    try {
      const res = await fetch(`/api/payments/${ref}/refund`, { method: "POST" });
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

  // GBP and NGN totals are never summed together — a £ + ₦ figure would be
  // meaningless — so each currency gets its own stat row.
  function statRow(currency: "GBP" | "NGN", label: string) {
    const s = stats?.[currency] ?? EMPTY_CURRENCY_STATS;
    const netRevenue = s.paid.total - s.refunded.total;
    return (
      <div key={currency} className="mb-6">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{label}</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Net Revenue" value={formatMoney(netRevenue, currency)} sub="Paid minus refunded" trend="up" icon={<IconCard className="h-4 w-4" />} accent="emerald" />
          <StatCard
            label="Paid"
            value={stats ? `${s.paid.count}` : "—"}
            sub={stats ? formatMoney(s.paid.total, currency) : undefined}
            trend="up"
            icon={<IconCheckCircle className="h-4 w-4" />}
            accent="blue"
          />
          <StatCard
            label="Failed"
            value={stats ? `${s.failed.count}` : "—"}
            sub={stats ? `${s.pending.count} pending` : undefined}
            trend="down"
            icon={<IconAlertTriangle className="h-4 w-4" />}
            accent="rose"
          />
          <StatCard
            label="Refunded"
            value={stats ? `${s.refunded.count}` : "—"}
            sub={stats ? formatMoney(s.refunded.total, currency) : undefined}
            trend="flat"
            icon={<IconRefresh className="h-4 w-4" />}
            accent="teal"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader title="Payments" subtitle="All payment transactions — GBP via Stripe, NGN via Paystack" icon={<IconCard className="h-5 w-5" />} accent="teal" />

      {/* Stats */}
      {statRow("GBP", "GBP · Stripe")}
      {statRow("NGN", "NGN · Paystack")}

      {refundError && (
        <div className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-200">{refundError}</div>
      )}

      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <FilterTab
            key={f}
            label={f}
            active={f === filter}
            onClick={() => setFilter(f)}
            count={f !== "all" && stats ? (stats.GBP[f].count + stats.NGN[f].count) : undefined}
          />
        ))}
      </div>

      {/* Table */}
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/60">
                {["Order #", "Date", "Customer", "Provider Ref", "Status", "Amount", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-zinc-400">Loading…</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-zinc-400">No payments found</td></tr>
              ) : payments.map((p) => (
                <tr key={p._id} className="transition-colors hover:bg-zinc-50/80">
                  <td className="px-5 py-3 font-semibold">{p.orderNumber}</td>
                  <td className="px-5 py-3 text-zinc-500 whitespace-nowrap">
                    {new Date(p.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{p.shippingAddress.firstName} {p.shippingAddress.lastName}</p>
                    <p className="text-xs text-zinc-400">{p.customerEmail}</p>
                  </td>
                  <td className="px-5 py-3">
                    {reference(p) ? (
                      <a
                        href={dashboardUrl(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-teal-600 transition-colors"
                        title={reference(p)}
                      >
                        <span className="uppercase text-[9px] font-sans font-semibold tracking-wide text-zinc-300">{p.paymentProvider}</span>
                        {reference(p)!.slice(0, 14)}… <IconExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-zinc-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge label={p.paymentStatus} tone={PAYMENT_STATUS_TONES[p.paymentStatus] ?? "neutral"} />
                  </td>
                  <td className="px-5 py-3 font-semibold">{formatMoney(p.total, p.currency)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <IconButton icon={<IconEye className="h-3.5 w-3.5" />} label="View payment" onClick={() => setDetail(p)} />
                      {p.paymentStatus === "paid" && reference(p) && (
                        <button
                          onClick={() => issueRefund(p)}
                          disabled={refundingId === p._id}
                          className="rounded-lg px-2 py-1 text-xs font-medium text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors disabled:opacity-40"
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
          <div className="border-t border-zinc-100 px-5 py-3 text-xs text-zinc-400">
            Showing {payments.length} of {total} payments
          </div>
        )}
      </Panel>

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
            <div className="sticky top-0 flex items-center justify-between border-b border-zinc-100 bg-white px-6 py-4">
              <h2 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <IconCard className="h-4 w-4" />
                </span>
                {detail.orderNumber}
              </h2>
              <IconButton icon={<IconClose className="h-4 w-4" />} label="Close" onClick={() => setDetail(null)} />
            </div>

            <div className="p-6 space-y-6 text-sm">
              {/* Status */}
              <div className="flex items-center gap-3">
                <StatusBadge label={detail.paymentStatus} tone={PAYMENT_STATUS_TONES[detail.paymentStatus] ?? "neutral"} />
                <span className="text-xs text-zinc-400">Order status: {detail.status}</span>
              </div>

              {/* Customer */}
              <div>
                <Label>Customer</Label>
                <p>{detail.shippingAddress.firstName} {detail.shippingAddress.lastName}</p>
                <p className="text-zinc-500">{detail.customerEmail}</p>
                <p className="text-zinc-400 text-xs mt-1">{detail.shippingAddress.city}, {detail.shippingAddress.country}</p>
              </div>

              {/* Provider info */}
              <div>
                <Label>{detail.paymentProvider === "paystack" ? "Paystack Reference" : "Stripe Payment Intent"}</Label>
                {reference(detail) ? (
                  <>
                    <p className="font-mono text-xs text-zinc-600 break-all">{reference(detail)}</p>
                    <a
                      href={dashboardUrl(detail)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      View in {detail.paymentProvider === "paystack" ? "Paystack" : "Stripe"} Dashboard <IconExternalLink className="h-3 w-3" />
                    </a>
                  </>
                ) : (
                  <p className="text-zinc-400">No reference (simulation)</p>
                )}
              </div>

              {(detail.stripeRefundId || detail.paystackRefundReference) && (
                <div>
                  <Label>{detail.paymentProvider === "paystack" ? "Paystack Refund ID" : "Stripe Refund ID"}</Label>
                  <p className="font-mono text-xs text-zinc-600 break-all">{detail.stripeRefundId || detail.paystackRefundReference}</p>
                </div>
              )}

              {/* Amount breakdown */}
              <div>
                <Label>Amount Breakdown</Label>
                <div className="space-y-1.5 text-sm">
                  <Row label="Subtotal" value={formatMoney(detail.subtotal, detail.currency)} />
                  {detail.discount > 0 && (
                    <Row label="Discount" value={`–${formatMoney(detail.discount, detail.currency)}`} className="text-rose-600" />
                  )}
                  <Row label="Shipping" value={detail.shipping === 0 ? "Free" : formatMoney(detail.shipping, detail.currency)} />
                  <div className="border-t border-zinc-100 pt-2">
                    <Row label="Total" value={formatMoney(detail.total, detail.currency)} bold />
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
              {detail.paymentStatus === "paid" && reference(detail) && (
                <div className="border-t border-zinc-100 pt-4">
                  <Button
                    variant="danger-outline"
                    className="h-11 w-full"
                    disabled={refundingId === detail._id}
                    onClick={() => issueRefund(detail)}
                  >
                    {refundingId === detail._id ? "Processing Refund…" : `Refund ${formatMoney(detail.total, detail.currency)}`}
                  </Button>
                  <p className="mt-2 text-center text-[11px] text-zinc-400">
                    Full refund via {detail.paymentProvider === "paystack" ? "Paystack" : "Stripe"} · Cannot be undone
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
