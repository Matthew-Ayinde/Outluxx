import Link from "next/link";

export const metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-block font-heading text-lg font-medium uppercase tracking-[0.32em] text-foreground">
            Outluxx
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-light">Reset Password</h1>
          <p className="mt-2 text-sm text-muted">
            Enter your email and we'll send a reset link.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
              Email address
            </label>
            <input
              type="email"
              className="w-full border border-hairline bg-transparent px-3.5 py-3 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="button"
            className="mt-2 flex h-12 items-center justify-center border border-foreground bg-foreground text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/account/sign-in" className="text-foreground underline underline-offset-4">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
