export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Get in Touch</p>
        <h1 className="text-4xl font-semibold">Contact Us</h1>
        <p className="mt-3 text-sm text-zinc-500">We reply to all enquiries within 24 hours, Monday–Friday.</p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <form className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" type="text" />
            <Field label="Last name" type="text" />
          </div>
          <Field label="Email address" type="email" />
          <Field label="Order number (optional)" type="text" />

          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Subject
            </label>
            <select className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black">
              {["Order enquiry", "Return request", "Product question", "Press & partnerships", "Other"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full resize-none border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="button"
            className="flex h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Contact info */}
        <div className="space-y-8">
          {[
            { label: "Email", value: "clientservices@outluxx.com", sub: "We reply within 24 hours" },
            { label: "Phone", value: "+44 (0) 20 7946 0958", sub: "Mon–Fri, 9am–6pm GMT" },
            { label: "Address", value: "Outluxx Ltd, 14 Savile Row", sub: "London W1S 3JN, United Kingdom" },
          ].map((item) => (
            <div key={item.label}>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
              <p className="text-xs text-zinc-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</label>
      <input type={type} className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black" />
    </div>
  );
}
