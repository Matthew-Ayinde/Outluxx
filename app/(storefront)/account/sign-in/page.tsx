"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Sign in failed. Please try again.");
        return;
      }

      // Admin users go to /admin, everyone else goes to the redirect target
      if (json.data?.role === "admin") {
        router.push("/admin");
      } else {
        router.push(redirect);
      }
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
          <h1 className="mt-4 font-heading text-2xl font-light">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 border border-red-700/30 px-4 py-3 text-sm font-light text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
              Email address
            </label>
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
            <div className="mb-1 flex items-center justify-between">
              <label className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                Password
              </label>
              <Link href="/account/forgot-password" className="text-[11px] text-faint hover:text-foreground">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
              autoComplete="current-password"
              className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 items-center justify-center border border-foreground bg-foreground text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          New to Outluxx?{" "}
          <Link href="/account/register" className="font-medium text-foreground underline underline-offset-4">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
