import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
};

export function Select({
  label, error, options, placeholder, id, className = "", ...props
}: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-black"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          {...props}
          className={[
            "w-full appearance-none border px-4 py-3 pr-10 text-sm text-black",
            "transition-colors outline-none bg-white cursor-pointer",
            error ? "border-red-500" : "border-black/20 focus:border-black",
            className,
          ].join(" ")}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40"
          width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
