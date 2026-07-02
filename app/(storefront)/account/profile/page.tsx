"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMessage, setPwMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.status === 401) {
          window.location.href = "/account/sign-in?redirect=/account/profile";
          return;
        }
        const json = await res.json();
        if (!cancelled && json.data) {
          setForm({
            firstName: json.data.firstName ?? "",
            lastName: json.data.lastName ?? "",
            email: json.data.email ?? "",
            phone: json.data.phone ?? "",
          });
        }
      } catch {
        if (!cancelled) setError("Could not load your profile. Please refresh.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  function set(field: string, val: string) {
    setForm((p) => ({ ...p, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Could not save changes.");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPwMessage(null);
    if (pwForm.next.length < 8) {
      setPwMessage({ type: "err", text: "New password must be at least 8 characters." });
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwMessage({ type: "err", text: "New passwords do not match." });
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      });
      const json = await res.json();
      if (!res.ok) {
        setPwMessage({ type: "err", text: json.error ?? "Could not update password." });
        return;
      }
      setPwForm({ current: "", next: "", confirm: "" });
      setPwMessage({ type: "ok", text: "Password updated successfully." });
    } catch {
      setPwMessage({ type: "err", text: "Something went wrong. Please try again." });
    } finally {
      setPwSaving(false);
    }
  }

  if (loading) {
    return <p className="py-8 text-sm text-zinc-400">Loading your profile…</p>;
  }

  return (
    <div className="max-w-md">
      <h2 className="mb-6 text-xl font-semibold">Profile Information</h2>

      {error && (
        <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name" value={form.firstName} onChange={(v) => set("firstName", v)} />
          <Field label="Last name" value={form.lastName} onChange={(v) => set("lastName", v)} />
        </div>
        <Field label="Email address" type="email" value={form.email} onChange={() => {}} disabled />
        <Field label="Phone number" type="tel" value={form.phone} onChange={(v) => set("phone", v)} />

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex h-11 items-center justify-center bg-black px-8 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {saved && <p className="text-xs text-green-700">Saved successfully.</p>}
        </div>
      </form>

      <hr className="my-8 border-black/10" />

      <h3 className="mb-4 text-sm font-semibold">Change Password</h3>

      {pwMessage && (
        <div
          className={`mb-4 border px-4 py-3 text-sm ${
            pwMessage.type === "ok"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {pwMessage.text}
        </div>
      )}

      <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
        <Field label="Current password" type="password" value={pwForm.current} onChange={(v) => setPwForm((p) => ({ ...p, current: v }))} />
        <Field label="New password" type="password" value={pwForm.next} onChange={(v) => setPwForm((p) => ({ ...p, next: v }))} />
        <Field label="Confirm new password" type="password" value={pwForm.confirm} onChange={(v) => setPwForm((p) => ({ ...p, confirm: v }))} />
        <button
          type="submit"
          disabled={pwSaving}
          className="mt-1 w-fit border border-black/20 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors disabled:opacity-60"
        >
          {pwSaving ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", disabled = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-zinc-50 disabled:text-zinc-400"
      />
    </div>
  );
}
