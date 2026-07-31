"use client";

import { useState } from "react";
import {
  Settings,
  Store,
  CreditCard,
  Search,
  Bell,
  Save,
  CheckCircle2,
  Plug,
} from "lucide-react";

const SECTION_ICONS: Record<string, { icon: React.ElementType; chip: string }> = {
  General: { icon: Store, chip: "bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400" },
  Commerce: { icon: CreditCard, chip: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400" },
  "SEO & Metadata": { icon: Search, chip: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400" },
  Notifications: { icon: Bell, chip: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400" },
};

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400">
          <Settings size={18} strokeWidth={1.75} />
        </span>
        <div>
          <h1 className="font-heading text-2xl font-light">Settings</h1>
          <p className="mt-1 text-sm text-muted">Manage your store configuration.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* General */}
          <Section title="General">
            <Field label="Store Name" defaultValue="Outluxx" />
            <Field label="Store URL" defaultValue="https://outluxx.com" />
            <Field label="Contact Email" defaultValue="hello@outluxx.com" />
            <Field label="Support Phone" defaultValue="+44 (0) 20 7946 0958" />
          </Section>

          {/* Commerce */}
          <Section title="Commerce">
            <Field label="Default Currency" defaultValue="GBP" />
            <Field label="Free Shipping Threshold" defaultValue="500" />
            <Field label="Standard Shipping Price" defaultValue="15" />
            <Field label="Express Shipping Price" defaultValue="25" />
          </Section>

          {/* SEO */}
          <Section title="SEO & Metadata">
            <Field label="Meta Title" defaultValue="Outluxx — Premium Fashion House" />
            <div>
              <label className="mb-1 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">
                Meta Description
              </label>
              <textarea
                defaultValue="Curated luxury fashion for the modern wardrobe. Discover timeless tailoring, elevated essentials, and editorial pieces."
                rows={3}
                className="w-full resize-none rounded-lg border border-hairline px-3 py-2.5 text-sm outline-none focus:border-foreground"
              />
            </div>
          </Section>

          {/* Notifications */}
          <Section title="Notifications">
            <div className="space-y-3">
              {[
                { label: "Order confirmation emails", checked: true },
                { label: "Shipping notification emails", checked: true },
                { label: "Low stock alerts", checked: true },
                { label: "New customer registrations", checked: false },
                { label: "Weekly revenue summary", checked: true },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="accent-teal-600" />
                  <span className="text-sm">{item.label}</span>
                </label>
              ))}
            </div>
          </Section>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-8 text-[10px] font-medium uppercase tracking-[0.22em] text-background hover:opacity-90 transition-colors"
            >
              <Save size={14} strokeWidth={1.75} />
              Save Settings
            </button>
            {saved && (
              <p className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={14} strokeWidth={1.75} /> Settings saved successfully.
              </p>
            )}
          </div>
        </div>

        {/* Status sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-5">
            <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">Store Status</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "Store", status: "Live", ok: true },
                { label: "Payments", status: "Active", ok: true },
                { label: "Shipping", status: "Configured", ok: true },
                { label: "SSL", status: "Valid", ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-muted">{item.label}</span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    item.ok
                      ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${item.ok ? "bg-emerald-500" : "bg-red-500"}`} />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
                <Plug size={14} strokeWidth={1.75} />
              </span>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">Integrations</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: "Stripe", connected: true },
                { name: "Mailchimp", connected: true },
                { name: "Google Analytics", connected: false },
                { name: "Klaviyo", connected: false },
              ].map((int) => (
                <div key={int.name} className="flex items-center justify-between">
                  <span className="text-sm">{int.name}</span>
                  {int.connected ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <CheckCircle2 size={10} strokeWidth={2} /> Connected
                    </span>
                  ) : (
                    <button className="text-[10px] font-medium text-faint underline hover:text-foreground">Connect</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const meta = SECTION_ICONS[title];
  const Icon = meta?.icon;
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <div className="mb-5 flex items-center gap-2">
        {Icon && (
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${meta.chip}`}>
            <Icon size={14} strokeWidth={1.75} />
          </span>
        )}
        <h2 className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="mb-1 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
