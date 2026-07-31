import Link from "next/link";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <div className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-full border border-foreground text-foreground">
        <svg width="26" height="20" viewBox="0 0 28 22" fill="none">
          <path d="M2 11l8 8L26 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <p className="eyebrow mb-4">Order Confirmed</p>
      <h1 className="font-heading mb-4 text-5xl font-light italic">Thank You</h1>
      <p className="mb-3 text-sm font-light leading-6 text-muted">
        Your order has been placed. A confirmation will be sent to your email shortly.
      </p>
      {order && (
        <p className="mb-10 text-base font-normal tracking-[0.08em] text-foreground">{order}</p>
      )}

      <div className="mb-12 border border-border p-7 text-left text-sm">
        <div className="space-y-4 font-light text-muted">
          <div className="flex justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">Estimated delivery</span>
            <span>3–5 business days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">Payment</span>
            <span>Authorised</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">Carrier</span>
            <span>DHL Express</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="/account/orders"
          className="flex h-13 items-center justify-center border border-foreground px-8 text-[10px] font-medium uppercase tracking-[0.26em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
        >
          Track Your Order
        </Link>
        <Link
          href="/"
          className="text-xs font-light text-muted underline underline-offset-4 transition-colors duration-300 hover:text-foreground"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
