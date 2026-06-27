import Link from "next/link";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black">
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
          <path d="M2 11l8 8L26 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Order Confirmed
      </p>
      <h1 className="font-heading mb-3 text-3xl font-semibold">Thank You</h1>
      <p className="mb-2 text-sm text-zinc-600">
        Your order has been placed. A confirmation will be sent to your email shortly.
      </p>
      {order && <p className="mb-8 text-lg font-semibold">{order}</p>}

      <div className="mb-10 border border-black/10 p-6 text-left text-sm">
        <div className="space-y-3 text-zinc-600">
          <div className="flex justify-between">
            <span className="font-medium text-black">Estimated delivery</span>
            <span>3–5 business days</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-black">Payment</span>
            <span>Authorised</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-black">Carrier</span>
            <span>DHL Express</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/account/orders"
          className="flex h-12 items-center justify-center border border-black px-8 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Track Your Order
        </Link>
        <Link
          href="/"
          className="text-xs text-zinc-400 underline underline-offset-2 hover:text-black transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
