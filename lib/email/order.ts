import path from "path";
import { getTransporter } from "./transporter";
import { formatMoney } from "@/lib/utils/format";
import type { IOrder } from "@/lib/db/models/Order";
import { emailLayout, itemsTable, totalsBlock, addressBlock, button, LOGO_CID } from "./templates";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const FROM = process.env.EMAIL_FROM || process.env.SMTP_USER || "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "support@outlxx.co.uk";

const LOGO_ATTACHMENT = {
  filename: "black-logo.png",
  path: path.join(process.cwd(), "public", "black-logo.png"),
  cid: LOGO_CID,
};

export async function sendOrderConfirmationEmail(order: IOrder) {
  const body = `
    <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#52525b;">
      Hi ${order.shippingAddress.firstName}, thank you for shopping with us. Your order
      <strong style="color:#18181b;">${order.orderNumber}</strong> has been confirmed and is now being
      processed. We'll send another email as soon as it ships.
    </p>

    ${itemsTable(order)}
    ${totalsBlock(order)}

    <div style="height:24px;"></div>
    ${addressBlock(order)}

    <div style="height:32px;"></div>
    ${button("Track Your Order", `${APP_URL}/account/orders`)}
  `;

  const html = emailLayout({
    preheader: `Your order ${order.orderNumber} is confirmed — total ${formatMoney(order.total)}`,
    eyebrow: "Order Confirmed",
    heading: "Thank you for your order",
    body,
  });

  await getTransporter().sendMail({
    from: FROM,
    to: order.customerEmail,
    subject: `Order Confirmed — ${order.orderNumber}`,
    html,
    attachments: [LOGO_ATTACHMENT],
  });
}

export async function sendAdminOrderNotification(order: IOrder) {
  const customerCard = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:1px solid #e4e4e7; margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:11px; text-transform:uppercase; letter-spacing:.1em; color:#71717a; padding-bottom:2px;">Customer</td>
              <td style="font-size:11px; text-transform:uppercase; letter-spacing:.1em; color:#71717a; padding-bottom:2px; text-align:right;">Order Total</td>
            </tr>
            <tr>
              <td style="font-size:14px; font-weight:600; color:#18181b;">${order.customerEmail}</td>
              <td style="font-size:14px; font-weight:600; color:#18181b; text-align:right;">${formatMoney(order.total)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const body = `
    <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#52525b;">
      A new order has been placed and payment has been captured.
    </p>

    ${customerCard}
    ${itemsTable(order)}
    ${totalsBlock(order)}

    <div style="height:24px;"></div>
    ${addressBlock(order)}

    <div style="height:32px;"></div>
    ${button("View Orders", `${APP_URL}/admin/orders`)}
  `;

  const html = emailLayout({
    preheader: `New order ${order.orderNumber} from ${order.customerEmail} — ${formatMoney(order.total)}`,
    eyebrow: "New Order",
    heading: `Order ${order.orderNumber}`,
    body,
  });

  await getTransporter().sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Order — ${order.orderNumber} (${formatMoney(order.total)})`,
    html,
    attachments: [LOGO_ATTACHMENT],
  });
}
