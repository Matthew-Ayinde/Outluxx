import Link from "next/link";

export const metadata = { title: "Returns & Refunds" };

export default function ReturnsRefundsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <div className="mb-10">
        <p className="eyebrow mb-3">Our Policy</p>
        <h1 className="section-title text-4xl sm:text-5xl">Returns & Refunds</h1>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="mb-3 text-base font-medium">Return Window</h2>
          <p>Returns are accepted within 14 days of the delivery date. After this period, items are not eligible for return or exchange.</p>
        </div>

        <div>
          <h2 className="mb-3 text-base font-medium">Condition Requirements</h2>
          <ul className="space-y-2">
            {[
              "Items must be unworn and unwashed",
              "All original tags must be attached",
              "Items must be in their original packaging",
              "Shoes must be returned in their dust bags and boxes",
              "Items showing signs of wear or damage cannot be accepted",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-base font-medium">Non-Returnable Items</h2>
          <p>The following items cannot be returned:</p>
          <ul className="mt-2 space-y-1">
            {["Final sale items", "Personalised or monogrammed pieces", "Underwear and swimwear (for hygiene reasons)", "Fragrance and cosmetics (if opened)"].map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-faint" />
                {i}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-base font-medium">How to Return</h2>
          <ol className="space-y-2 list-decimal pl-4">
            <li>Log in to your account and visit the Returns section</li>
            <li>Select the item(s) you wish to return and provide a reason</li>
            <li>Print the pre-paid returns label</li>
            <li>Package your item securely and drop off at any Post Office or DHL location</li>
          </ol>
          <p className="mt-3">You can also initiate a return by emailing returns@outluxx.com with your order number.</p>
        </div>

        <div>
          <h2 className="mb-3 text-base font-medium">Refund Timeline</h2>
          <p>Once we receive and inspect your return, we will process your refund within 5–7 business days. Refunds are issued to your original payment method. Please allow additional time for your bank to process the transaction.</p>
        </div>
      </div>

      <div className="mt-10 border border-border p-6">
        <p className="text-sm text-muted">
          Have a question about your return?{" "}
          <Link href="/support/contact" className="font-medium text-foreground underline underline-offset-2">
            Contact our team →
          </Link>
        </p>
      </div>
    </div>
  );
}
