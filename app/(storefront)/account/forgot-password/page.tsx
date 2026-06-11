import Link from "next/link";

export const metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-heading mb-6 inline-block text-xl font-semibold tracking-widest">
            OUTLUXX
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">Reset Password</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Enter your email and we'll send a reset link.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Email address
            </label>
            <input
              type="email"
              className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="button"
            className="mt-2 flex h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          <Link href="/account/sign-in" className="text-black underline underline-offset-2">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
