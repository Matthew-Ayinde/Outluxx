import { formatMoney } from "@/lib/utils/format";
import type { IOrder } from "@/lib/db/models/Order";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const LOGO_CID = "outlxx-logo";

const COLORS = {
  ink: "#18181b",
  body: "#52525b",
  muted: "#71717a",
  faint: "#a1a1aa",
  border: "#e4e4e7",
  divider: "#f4f4f5",
  paper: "#ffffff",
};

function money(value: number, currency: string) {
  return formatMoney(value, currency);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function itemsTable(order: IOrder) {
  const rows = order.items
    .map((item, i) => {
      const isLast = i === order.items.length - 1;
      return `
        <tr>
          <td style="padding:16px 0; border-bottom:1px solid ${isLast ? "transparent" : COLORS.divider}; width:72px;" valign="top">
            <img src="${item.productImage}" width="64" height="86" alt="${escapeHtml(item.productTitle)}"
              style="width:64px; height:86px; object-fit:cover; display:block; border:1px solid ${COLORS.border};" />
          </td>
          <td style="padding:16px 0 16px 16px; border-bottom:1px solid ${isLast ? "transparent" : COLORS.divider};" valign="top">
            <p style="margin:0; font-size:10px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:${COLORS.muted};">
              ${escapeHtml(item.productBrand)}
            </p>
            <p style="margin:2px 0 0; font-size:14px; font-weight:600; color:${COLORS.ink};">
              ${escapeHtml(item.productTitle)}
            </p>
            <p style="margin:4px 0 0; font-size:12px; color:${COLORS.muted};">
              ${escapeHtml(item.selectedSize)} &middot; ${escapeHtml(item.selectedColor)} &middot; Qty ${item.quantity}
            </p>
          </td>
          <td style="padding:16px 0 16px 16px; border-bottom:1px solid ${isLast ? "transparent" : COLORS.divider}; text-align:right; white-space:nowrap;" valign="top">
            <p style="margin:0; font-size:14px; font-weight:600; color:${COLORS.ink};">${money(item.price * item.quantity, order.currency)}</p>
          </td>
        </tr>`;
    })
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`;
}

export function totalsBlock(order: IOrder) {
  const row = (label: string, value: string, opts?: { strong?: boolean; negative?: boolean; top?: boolean }) => `
    <tr>
      <td style="padding:${opts?.top ? "12px 0 0" : "4px 0"}; ${opts?.top ? `border-top:1px solid ${COLORS.border};` : ""} font-size:13px; color:${opts?.strong ? COLORS.ink : COLORS.muted}; font-weight:${opts?.strong ? "600" : "400"};">
        ${label}
      </td>
      <td style="padding:${opts?.top ? "12px 0 0" : "4px 0"}; ${opts?.top ? `border-top:1px solid ${COLORS.border};` : ""} font-size:13px; text-align:right; color:${opts?.negative ? "#b91c1c" : opts?.strong ? COLORS.ink : COLORS.muted}; font-weight:${opts?.strong ? "600" : "400"};">
        ${value}
      </td>
    </tr>`;

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-top:8px;">
      ${row("Subtotal", money(order.subtotal, order.currency))}
      ${order.discount > 0 ? row("Discount", `&minus;${money(order.discount, order.currency)}`, { negative: true }) : ""}
      ${row("Shipping", order.shipping === 0 ? "Free" : money(order.shipping, order.currency))}
      ${row("Total", money(order.total, order.currency), { strong: true, top: true })}
    </table>`;
}

export function addressBlock(order: IOrder) {
  const a = order.shippingAddress;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:1px solid ${COLORS.border};">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 8px; font-size:10px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:${COLORS.muted};">
            Shipping Address
          </p>
          <p style="margin:0; font-size:13px; line-height:1.6; color:${COLORS.body};">
            ${escapeHtml(a.firstName)} ${escapeHtml(a.lastName)}<br/>
            ${escapeHtml(a.line1)}${a.line2 ? `, ${escapeHtml(a.line2)}` : ""}<br/>
            ${escapeHtml(a.city)}${a.postalCode ? `, ${escapeHtml(a.postalCode)}` : ""}<br/>
            ${escapeHtml(a.country)}
          </p>
          <p style="margin:10px 0 0; font-size:11px; color:${COLORS.faint}; text-transform:uppercase; letter-spacing:.08em;">
            ${order.deliveryMethod === "express" ? "Express Delivery &middot; 1&ndash;2 business days" : "Standard Delivery &middot; 3&ndash;5 business days"}
          </p>
        </td>
      </tr>
    </table>`;
}

export function button(label: string, href: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="background-color:${COLORS.ink};">
          <a href="${href}" style="display:inline-block; padding:14px 32px; font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#ffffff; text-decoration:none;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

export function emailLayout(opts: { preheader: string; eyebrow: string; heading: string; body: string; storeName?: string }) {
  const storeName = opts.storeName ?? "Outlxx";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(storeName)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f5; font-family:Helvetica,Arial,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(opts.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:${COLORS.paper}; border:1px solid ${COLORS.border};">
            <tr>
              <td style="padding:28px 40px; border-bottom:1px solid ${COLORS.border};">
                <img src="cid:${LOGO_CID}" alt="${escapeHtml(storeName)}" width="120" height="32" style="height:28px; width:auto; display:block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:40px;">
                <p style="margin:0 0 8px; font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:${COLORS.muted};">
                  ${escapeHtml(opts.eyebrow)}
                </p>
                <h1 style="margin:0 0 16px; font-size:22px; font-weight:600; color:${COLORS.ink};">
                  ${escapeHtml(opts.heading)}
                </h1>
                ${opts.body}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px; border-top:1px solid ${COLORS.border}; background-color:#fafafa;">
                <p style="margin:0; font-size:11px; color:${COLORS.faint}; text-align:center; letter-spacing:.04em;">
                  Refined apparel for the considered wardrobe.
                </p>
                <p style="margin:8px 0 0; font-size:11px; color:${COLORS.faint}; text-align:center;">
                  &copy; ${new Date().getFullYear()} ${escapeHtml(storeName)}. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
