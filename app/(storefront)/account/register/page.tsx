"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError("Please agree to the Terms of Service to continue.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Registration failed. Please try again.");
        return;
      }

      router.push("/account");
      router.refresh();
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
          <Link href="/" className="mb-6 inline-block font-heading text-lg font-medium uppercase tracking-[0.32em] text-foreground">
            Outluxx
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-light">Create Account</h1>
          <p className="mt-2 text-sm text-muted">Join Outluxx for exclusive access and benefits</p>
        </div>

        {error && (
          <div className="mb-4 border border-red-700/30 px-4 py-3 text-sm font-light text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">First name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                required
                autoComplete="given-name"
                className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">Last name</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                required
                autoComplete="family-name"
                className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              autoComplete="email"
              className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
              placeholder="Min. 8 characters"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 accent-current"
            />
            <span className="text-xs text-muted">
              I agree to the{" "}
              <Link href="/terms" className="text-foreground underline underline-offset-4">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy-policy" className="text-foreground underline underline-offset-4">Privacy Policy</Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 items-center justify-center border border-foreground bg-foreground text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/account/sign-in" className="font-medium text-foreground underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
