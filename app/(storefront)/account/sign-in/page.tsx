import Link from "next/link";

export const metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-heading mb-6 inline-block text-xl font-semibold tracking-widest">
            OUTLUXX
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-500">Sign in to your account</p>
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
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Password
              </label>
              <Link href="/account/forgot-password" className="text-[11px] text-zinc-400 hover:text-black">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
              placeholder="••••••••"
            />
          </div>

          <Link
            href="/account"
            className="mt-2 flex h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
          >
            Sign In
          </Link>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          New to Outluxx?{" "}
          <Link href="/account/register" className="font-medium text-black underline underline-offset-2">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
