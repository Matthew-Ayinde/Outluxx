import Link from "next/link";

export const metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-heading mb-6 inline-block text-xl font-semibold tracking-widest">
            OUTLUXX
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">Create Account</h1>
          <p className="mt-2 text-sm text-zinc-500">Join Outluxx for exclusive access and benefits</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">First name</label>
              <input type="text" className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black" />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Last name</label>
              <input type="text" className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Email address</label>
            <input type="email" className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black" placeholder="your@email.com" />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Password</label>
            <input type="password" className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black" placeholder="Min. 8 characters" />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-black" />
            <span className="text-xs text-zinc-500">
              I agree to the{" "}
              <Link href="/terms" className="text-black underline underline-offset-2">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy-policy" className="text-black underline underline-offset-2">Privacy Policy</Link>
            </span>
          </label>

          <Link
            href="/account"
            className="mt-2 flex h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
          >
            Create Account
          </Link>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/account/sign-in" className="font-medium text-black underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
