/**
 * Verifies SMTP config and sends a real test email.
 * Run with: npm run test:email
 */

import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), ".env.local") });

import { getTransporter } from "../lib/email/transporter";

async function main() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, EMAIL_FROM, ADMIN_EMAIL } = process.env;
  console.log("🔧 Config:");
  console.log(`   Host: ${SMTP_HOST}:${SMTP_PORT}`);
  console.log(`   User: ${SMTP_USER}`);
  console.log(`   From: ${EMAIL_FROM}`);
  console.log(`   To:   ${ADMIN_EMAIL}`);

  const transporter = getTransporter();

  console.log("\n🔌 Verifying SMTP connection & auth…");
  await transporter.verify();
  console.log("✅ Connection verified — host reachable, credentials accepted.");

  console.log("\n✉️  Sending test email…");
  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to: ADMIN_EMAIL,
    subject: "Outlxx — SMTP test",
    html: `<p>This is a test email confirming SMTP is configured correctly for <strong>${SMTP_USER}</strong> via ${SMTP_HOST}.</p><p>Sent at ${new Date().toISOString()}</p>`,
  });
  console.log(`✅ Sent — messageId: ${info.messageId}`);

  process.exit(0);
}

main().catch((err) => {
  console.error("\n❌ SMTP test failed:");
  console.error(err);
  process.exit(1);
});
