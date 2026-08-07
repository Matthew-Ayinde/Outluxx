import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getSession } from "@/lib/utils/auth";
import { getCustomerOrder } from "@/lib/data/server";
import { formatMoney } from "@/lib/utils/format";
import OrderStatusBadge from "@/components/account/OrderStatusBadge";

type Props = { params: Promise<{ orderId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderId } = await params;
  const session = await getSession();
  if (!session) return {};
  const order = await getCustomerOrder(session.sub, orderId);
  if (!order) return {};
  return { title: `Order ${order.orderNumber}` };
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderId } = await params;
  const session = await getSession();
  if (!session) redirect(`/account/sign-in?redirect=/account/orders/${orderId}`);

  const order = await getCustomerOrder(session.sub, orderId);
  if (!order) notFound();

  const paymentLabel: Record<string, string> = {
    paid: "Paid",
    pending: "Payment pending",
    failed: "Payment failed",
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
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items */}
      <div className="mb-6 border border-black/10 dark:border-white/10">
        <div className="border-b border-black/10 px-5 py-3 dark:border-white/10">
          <h3 className="text-xs font-semibold uppercase tracking-widest">Items</h3>
        </div>
        <div className="divide-y divide-black/5 dark:divide-white/10">
          {order.items.map((item, i) => (
            <div key={`${item.productId}-${i}`} className="flex gap-4 px-5 py-4">
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
        <div className="border border-black/10 p-5 dark:border-white/10">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest">Shipping Address</h3>
          <div className="text-sm text-zinc-600">
            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
          <p className="mt-3 text-xs text-zinc-400 capitalize">{order.deliveryMethod} delivery</p>
        </div>
        <div className="border border-black/10 p-5 dark:border-white/10">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest">Payment</h3>
          <p className="text-sm text-zinc-600">{paymentLabel[order.paymentStatus] ?? order.paymentStatus}</p>
          {order.paymentStatus === "paid" && (
            <p className="mt-1 text-xs text-zinc-400">
              Charged on {new Date(order.placedAt).toLocaleDateString("en-GB")}
            </p>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="border border-black/10 p-5 dark:border-white/10">
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
          <div className="flex justify-between border-t border-black/10 pt-3 font-semibold dark:border-white/10">
            <span>Total</span><span>{formatMoney(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
