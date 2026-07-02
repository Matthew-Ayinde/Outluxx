"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await fetch("/api/auth/me", { method: "DELETE", credentials: "include" });
    } finally {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={signingOut}
      className="block py-1.5 text-left text-sm text-zinc-400 hover:text-black transition-colors disabled:opacity-60"
    >
      {signingOut ? "Signing out…" : "Sign Out"}
    </button>
  );
}
