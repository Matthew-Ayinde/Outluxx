import { NextRequest } from "next/server";
import { z } from "zod";
import { ok, err } from "@/lib/utils/api";
import { sendContactAdminNotification, sendContactConfirmationEmail } from "@/lib/email/contact";

const ContactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  orderNumber: z.string().trim().optional(),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message is too long"),
  company: z.string().optional(), // honeypot — real users never fill this in
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const { company, ...data } = parsed.data;
  if (company) return ok(null); // bot submission — pretend success, send nothing

  try {
    await Promise.all([sendContactAdminNotification(data), sendContactConfirmationEmail(data)]);
  } catch (e) {
    console.error("Failed to send contact form emails:", e);
    return err("We couldn't send your message. Please try again or email us directly.", 502);
  }

  return ok(null);
}
