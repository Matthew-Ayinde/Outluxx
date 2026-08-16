"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "email" | "code" | "done";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function requestCode(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStep("code");
      setInfo("We've emailed you a 6-digit verification code. It expires in 10 minutes.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStep("done");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-heading mb-6 inline-block text-xl font-semibold tracking-widest">
            Outlxx
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">Reset Password</h1>
          <p className="mt-2 text-sm text-zinc-500">
            {step === "email" && "Enter your email and we'll send you a verification code."}
            {step === "code" && "Enter the code we emailed you and choose a new password."}
            {step === "done" && "Your password has been reset."}
          </p>
        </div>

        {error && (
          <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}
        {info && !error && (
          <div className="mb-4 border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
            {info}
          </div>
        )}

        {step === "email" && (
          <form onSubmit={requestCode} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {loading ? "Sending…" : "Send Verification Code"}
            </button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Verification code
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                maxLength={6}
                autoComplete="one-time-code"
                className="w-full border border-black/15 px-3 py-2.5 text-center text-lg tracking-[0.4em] outline-none focus:border-black dark:border-white/20 dark:focus:border-white"
                placeholder="000000"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white"
                placeholder="Min. 8 characters"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white"
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {loading ? "Resetting…" : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => requestCode()}
              disabled={loading}
              className="text-center text-xs text-zinc-500 underline underline-offset-2 hover:text-black dark:hover:text-white"
            >
              Resend code
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="border border-black/15 px-6 py-8 text-center dark:border-white/20">
            <p className="text-sm font-medium">Password reset</p>
            <p className="mt-2 text-sm text-zinc-500">You can now sign in with your new password.</p>
            <button
              type="button"
              onClick={() => router.push("/account/sign-in")}
              className="mt-4 flex h-12 w-full items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {step !== "done" && (
          <p className="mt-6 text-center text-sm text-zinc-500">
            <Link href="/account/sign-in" className="text-black underline underline-offset-2 dark:text-white">
              ← Back to sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
