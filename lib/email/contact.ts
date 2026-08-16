import path from "path";
import { getTransporter } from "./transporter";
import { getStoreSettings } from "@/lib/data/settings";
import { emailLayout, LOGO_CID } from "./templates";

const FROM = process.env.EMAIL_FROM || process.env.SMTP_USER || "";

const LOGO_ATTACHMENT = {
  filename: "black-logo.png",
  path: path.join(process.cwd(), "public", "black-logo.png"),
  cid: LOGO_CID,
};

export interface ContactFormSubmission {
  firstName: string;
  lastName: string;
  email: string;
  orderNumber?: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function detailRow(label: string, value: string) {
  return `
    <p style="margin:0 0 4px; font-size:11px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:#71717a;">${label}</p>
    <p style="margin:0 0 12px; font-size:14px; color:#18181b;">${value}</p>`;
}

export async function sendContactAdminNotification(data: ContactFormSubmission) {
  const settings = await getStoreSettings();

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:1px solid #e4e4e7; margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;">
          ${detailRow("From", `${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)} &lt;${escapeHtml(data.email)}&gt;`)}
          ${data.orderNumber ? detailRow("Order Number", escapeHtml(data.orderNumber)) : ""}
          ${detailRow("Subject", escapeHtml(data.subject))}
        </td>
      </tr>
    </table>
    <p style="margin:0 0 8px; font-size:11px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:#71717a;">Message</p>
    <p style="margin:0; font-size:14px; line-height:1.6; color:#52525b; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `;

  const html = emailLayout({
    preheader: `New contact form message from ${data.firstName} ${data.lastName}`,
    eyebrow: "Contact Form",
    heading: data.subject,
    body,
    storeName: settings.storeName,
  });

  await getTransporter().sendMail({
    from: FROM,
    to: settings.contactEmail,
    replyTo: data.email,
    subject: `Contact Form: ${data.subject}`,
    html,
    attachments: [LOGO_ATTACHMENT],
  });
}

export async function sendContactConfirmationEmail(data: ContactFormSubmission) {
  const settings = await getStoreSettings();

  const body = `
    <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#52525b;">
      Hi ${escapeHtml(data.firstName)}, thanks for reaching out. We've received your message and
      will get back to you within 24 hours, Monday&ndash;Friday.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:1px solid #e4e4e7;">
      <tr>
        <td style="padding:16px 20px;">
          ${detailRow("Subject", escapeHtml(data.subject))}
          <p style="margin:0 0 4px; font-size:11px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:#71717a;">Your Message</p>
          <p style="margin:0; font-size:14px; line-height:1.6; color:#52525b; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        </td>
      </tr>
    </table>
  `;

  const html = emailLayout({
    preheader: "We've received your message and will reply within 24 hours",
    eyebrow: "Message Received",
    heading: "We've got your message",
    body,
    storeName: settings.storeName,
  });

  await getTransporter().sendMail({
    from: FROM,
    to: data.email,
    subject: "We've received your message",
    html,
    attachments: [LOGO_ATTACHMENT],
  });
}
