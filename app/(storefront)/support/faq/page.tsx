import { pageMetadata, faqJsonLd } from "@/lib/config/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Outlxx orders, delivery, returns, and payments.",
  path: "/support/faq",
});

const FAQ = [
  {
    section: "Orders & Delivery",
    id: "orders",
    items: [
      { q: "Where do you currently ship?", a: "We currently deliver to customers across the United Kingdom and Nigeria." },
      { q: "How long does delivery take?", a: "Estimated delivery is 10–12 business days following dispatch." },
      { q: "Will I receive tracking information?", a: "Yes. Once your order has been shipped, you'll automatically receive current detail information about your order so you can monitor your package until it arrives." },
      { q: "Can I cancel my order?", a: "Orders may be cancelled before payment has been completed. Once payment has been confirmed, your order immediately enters processing and can no longer be cancelled." },
    ],
  },
  {
    section: "Payments",
    id: "payments",
    items: [
      { q: "What payment methods do you accept?", a: "Outlxx accepts secure online payment methods only. We do not accept cash payments." },
    ],
  },
  {
    section: "Returns & Exchanges",
    id: "returns",
    items: [
      { q: "Can I exchange an item?", a: "Yes. Eligible items may be exchanged within our return period, subject to stock availability." },
      { q: "What if my order arrives damaged or incorrect?", a: "Please contact our customer support team immediately. We'll arrange the return, replacement, or exchange, and Outlxx will cover all associated return shipping costs." },
    ],
  },
  {
    section: "Sizing",
    id: "sizing",
    items: [
      { q: "How do I choose the correct size?", a: "Every product page includes a dedicated size guide specific to that item to help you select the best fit before placing your order." },
    ],
  },
];

export default function FAQPage() {
  const allQA = FAQ.flatMap((section) => section.items);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={faqJsonLd(allQA)} />
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

        <div id="contact">
          <h2 className="mb-5 border-b border-black/10 pb-3 text-sm font-semibold uppercase tracking-widest">
            How can I contact Outlxx?
          </h2>
          <div className="border border-black/10 p-6 text-sm leading-relaxed text-zinc-600">
            <p className="mb-4 font-semibold text-black">Customer Support</p>
            <div className="space-y-3">
              <p>
                <span className="font-medium text-black">Phone:</span>{" "}
                <a href="tel:+447350163255" className="underline underline-offset-2 hover:text-black">+44 7350 163255</a>
              </p>
              <div>
                <p className="font-medium text-black">Address:</p>
                <p>5 Clarence Road<br />RM17 6QA<br />Grays Town Centre<br />United Kingdom</p>
              </div>
              <p>
                <span className="font-medium text-black">Support Hours:</span> 24 Hours a Day | 7 Days a Week
              </p>
              <p>
                <span className="font-medium text-black">Instagram:</span>{" "}
                <a
                  href="https://instagram.com/outlxx_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-black"
                >
                  @outlxx_
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
