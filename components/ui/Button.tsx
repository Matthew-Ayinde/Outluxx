import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline-red";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background border border-foreground hover:bg-transparent hover:text-foreground",
  secondary:
    "bg-transparent text-foreground border border-hairline hover:border-foreground",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:border-hairline",
  danger:
    "bg-red-700 text-white border border-red-700 hover:bg-transparent hover:text-red-700",
  "outline-red":
    "bg-transparent text-red-700 border border-red-700/60 hover:border-red-700 hover:bg-red-700 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[10px] tracking-[0.22em]",
  md: "px-7 py-3.5 text-[11px] tracking-[0.24em]",
  lg: "px-10 py-4 text-xs tracking-[0.26em]",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 font-medium uppercase transition-all duration-300",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        disabled ? "pointer-events-none opacity-40" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
