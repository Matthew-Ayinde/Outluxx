import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, id, className = "", ...props }: InputProps) {
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
      <input
        id={inputId}
        {...props}
        className={[
          "w-full border bg-transparent px-4 py-3.5 text-sm font-light text-foreground placeholder:text-faint",
          "transition-colors duration-300 outline-none",
          error
            ? "border-red-600 focus:border-red-700"
            : "border-hairline focus:border-foreground",
          className,
        ].join(" ")}
      />
      {error && <p className="text-xs font-light text-red-700">{error}</p>}
      {hint && !error && <p className="text-xs font-light text-muted">{hint}</p>}
    </div>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
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
      <textarea
        id={inputId}
        {...props}
        className={[
          "w-full border bg-transparent px-4 py-3.5 text-sm font-light text-foreground placeholder:text-faint",
          "transition-colors duration-300 outline-none resize-none",
          error ? "border-red-600" : "border-hairline focus:border-foreground",
          className,
        ].join(" ")}
      />
      {error && <p className="text-xs font-light text-red-700">{error}</p>}
    </div>
  );
}
