import Link from "next/link";
import { pageMetadata } from "@/lib/config/seo";

export const metadata = pageMetadata({
  title: "Returns & Exchange Policy",
  description: "Outlxx returns and exchange policy — 10-day, no-questions-asked returns on eligible items.",
  path: "/returns-refunds",
});

export default function ReturnsRefundsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Our Policy</p>
        <h1 className="text-4xl font-semibold">Returns & Exchange Policy</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          At Outlxx, customer satisfaction is our priority. If your purchase isn&apos;t quite right, we&apos;re here to help.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-700">
        <div>
          <h2 className="mb-3 text-base font-semibold">Return Eligibility</h2>
          <p>You may request a return within <span className="font-medium">10 days</span> of receiving your order.</p>
          <p className="mt-3">To qualify for a return, the item must:</p>
          <ul className="mt-2 space-y-2">
            {[
              "Be unworn and unused",
              "Be in its original condition",
              "Include all original tags and packaging",
              "Show no signs of damage caused after delivery",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3">Returns that do not meet these conditions may not be accepted.</p>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold">Damaged or Incorrect Orders</h2>
          <p>If you receive an item that is:</p>
          <ul className="mt-2 space-y-1">
            {["Damaged", "Defective", "Incorrect"].map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-3">Please contact our customer support team within <span className="font-medium">48 hours</span> of receiving your order.</p>
          <p className="mt-3">Outlxx will cover all return shipping costs and arrange either an exchange or replacement at no additional cost.</p>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold">Exchanges</h2>
          <p>We happily offer exchanges for eligible products, subject to stock availability.</p>
          <p className="mt-3">If your requested size or item is unavailable, our team will assist you in selecting an alternative product or arranging another suitable solution.</p>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold">Refunds</h2>
          <p>Once your returned item has been received and inspected, we&apos;ll notify you of the outcome.</p>
          <p className="mt-3">Approved refunds will be processed using the original payment method.</p>
          <p className="mt-3">Please note that your financial institution may require additional time for the refund to appear in your account.</p>
        </div>
      </div>

      <div className="mt-10 border border-black/10 p-6">
        <p className="text-sm text-zinc-600">
          Have a question about your return?{" "}
          <Link href="/support/contact" className="font-medium text-black underline underline-offset-2">
            Contact our team →
          </Link>
        </p>
      </div>
    </div>
  );
}
