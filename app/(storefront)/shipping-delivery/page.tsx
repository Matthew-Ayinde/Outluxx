import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "Shipping Policy",
  description: "Outlxx shipping and delivery policy — delivery times, fees, and international shipping information.",
  path: "/shipping-delivery",
});

export default function ShippingDeliveryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Delivery Information</p>
        <h1 className="text-4xl font-semibold">Shipping Policy</h1>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-zinc-700">
        <Section title="Shipping Destinations">
          <p>Outlxx currently ships throughout:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>United Kingdom</li>
            <li>Nigeria</li>
          </ul>
          <p className="mt-3">We&apos;re continuously working to expand our shipping network and serve more customers worldwide.</p>
        </Section>

        <Section title="Order Processing">
          <p>Orders are processed after payment has been successfully confirmed.</p>
          <p className="mt-3">Please allow 1&ndash;2 business days for processing before your order is dispatched.</p>
          <p className="mt-3">Orders placed on weekends or public holidays will be processed on the next working day.</p>
        </Section>

        <Section title="Delivery Time">
          <p>Estimated delivery time: <span className="font-medium">10&ndash;12 business days</span></p>
          <p className="mt-3">While we work closely with our delivery partners to ensure timely shipping, unforeseen circumstances such as customs clearance, weather conditions, or peak shopping periods may occasionally cause delays.</p>
        </Section>

        <Section title="Shipping Costs">
          <p>Shipping fees are calculated during checkout based on your delivery location.</p>
          <h3 className="mb-2 mt-5 text-sm font-semibold">Free Shipping</h3>
          <p>We proudly offer <span className="font-medium">FREE shipping</span> on all orders over £100.</p>
          <p className="mt-3">Orders below this amount will incur the applicable shipping charge shown at checkout.</p>
        </Section>

        <Section title="Order Tracking">
          <p>Once your order has been dispatched, you&apos;ll receive a confirmation email containing your tracking number, allowing you to monitor your shipment every step of the way.</p>
        </Section>

        <Section title="Incorrect Shipping Information">
          <p>Customers are responsible for ensuring that shipping details are accurate before completing their purchase.</p>
          <p className="mt-3">Outlxx cannot be held responsible for delays or failed deliveries caused by incorrect address information provided during checkout.</p>
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
