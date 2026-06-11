import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { orders } from "@/lib/data";
import { formatMoney } from "@/lib/utils/format";

type Props = { params: Promise<{ orderId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderId } = await params;
  const order = orders.find((o) => o.id === orderId);
  if (!order) return {};
  return { title: `Order ${order.orderNumber}` };
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderId } = await params;
  const order = orders.find((o) => o.id === orderId);
  if (!order) notFound();

  const statusStyles: Record<string, string> = {
    delivered: "bg-green-50 text-green-700 border-green-200",
    shipped: "bg-blue-50 text-blue-700 border-blue-200",
    processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
    pending: "bg-zinc-50 text-zinc-600 border-zinc-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    returned: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Link href="/account/orders" className="mb-2 inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-black">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Orders
          </Link>
          <h2 className="text-2xl font-semibold">{order.orderNumber}</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Placed {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <span className={`border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest ${statusStyles[order.status] ?? statusStyles.pending}`}>
          {order.status}
        </span>
      </div>

      {/* Items */}
      <div className="mb-6 border border-black/10">
        <div className="border-b border-black/10 px-5 py-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest">Items</h3>
        </div>
        <div className="divide-y divide-black/5">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-4 px-5 py-4">
              <div className="relative h-20 w-14 shrink-0 overflow-hidden bg-zinc-50">
                <Image src={item.productImage} alt={item.productTitle} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex flex-1 items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium">{item.productTitle}</p>
                  <p className="mt-0.5 text-[11px] text-zinc-500">{item.productBrand}</p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">
                    {item.selectedSize} · {item.selectedColor} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatMoney(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column grid: shipping + payment */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="border border-black/10 p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest">Shipping Address</h3>
          <div className="text-sm text-zinc-600">
            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
        <div className="border border-black/10 p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest">Payment</h3>
          <p className="text-sm text-zinc-600">Visa ending in 4242</p>
          <p className="mt-1 text-xs text-zinc-400">Charged on {new Date(order.placedAt).toLocaleDateString("en-GB")}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="border border-black/10 p-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-zinc-500">
            <span>Subtotal</span><span>{formatMoney(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>Shipping</span><span>{order.shipping === 0 ? "Free" : formatMoney(order.shipping)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Discount</span><span>–{formatMoney(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-black/10 pt-3 font-semibold">
            <span>Total</span><span>{formatMoney(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
