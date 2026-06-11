export const metadata = { title: "Shipping & Delivery" };

export default function ShippingDeliveryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Delivery Information</p>
        <h1 className="text-4xl font-semibold">Shipping & Delivery</h1>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-zinc-700">
        <Section title="Delivery Options">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10">
                {["Method", "Timeframe", "Cost"].map((h) => (
                  <th key={h} className="pb-3 pr-8 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[
                { method: "Standard (UK)", time: "3–5 business days", cost: "Free over £500 · £15 otherwise" },
                { method: "Express (UK)", time: "1–2 business days", cost: "£25" },
                { method: "Standard (EU)", time: "5–7 business days", cost: "£20" },
                { method: "Standard (Rest of World)", time: "7–14 business days", cost: "£35" },
                { method: "Express (International)", time: "3–5 business days", cost: "£55" },
              ].map((row) => (
                <tr key={row.method}>
                  <td className="py-3 pr-8 font-medium">{row.method}</td>
                  <td className="py-3 pr-8 text-zinc-600">{row.time}</td>
                  <td className="py-3 text-zinc-600">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Order Processing">
          <p>Orders placed before 2pm GMT on a business day are dispatched same day. Orders placed after 2pm or on weekends are dispatched the following business day.</p>
          <p className="mt-3">During peak periods (sale, new season launches), processing may take 1–2 additional business days.</p>
        </Section>

        <Section title="Tracking Your Order">
          <p>Once dispatched, you will receive a confirmation email with your tracking number. All orders are fully tracked from our warehouse to your door.</p>
          <p className="mt-3">You can also track your order from your account dashboard under 'My Orders'.</p>
        </Section>

        <Section title="Customs & Duties">
          <p>For international deliveries outside the UK, customs duties and import taxes may be applicable. These charges are the responsibility of the recipient and are not included in your order total.</p>
          <p className="mt-3">We recommend checking your country's import regulations before placing an order.</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-base font-semibold">{title}</h2>
      {children}
    </div>
  );
}
