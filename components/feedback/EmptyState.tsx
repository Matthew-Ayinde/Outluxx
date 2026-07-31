import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center border border-border px-8 py-20 text-center">
      <p className="eyebrow">Nothing Here Yet</p>
      <h2 className="mt-4 font-heading text-3xl font-light text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-sm text-sm font-light leading-6 text-muted">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-8 border border-foreground px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
