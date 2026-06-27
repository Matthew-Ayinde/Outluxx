import { apiFetch } from "./client";
import type { Order, OrderStatus } from "@/types/commerce";

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export async function getOrders(opts: { status?: OrderStatus; page?: number; limit?: number } = {}): Promise<OrderListResponse> {
  const params = new URLSearchParams();
  if (opts.status) params.set("status", opts.status);
  if (opts.page) params.set("page", String(opts.page));
  if (opts.limit) params.set("limit", String(opts.limit));
  const qs = params.toString();
  return apiFetch(`/api/orders${qs ? `?${qs}` : ""}`, { cache: "no-store" });
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    return await apiFetch<Order>(`/api/orders/${id}`, { cache: "no-store" });
  } catch {
    return null;
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  return apiFetch(`/api/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}
