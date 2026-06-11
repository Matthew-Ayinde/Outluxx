import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, id, className = "", ...props }: InputProps) {
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
      <input
        id={inputId}
        {...props}
        className={[
          "w-full border px-4 py-3 text-sm text-black placeholder:text-zinc-400",
          "transition-colors outline-none",
          error
            ? "border-red-500 focus:border-red-600"
            : "border-black/20 focus:border-black",
          className,
        ].join(" ")}
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-zinc-500">{hint}</p>
      )}
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
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-black"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        {...props}
        className={[
          "w-full border px-4 py-3 text-sm text-black placeholder:text-zinc-400",
          "transition-colors outline-none resize-none",
          error ? "border-red-500" : "border-black/20 focus:border-black",
          className,
        ].join(" ")}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
