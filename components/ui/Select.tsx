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
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          {...props}
          className={[
            "w-full appearance-none border bg-background px-4 py-3.5 pr-10 text-sm font-light text-foreground",
            "transition-colors duration-300 outline-none cursor-pointer",
            error ? "border-red-600" : "border-hairline focus:border-foreground",
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
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-faint"
          width="11" height="11" viewBox="0 0 12 12" fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <p className="text-xs font-light text-red-700">{error}</p>}
    </div>
  );
}
