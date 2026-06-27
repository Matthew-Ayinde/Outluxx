"use client";

import { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  shipped: "bg-blue-50 text-blue-700",
  processing: "bg-yellow-50 text-yellow-700",
  pending: "bg-zinc-100 text-zinc-600",
  cancelled: "bg-red-50 text-red-700",
  returned: "bg-purple-50 text-purple-700",
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
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="mt-1 text-sm text-zinc-500">{total} total orders</p>
        </div>
      </div>

      {/* Status filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            className={[
              "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
              s === activeStatus ? "bg-black text-white" : "border border-black/15 hover:border-black",
            ].join(" ")}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="border border-black/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-zinc-50">
                {["Order #", "Date", "Customer", "Items", "Status", "Payment", "Total", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-zinc-400">Loading…</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-zinc-400">No orders found</td></tr>
              ) : orders.map((order) => (
                <tr key={order._id} className="hover:bg-zinc-50 transition-colors">
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
                      className={`px-2.5 py-1 text-[10px] font-semibold uppercase cursor-pointer border-0 outline-none ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}
                    >
                      {STATUSES.filter((s) => s !== "All").map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold uppercase ${order.paymentStatus === "paid" ? "text-green-600" : order.paymentStatus === "failed" ? "text-red-500" : "text-zinc-400"}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold">{formatMoney(order.total)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setDetailOrder(order)}
                      className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black"
                    >View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30" onClick={() => setDetailOrder(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between border-b border-black/10 bg-white px-6 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest">{detailOrder.orderNumber}</h2>
              <button onClick={() => setDetailOrder(null)} className="text-zinc-400 hover:text-black">✕</button>
            </div>
            <div className="p-6 space-y-6 text-sm">
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
                    <div key={i} className="flex justify-between border border-black/5 p-3">
                      <div>
                        <p className="font-medium text-xs">{item.productTitle}</p>
                        <p className="text-[11px] text-zinc-400">{item.selectedSize} · {item.selectedColor} · ×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold">{formatMoney(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-black/10 pt-4">
                <div className="flex justify-between font-semibold">
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
