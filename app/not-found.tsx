import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        404 — Page Not Found
      </p>
      <h1 className="font-heading text-5xl font-semibold">Not Found</h1>
      <p className="mt-4 max-w-sm text-sm text-zinc-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-block bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
        >
          Return Home
        </Link>
        <Link
          href="/support"
          className="inline-block border border-black/20 px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors"
        >
          Get Help
        </Link>
      </div>
    </div>
  );
}
