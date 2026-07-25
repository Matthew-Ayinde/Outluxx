// Shared visual primitives for the admin console. Purely presentational —
// keep these free of data-fetching or route-specific logic so every admin
// page can compose the same badges, cards, and buttons consistently.
import type { ReactNode } from "react";
import { IconTrendDown, IconTrendUp } from "./icons";

export type Tone = "success" | "info" | "warning" | "danger" | "neutral" | "violet";

export const TONE_CLASSES: Record<Tone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  neutral: "border-zinc-200 bg-zinc-50 text-zinc-600",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
};

const TONE_DOT: Record<Tone, string> = {
  success: "bg-emerald-500",
  info: "bg-sky-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
  neutral: "bg-zinc-400",
  violet: "bg-violet-500",
};

export const ORDER_STATUS_TONES: Record<string, Tone> = {
  delivered: "success",
  shipped: "info",
  processing: "warning",
  pending: "neutral",
  cancelled: "danger",
  returned: "violet",
};

export const PAYMENT_STATUS_TONES: Record<string, Tone> = {
  paid: "success",
  failed: "danger",
  pending: "neutral",
  refunded: "violet",
};

/** Small pill with a status dot — replaces flat bg-{color}-50 text tags site-wide. */
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
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${TONE_CLASSES[tone]} ${className}`}
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
  variant?: "solid" | "outline";
  icon?: ReactNode;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
        variant === "solid" ? "bg-zinc-900 text-white" : "border border-zinc-300 text-zinc-500",
      ].join(" ")}
    >
      {icon}
      {label}
    </span>
  );
}

export function Panel({
  title,
  icon,
  action,
  children,
  className = "",
  bodyClassName = "",
}: {
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
            {icon && <span className="text-zinc-400">{icon}</span>}
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
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "flat";
}) {
  return (
    <div className="border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{label}</p>
        {icon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-zinc-200 bg-zinc-50 text-zinc-500">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">{value}</p>
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
    "inline-flex h-7 w-7 items-center justify-center border transition-colors disabled:opacity-40",
    tone === "danger"
      ? "border-rose-200 text-rose-500 hover:border-rose-400 hover:bg-rose-50"
      : "border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900",
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

/** Styled checkbox that still renders a native input — behaviour is unchanged. */
export function Toggle(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="absolute inset-0 rounded-full bg-zinc-200 transition-colors peer-checked:bg-zinc-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-zinc-900" />
      <span className="relative h-3.5 w-3.5 translate-x-1 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-[18px]" />
    </span>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
