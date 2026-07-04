import { getTransporter } from "./transporter";
import { formatMoney } from "@/lib/utils/format";
import type { IOrder } from "@/lib/db/models/Order";

const FROM = process.env.EMAIL_FROM || process.env.SMTP_USER || "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@outluxx.com";

function itemsTable(order: IOrder) {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0; border-bottom:1px solid #eee;">
            ${item.productTitle}<br/>
            <span style="color:#888; font-size:12px;">${item.selectedSize} · ${item.selectedColor} · Qty ${item.quantity}</span>
          </td>
          <td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">
            ${formatMoney(item.price * item.quantity)}
          </td>
        </tr>`
    )
    .join("");

  return `<table style="width:100%; border-collapse:collapse; margin:16px 0;">${rows}</table>`;
}

export async function sendOrderConfirmationEmail(order: IOrder) {
  const html = `
    <div style="font-family:sans-serif; max-width:560px; margin:0 auto; color:#18181b;">
      <h1 style="font-size:20px;">Thank you for your order, ${order.shippingAddress.firstName}!</h1>
      <p>Your order <strong>${order.orderNumber}</strong> has been confirmed and is being processed.</p>
      ${itemsTable(order)}
      <p style="text-align:right; font-weight:600;">Total: ${formatMoney(order.total)}</p>
      <p style="color:#555;">
        Shipping to: ${order.shippingAddress.line1}, ${order.shippingAddress.city}, ${order.shippingAddress.country}
      </p>
      <p style="color:#888; font-size:13px;">We'll email you again once your order ships.</p>
    </div>
  `;

  await getTransporter().sendMail({
    from: FROM,
    to: order.customerEmail,
    subject: `Order Confirmed — ${order.orderNumber}`,
    html,
  });
}

export async function sendAdminOrderNotification(order: IOrder) {
  const html = `
    <div style="font-family:sans-serif; max-width:560px; margin:0 auto; color:#18181b;">
      <h1 style="font-size:20px;">New order placed — ${order.orderNumber}</h1>
      <p>Customer: ${order.customerEmail}</p>
      ${itemsTable(order)}
      <p style="text-align:right; font-weight:600;">Total: ${formatMoney(order.total)}</p>
      <p style="color:#555;">
        Ship to: ${order.shippingAddress.firstName} ${order.shippingAddress.lastName},
        ${order.shippingAddress.line1}, ${order.shippingAddress.city}, ${order.shippingAddress.country}
      </p>
    </div>
  `;

  await getTransporter().sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Order — ${order.orderNumber} (${formatMoney(order.total)})`,
    html,
  });
}
