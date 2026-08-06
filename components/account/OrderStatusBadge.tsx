const STATUS_STYLES: Record<string, string> = {
  delivered:  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900",
  shipped:    "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-400 dark:border-sky-900",
  processing: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900",
  pending:    "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800",
  cancelled:  "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900",
  // Neutral, not purple — "returned" is a closed/settled state, not a warning.
  returned:   "bg-zinc-100 text-zinc-700 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
};

export default function OrderStatusBadge({ status, className = "" }: { status: string; className?: string }) {
  return (
    <span
      className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${
        STATUS_STYLES[status] ?? STATUS_STYLES.pending
      } ${className}`}
    >
      {status}
    </span>
  );
}
