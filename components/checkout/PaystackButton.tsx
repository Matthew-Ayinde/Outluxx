"use client";

import { useState } from "react";
import PaystackPop from "@paystack/inline-js";

export function PaystackButton({
  accessCode,
  loading,
  onSuccess,
  onCancel,
  onError,
}: {
  accessCode: string;
  loading: boolean;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}) {
  const [opening, setOpening] = useState(false);

  function handlePay() {
    setOpening(true);
    const popup = new PaystackPop();
    popup.resumeTransaction(accessCode, {
      onSuccess: (transaction) => {
        setOpening(false);
        onSuccess(transaction.reference);
      },
      onCancel: () => {
        setOpening(false);
        onCancel();
      },
      onError: (error) => {
        setOpening(false);
        onError(error.message || "Payment failed. Please try again.");
      },
    });
  }

  const busy = opening || loading;

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={busy}
      className="flex h-12 flex-1 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:opacity-60"
    >
      {busy ? "Processing…" : "Pay with Paystack"}
    </button>
  );
}
