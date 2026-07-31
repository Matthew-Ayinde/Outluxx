import Link from "next/link";

type BreadcrumbsProps = {
  items: Array<{ label: string; href?: string }>;
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground"
                >
                  {item.label}
                </span>
              )}
              {!last && <span className="text-[10px] text-faint">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
