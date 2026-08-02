// Shared visual primitives for the admin console. Purely presentational —
// keep these free of data-fetching or route-specific logic so every admin
// page can compose the same badges, cards, and buttons consistently.
import type { ReactNode } from "react";
import { IconTrendDown, IconTrendUp } from "./icons";

/** Semantic state tones — used for statuses (order/payment/etc). No purple. */
export type Tone = "success" | "info" | "warning" | "danger" | "neutral" | "teal";

export const TONE_CLASSES: Record<Tone, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  info: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
  warning: "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200",
  danger: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
  teal: "bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-200",
};

const TONE_DOT: Record<Tone, string> = {
  success: "bg-emerald-500",
  info: "bg-blue-500",
  warning: "bg-orange-500",
  danger: "bg-rose-500",
  neutral: "bg-slate-400",
  teal: "bg-teal-500",
};

export const ORDER_STATUS_TONES: Record<string, Tone> = {
  delivered: "success",
  shipped: "info",
  processing: "warning",
  pending: "neutral",
  cancelled: "danger",
  returned: "teal",
};

export const PAYMENT_STATUS_TONES: Record<string, Tone> = {
  paid: "success",
  failed: "danger",
  pending: "neutral",
  refunded: "teal",
};

/** Identity / categorical accent colours — used for icon chips, nav items, and
 *  stat cards to give each area of the console its own colour. Deliberately
 *  excludes purple/violet/indigo and any gradients. */
export type Accent = "gold" | "blue" | "emerald" | "sky" | "teal" | "rose" | "orange" | "slate";

export const ACCENT_CHIP: Record<Accent, string> = {
  gold: "bg-amber-100 text-amber-700",
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  sky: "bg-sky-50 text-sky-600",
  teal: "bg-teal-50 text-teal-600",
  rose: "bg-rose-50 text-rose-600",
  orange: "bg-orange-50 text-orange-600",
  slate: "bg-slate-100 text-slate-600",
};

/** Same accents, tuned for the dark sidebar surface. */
export const ACCENT_CHIP_DARK: Record<Accent, string> = {
  gold: "bg-amber-400/15 text-amber-300",
  blue: "bg-blue-400/15 text-blue-300",
  emerald: "bg-emerald-400/15 text-emerald-300",
  sky: "bg-sky-400/15 text-sky-300",
  teal: "bg-teal-400/15 text-teal-300",
  rose: "bg-rose-400/15 text-rose-300",
  orange: "bg-orange-400/15 text-orange-300",
  slate: "bg-white/10 text-white/70",
};

/** Small colour-coded icon tile — the primary way this console injects colour
 *  next to headings, stat cards, and nav items instead of flat monochrome. */
export function IconChip({
  icon,
  accent = "slate",
  dark = false,
  size = "md",
}: {
  icon: ReactNode;
  accent?: Accent;
  dark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = size === "sm" ? "h-7 w-7" : size === "lg" ? "h-11 w-11" : "h-9 w-9";
  return (
    <span
      className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-xl ${
        dark ? ACCENT_CHIP_DARK[accent] : ACCENT_CHIP[accent]
      }`}
    >
      {icon}
    </span>
  );
}

/** Pill with a status dot — replaces flat bg-{color}-50 text tags site-wide. */
export function StatusBadge({
  label,
  tone,
  className = "",
}: {
  label: string;
  tone: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${TONE_CLASSES[tone]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[tone]}`} />
      {label}
    </span>
  );
}

/** Compact solid/outline tag for product flags (New, Sale, Featured) — identity, not state. */
export function Tag({
  label,
  variant = "outline",
  icon,
}: {
  label: string;
  variant?: "solid" | "outline" | "gold";
  icon?: ReactNode;
}) {
  const variantClasses =
    variant === "solid"
      ? "bg-zinc-900 text-white"
      : variant === "gold"
        ? "bg-amber-400 text-zinc-900"
        : "border border-zinc-200 text-zinc-500 bg-white";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${variantClasses}`}
    >
      {icon}
      {label}
    </span>
  );
}

export function Panel({
  title,
  icon,
  accent = "slate",
  action,
  children,
  className = "",
  bodyClassName = "",
}: {
  title?: string;
  icon?: ReactNode;
  accent?: Accent;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <h2 className="flex items-center gap-2.5 text-sm font-semibold text-zinc-900">
            {icon && <IconChip icon={icon} accent={accent} size="sm" />}
            {title}
          </h2>
          {action}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon,
  accent = "slate",
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: ReactNode;
  accent?: Accent;
  trend?: "up" | "down" | "flat";
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{label}</p>
        {icon && <IconChip icon={icon} accent={accent} size="sm" />}
      </div>
      <p className="mt-2.5 text-2xl font-semibold tracking-tight text-zinc-900">{value}</p>
      {sub && (
        <p
          className={`mt-1.5 flex items-center gap-1 text-xs ${
            trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-500" : "text-zinc-400"
          }`}
        >
          {trend === "up" && <IconTrendUp className="h-3 w-3" />}
          {trend === "down" && <IconTrendDown className="h-3 w-3" />}
          {sub}
        </p>
      )}
    </div>
  );
}

export function IconButton({
  icon,
  label,
  onClick,
  href,
  target,
  rel,
  tone = "default",
  disabled,
  type = "button",
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  tone?: "default" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const classes = [
    "inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors disabled:opacity-40",
    tone === "danger"
      ? "border-rose-200 text-rose-500 hover:border-rose-300 hover:bg-rose-50"
      : "border-zinc-200 text-zinc-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600",
  ].join(" ");

  if (href) {
    return (
      <a href={href} target={target} rel={rel} title={label} aria-label={label} className={classes}>
        {icon}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} title={label} aria-label={label} className={classes}>
      {icon}
    </button>
  );
}

/** Primary/secondary/danger action button — the console's main CTA style. */
export function Button({
  children,
  icon,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  className = "",
}: {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "dark" | "outline" | "danger-outline";
  disabled?: boolean;
  className?: string;
}) {
  const variantClasses = {
    primary: "bg-amber-400 text-zinc-900 hover:bg-amber-300",
    dark: "bg-zinc-900 text-white hover:bg-zinc-800",
    outline: "border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 bg-white",
    "danger-outline": "border border-rose-200 text-rose-600 hover:bg-rose-50",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

/** Filter/status pill tab — used for category, status, and payment filters. */
export function FilterTab({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
        active ? "bg-zinc-900 text-white" : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900",
      ].join(" ")}
    >
      {label}
      {typeof count === "number" && <span className="ml-1.5 opacity-60">{count}</span>}
    </button>
  );
}

/** Styled checkbox that still renders a native input — behaviour is unchanged. */
export function Toggle(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="absolute inset-0 rounded-full bg-zinc-200 transition-colors peer-checked:bg-emerald-500 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-500" />
      <span className="relative h-3.5 w-3.5 translate-x-1 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-[18px]" />
    </span>
  );
}

export function SectionHeader({
  title,
  subtitle,
  icon,
  accent = "gold",
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  accent?: Accent;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        {icon && <IconChip icon={icon} accent={accent} size="lg" />}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
