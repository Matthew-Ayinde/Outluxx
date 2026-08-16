import { pageMetadata } from "@/lib/config/seo";
import { getStoreSettings } from "@/lib/data/settings";
import ContactForm from "./ContactForm";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Get in touch with the Outlxx team — order enquiries, returns, product questions, and press & partnerships.",
  path: "/support/contact",
});

export default async function ContactPage() {
  const { contactEmail, supportPhone } = await getStoreSettings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Get in Touch</p>
        <h1 className="text-4xl font-semibold">Contact Us</h1>
        <p className="mt-3 text-sm text-zinc-500">We reply to all enquiries within 24 hours, Monday–Friday.</p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <ContactForm />

        {/* Contact info */}
        <div className="space-y-8">
          {[
            { label: "Email", value: contactEmail, sub: "We reply within 24 hours" },
            { label: "Phone", value: supportPhone, sub: "Mon–Fri, 9am–6pm GMT" },
            { label: "Address", value: "5 Clarence Road", sub: "Grays town centre, rm176qa" },
          ].map((item) => (
            <div key={item.label}>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
              <p className="text-xs text-zinc-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
