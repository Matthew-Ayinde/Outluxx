import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local");
  }

  const port = Number(SMTP_PORT) || 465;
  const secure = port === 465;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    // IONOS (and most providers) require STARTTLS to be enforced on 587 —
    // without this, auth silently downgrades to plaintext if negotiation fails.
    requireTLS: !secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}
