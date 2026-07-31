"use client";

import { useEffect, useCallback } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="animate-fade-in absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={[
          "animate-fade-up relative w-full border border-hairline bg-background text-foreground",
          sizes[size],
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border px-7 py-5">
            <h2
              id="modal-title"
              className="font-heading text-2xl font-light text-foreground"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-faint transition-colors duration-300 hover:text-foreground"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor"
                  strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-7">{children}</div>
      </div>
    </div>
  );
}
