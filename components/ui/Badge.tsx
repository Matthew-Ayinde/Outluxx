type Variant = "default" | "black" | "red" | "green" | "yellow" | "outline";

type BadgeProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  default: "bg-surface text-muted",
  black:   "bg-foreground text-background",
  red:     "bg-red-700 text-white",
  green:   "border border-emerald-700/30 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-500",
  yellow:  "border border-amber-600/30 text-amber-700 dark:border-amber-500/30 dark:text-amber-500",
  outline: "border border-hairline text-foreground bg-transparent",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em]",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
