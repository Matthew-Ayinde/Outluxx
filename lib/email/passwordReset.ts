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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendPasswordResetCode(opts: { email: string; firstName: string; code: string }) {
  const settings = await getStoreSettings();

  const codeBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin:0 0 24px;">
      <tr>
        <td style="background-color:#fafafa; border:1px solid #e4e4e7; padding:20px 32px;">
          <p style="margin:0; font-size:28px; font-weight:600; letter-spacing:.3em; color:#18181b; font-family:monospace;">
            ${escapeHtml(opts.code)}
          </p>
        </td>
      </tr>
    </table>`;

  const body = `
    <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#52525b;">
      Hi ${escapeHtml(opts.firstName)}, use the verification code below to reset your password.
      This code expires in 10 minutes.
    </p>
    ${codeBlock}
    <p style="margin:0; font-size:13px; line-height:1.6; color:#71717a;">
      If you didn't request a password reset, you can safely ignore this email — your password
      won't be changed.
    </p>
  `;

  const html = emailLayout({
    preheader: `Your verification code is ${opts.code}`,
    eyebrow: "Password Reset",
    heading: "Reset your password",
    body,
    storeName: settings.storeName,
  });

  await getTransporter().sendMail({
    from: FROM,
    to: opts.email,
    subject: `${opts.code} is your password reset code`,
    html,
    attachments: [LOGO_ATTACHMENT],
  });
}
