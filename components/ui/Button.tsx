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
    "bg-black text-white border border-black hover:bg-zinc-800 active:bg-zinc-900",
  secondary:
    "bg-white text-black border border-black/20 hover:border-black active:bg-zinc-50",
  ghost:
    "bg-transparent text-black border border-transparent hover:border-black/20 active:bg-zinc-50",
  danger:
    "bg-red-600 text-white border border-red-600 hover:bg-red-700 active:bg-red-800",
  "outline-red":
    "bg-transparent text-red-600 border border-red-600 hover:bg-red-600 hover:text-white active:bg-red-700",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs tracking-[0.1em]",
  md: "px-6 py-3 text-xs tracking-[0.12em]",
  lg: "px-8 py-4 text-sm tracking-[0.14em]",
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
        "inline-flex items-center justify-center gap-2 font-medium uppercase transition-colors",
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
