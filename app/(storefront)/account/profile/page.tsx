"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@example.com",
    phone: "+44 7700 900123",
  });

  function set(field: string, val: string) {
    setForm((p) => ({ ...p, [field]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-md">
      <h2 className="mb-6 text-xl font-semibold">Profile Information</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name" value={form.firstName} onChange={(v) => set("firstName", v)} />
          <Field label="Last name" value={form.lastName} onChange={(v) => set("lastName", v)} />
        </div>
        <Field label="Email address" type="email" value={form.email} onChange={(v) => set("email", v)} />
        <Field label="Phone number" type="tel" value={form.phone} onChange={(v) => set("phone", v)} />

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="flex h-11 items-center justify-center bg-black px-8 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
          >
            Save Changes
          </button>
          {saved && <p className="text-xs text-green-700">Saved successfully.</p>}
        </div>
      </form>

      <hr className="my-8 border-black/10" />

      <h3 className="mb-4 text-sm font-semibold">Change Password</h3>
      <form className="flex flex-col gap-4">
        <Field label="Current password" type="password" value="" onChange={() => {}} />
        <Field label="New password" type="password" value="" onChange={() => {}} />
        <Field label="Confirm new password" type="password" value="" onChange={() => {}} />
        <button
          type="button"
          className="mt-1 w-fit border border-black/20 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
      />
    </div>
  );
}
