import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center text-foreground">
      <p className="eyebrow">404 — Page Not Found</p>
      <h1 className="mt-6 font-heading text-6xl font-light italic sm:text-7xl">
        Lost, elegantly.
      </h1>
      <p className="mt-6 max-w-sm text-sm font-light leading-6 text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <div className="mx-auto mt-10 h-px w-12 bg-hairline" />
      <div className="mt-10 flex gap-4">
        <Link
          href="/"
          className="inline-block border border-foreground bg-foreground px-9 py-3.5 text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
        >
          Return Home
        </Link>
        <Link
          href="/support"
          className="inline-block border border-hairline px-9 py-3.5 text-[10px] font-medium uppercase tracking-[0.26em] text-foreground transition-colors duration-300 hover:border-foreground"
        >
          Get Help
        </Link>
      </div>
    </div>
  );
}
