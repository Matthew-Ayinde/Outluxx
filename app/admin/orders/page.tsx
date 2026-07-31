"use client";

import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";
import {
  ShoppingBag,
  Eye,
  X,
  User,
  MapPin,
  Package,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  shipped: "bg-sky-500/10 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
  processing: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  pending: "bg-surface text-muted",
  cancelled: "bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  returned: "bg-surface text-muted",
};

const PAYMENT_STYLES: Record<string, { classes: string; icon: React.ElementType }> = {
  paid: { classes: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400", icon: CheckCircle2 },
  failed: { classes: "bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400", icon: XCircle },
  pending: { classes: "bg-surface text-muted", icon: Clock },
};

const STATUSES = ["All", "pending", "processing", "shipped", "delivered", "cancelled", "returned"];

interface Order {
  _id: string;
  orderNumber: string;
  customerEmail: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: unknown[];
  shippingAddress: { firstName: string; lastName: string; city: string; country: string };
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (activeStatus !== "All") params.set("status", activeStatus);
      const res = await fetch(`/api/orders?${params}`);
      const json = await res.json();
      setOrders(json.data?.orders ?? []);
      setTotal(json.data?.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [activeStatus]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  async function updateStatus(orderId: string, status: string) {
    setUpdatingId(orderId);
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status } : o));
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
            <ShoppingBag size={18} strokeWidth={1.75} />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-light">Orders</h1>
            <p className="mt-1 text-sm text-muted">{total} total orders</p>
          </div>
        </div>
      </div>

      {/* Status filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            className={[
              "rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors",
              s === activeStatus
                ? "border border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-400"
                : "border border-hairline hover:border-foreground",
            ].join(" ")}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["Order #", "Date", "Customer", "Items", "Status", "Payment", "Total", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-medium uppercase tracking-[0.28em] text-faint">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-faint">Loading…</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-faint">No orders found</td></tr>
              ) : orders.map((order) => {
                const payment = PAYMENT_STYLES[order.paymentStatus] ?? PAYMENT_STYLES.pending;
                const PaymentIcon = payment.icon;
                return (
                  <tr key={order._id} className="hover:bg-surface transition-colors">
                    <td className="px-5 py-3 font-medium">{order.orderNumber}</td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                      <p className="text-xs text-faint">{order.customerEmail}</p>
                    </td>
                    <td className="px-5 py-3 text-muted">{(order.items as unknown[]).length}</td>
                    <td className="px-5 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        disabled={updatingId === order._id}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase cursor-pointer border-0 outline-none ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}
                      >
                        {STATUSES.filter((s) => s !== "All").map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${payment.classes}`}>
                        <PaymentIcon size={11} strokeWidth={2} />
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium">{formatMoney(order.total)}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => setDetailOrder(order)}
                        className="flex items-center gap-1 text-xs text-faint hover:text-sky-600 dark:hover:text-sky-400"
                      ><Eye size={13} strokeWidth={1.75} /> View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-foreground/30" onClick={() => setDetailOrder(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-background shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background px-6 py-4">
              <h2 className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground">
                <ShoppingBag size={14} strokeWidth={1.75} className="text-sky-500" />
                {detailOrder.orderNumber}
              </h2>
              <button onClick={() => setDetailOrder(null)} className="text-faint hover:text-foreground"><X size={16} strokeWidth={1.75} /></button>
            </div>
            <div className="p-6 space-y-6 text-sm">
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-faint">
                  <User size={12} strokeWidth={1.75} /> Customer
                </p>
                <p>{detailOrder.shippingAddress.firstName} {detailOrder.shippingAddress.lastName}</p>
                <p className="text-muted">{detailOrder.customerEmail}</p>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-faint">
                  <MapPin size={12} strokeWidth={1.75} /> Shipping Address
                </p>
                <p>{detailOrder.shippingAddress.city}, {detailOrder.shippingAddress.country}</p>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-faint">
                  <Package size={12} strokeWidth={1.75} /> Items ({(detailOrder.items as unknown[]).length})
                </p>
                <div className="space-y-2">
                  {(detailOrder.items as Array<{ productTitle: string; quantity: number; selectedSize: string; selectedColor: string; price: number }>).map((item, i) => (
                    <div key={i} className="flex justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="font-medium text-xs">{item.productTitle}</p>
                        <p className="text-[11px] text-faint">{item.selectedSize} · {item.selectedColor} · ×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-medium">{formatMoney(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatMoney(detailOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
