"use client";

import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";
import { IconEye, IconClose, IconReceipt } from "@/components/admin/icons";
import { ORDER_STATUS_TONES, Panel, SectionHeader, StatusBadge, TONE_CLASSES, FilterTab, IconButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const STATUSES = ["All", "pending", "processing", "shipped", "delivered", "cancelled", "returned"];

interface Order {
  _id: string;
  orderNumber: string;
  customerEmail: string;
  status: string;
  paymentStatus: string;
  currency: "GBP" | "NGN";
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
      <SectionHeader title="Orders" subtitle={`${total} total orders`} icon={<IconReceipt className="h-5 w-5" />} accent="emerald" />

      {/* Status filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <FilterTab key={s} label={s} active={s === activeStatus} onClick={() => setActiveStatus(s)} />
        ))}
      </div>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/60">
                {["Order #", "Date", "Customer", "Items", "Status", "Payment", "Total", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-zinc-400">Loading…</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-zinc-400">No orders found</td></tr>
              ) : orders.map((order) => (
                <tr key={order._id} className="transition-colors hover:bg-zinc-50/80">
                  <td className="px-5 py-3 font-semibold">{order.orderNumber}</td>
                  <td className="px-5 py-3 text-zinc-500">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p className="text-xs text-zinc-400">{order.customerEmail}</p>
                  </td>
                  <td className="px-5 py-3 text-zinc-500">{(order.items as unknown[]).length}</td>
                  <td className="px-5 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase cursor-pointer outline-none border-0 disabled:opacity-50 ${TONE_CLASSES[ORDER_STATUS_TONES[order.status] ?? "neutral"]}`}
                    >
                      {STATUSES.filter((s) => s !== "All").map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge
                      label={order.paymentStatus}
                      tone={order.paymentStatus === "paid" ? "success" : order.paymentStatus === "failed" ? "danger" : "neutral"}
                    />
                  </td>
                  <td className="px-5 py-3 font-semibold">{formatMoney(order.total, order.currency)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setDetailOrder(order)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <IconEye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Detail panel */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/40" onClick={() => setDetailOrder(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between border-b border-zinc-100 bg-white px-6 py-4">
              <h2 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <IconReceipt className="h-4 w-4" />
                </span>
                {detailOrder.orderNumber}
              </h2>
              <IconButton icon={<IconClose className="h-4 w-4" />} label="Close" onClick={() => setDetailOrder(null)} />
            </div>
            <div className="p-6 space-y-6 text-sm">
              <div className="flex items-center gap-2">
                <StatusBadge label={detailOrder.status} tone={ORDER_STATUS_TONES[detailOrder.status] ?? "neutral"} />
                <StatusBadge
                  label={detailOrder.paymentStatus}
                  tone={detailOrder.paymentStatus === "paid" ? "success" : detailOrder.paymentStatus === "failed" ? "danger" : "neutral"}
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">Customer</p>
                <p>{detailOrder.shippingAddress.firstName} {detailOrder.shippingAddress.lastName}</p>
                <p className="text-zinc-500">{detailOrder.customerEmail}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">Shipping Address</p>
                <p>{detailOrder.shippingAddress.city}, {detailOrder.shippingAddress.country}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Items ({(detailOrder.items as unknown[]).length})</p>
                <div className="space-y-2">
                  {(detailOrder.items as Array<{ productTitle: string; quantity: number; selectedSize: string; selectedColor: string; price: number }>).map((item, i) => (
                    <div key={i} className="flex justify-between rounded-xl bg-zinc-50 p-3">
                      <div>
                        <p className="font-medium text-xs">{item.productTitle}</p>
                        <p className="text-[11px] text-zinc-400">{item.selectedSize} · {item.selectedColor} · ×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold">{formatMoney(item.price * item.quantity, detailOrder.currency)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-zinc-100 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatMoney(detailOrder.total, detailOrder.currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
