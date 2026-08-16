"use client";

import { useState } from "react";

const SUBJECTS = ["Order enquiry", "Return request", "Product question", "Press & partnerships", "Other"];

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  orderNumber: "",
  subject: SUBJECTS[0],
  message: "",
  company: "", // honeypot, kept empty and hidden from view
};

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function field(key: keyof typeof form) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
      setForm(EMPTY_FORM);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-black/15 px-6 py-8 text-center dark:border-white/20">
        <p className="text-sm font-medium">Message sent</p>
        <p className="mt-2 text-sm text-zinc-500">
          Thanks for reaching out — we&apos;ve emailed you a copy and will reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 text-xs font-semibold uppercase tracking-widest underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <input
        type="text"
        {...field("company")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-2 gap-4">
        <Field label="First name" type="text" required {...field("firstName")} />
        <Field label="Last name" type="text" required {...field("lastName")} />
      </div>
      <Field label="Email address" type="email" required {...field("email")} />
      <Field label="Order number (optional)" type="text" {...field("orderNumber")} />

      <div>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Subject
        </label>
        <select
          {...field("subject")}
          className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white dark:bg-transparent"
        >
          {SUBJECTS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Message
        </label>
        <textarea
          rows={5}
          required
          {...field("message")}
          className="w-full resize-none border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  type,
  required,
  value,
  onChange,
}: {
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white"
      />
    </div>
  );
}
