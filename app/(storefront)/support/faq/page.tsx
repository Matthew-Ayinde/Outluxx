export const metadata = { title: "FAQ" };

const FAQ = [
  {
    section: "Orders & Delivery",
    id: "orders",
    items: [
      { q: "How long does standard delivery take?", a: "Standard delivery takes 3–5 business days within the UK. International orders typically take 5–10 business days depending on destination." },
      { q: "Can I track my order?", a: "Yes. Once your order is dispatched, you'll receive a tracking number via email. You can also track your order from your account dashboard." },
      { q: "Do you offer express delivery?", a: "Yes, express delivery (1–2 business days) is available at checkout for an additional fee." },
      { q: "Can I change or cancel my order?", a: "Orders can be cancelled or modified within 2 hours of placement. After this, items are already being processed for dispatch." },
    ],
  },
  {
    section: "Returns & Refunds",
    id: "returns",
    items: [
      { q: "What is your returns policy?", a: "We accept returns within 14 days of delivery. Items must be unworn, in original condition, with all tags attached." },
      { q: "How long do refunds take?", a: "Refunds are processed within 5–7 business days of receiving your return. They will appear on your original payment method." },
      { q: "Are there any non-returnable items?", a: "Final sale items, customised pieces, and swimwear (for hygiene reasons) are non-returnable." },
    ],
  },
  {
    section: "Payments",
    id: "payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, Apple Pay, and PayPal." },
      { q: "Is my payment information secure?", a: "Yes. All transactions are encrypted with 256-bit SSL. We never store your card details." },
      { q: "Do you offer payment plans?", a: "We offer Klarna and Clearpay for eligible orders. Select your preferred option at checkout." },
    ],
  },
  {
    section: "Account",
    id: "account",
    items: [
      { q: "How do I reset my password?", a: "Click 'Forgot password' on the sign-in page and enter your email address. We'll send you a reset link within minutes." },
      { q: "Can I shop without an account?", a: "Yes. Guest checkout is available. However, an account lets you track orders, save addresses, and access your order history." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Help Centre</p>
        <h1 className="text-4xl font-semibold">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-12">
        {FAQ.map((section) => (
          <div key={section.id} id={section.id}>
            <h2 className="mb-5 border-b border-black/10 pb-3 text-sm font-semibold uppercase tracking-widest">
              {section.section}
            </h2>
            <div className="space-y-5">
              {section.items.map((item) => (
                <div key={item.q}>
                  <h3 className="mb-2 text-sm font-semibold">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
