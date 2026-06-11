type Variant = "default" | "black" | "red" | "green" | "yellow" | "outline";

type BadgeProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  default: "bg-zinc-100 text-zinc-700",
  black:   "bg-black text-white",
  red:     "bg-red-600 text-white",
  green:   "bg-emerald-100 text-emerald-700",
  yellow:  "bg-amber-100 text-amber-700",
  outline: "border border-black/20 text-black bg-transparent",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
