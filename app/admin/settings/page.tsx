"use client";

import { useState } from "react";
import { IconCheckCircle, IconGlobe, IconBell, IconCard, IconStore } from "@/components/admin/icons";
import { Panel, SectionHeader, StatusBadge, Toggle } from "@/components/admin/ui";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <SectionHeader title="Settings" subtitle="Manage your store configuration." />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* General */}
          <Section title="General" icon={<IconStore className="h-4 w-4" />}>
            <Field label="Store Name" defaultValue="Outlxx" />
            <Field label="Store URL" defaultValue="https://outlxx.com" />
            <Field label="Contact Email" defaultValue="hello@outlxx.com" />
            <Field label="Support Phone" defaultValue="+44 (0) 20 7946 0958" />
          </Section>

          {/* Commerce */}
          <Section title="Commerce" icon={<IconCard className="h-4 w-4" />}>
            <Field label="Default Currency" defaultValue="GBP" />
            <Field label="Free Shipping Threshold" defaultValue="500" />
            <Field label="Standard Shipping Price" defaultValue="15" />
            <Field label="Express Shipping Price" defaultValue="25" />
          </Section>

          {/* SEO */}
          <Section title="SEO & Metadata" icon={<IconGlobe className="h-4 w-4" />}>
            <Field label="Meta Title" defaultValue="Outlxx — Premium Fashion House" />
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Meta Description
              </label>
              <textarea
                defaultValue="Curated luxury fashion for the modern wardrobe. Discover timeless tailoring, elevated essentials, and editorial pieces."
                rows={3}
                className="w-full resize-none border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-900"
              />
            </div>
          </Section>

          {/* Notifications */}
          <Section title="Notifications" icon={<IconBell className="h-4 w-4" />}>
            <div className="space-y-4">
              {[
                { label: "Order confirmation emails", checked: true },
                { label: "Shipping notification emails", checked: true },
                { label: "Low stock alerts", checked: true },
                { label: "New customer registrations", checked: false },
                { label: "Weekly revenue summary", checked: true },
              ].map((item) => (
                <label key={item.label} className="flex cursor-pointer items-center justify-between">
                  <span className="text-sm text-zinc-700">{item.label}</span>
                  <Toggle defaultChecked={item.checked} />
                </label>
              ))}
            </div>
          </Section>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              className="flex h-11 items-center justify-center bg-zinc-900 px-8 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
            >
              Save Settings
            </button>
            {saved && (
              <p className="flex items-center gap-1.5 text-xs text-emerald-700">
                <IconCheckCircle className="h-3.5 w-3.5" /> Settings saved successfully.
              </p>
            )}
          </div>
        </div>

        {/* Status sidebar */}
        <div className="space-y-4">
          <Panel title="Store Status">
            <div className="space-y-3 p-5 text-sm">
              {[
                { label: "Store", status: "Live" },
                { label: "Payments", status: "Active" },
                { label: "Shipping", status: "Configured" },
                { label: "SSL", status: "Valid" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-zinc-600">{item.label}</span>
                  <StatusBadge label={item.status} tone="success" />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Integrations">
            <div className="space-y-3 p-5">
              {[
                { name: "Stripe", connected: true },
                { name: "Mailchimp", connected: true },
                { name: "Google Analytics", connected: false },
                { name: "Klaviyo", connected: false },
              ].map((int) => (
                <div key={int.name} className="flex items-center justify-between">
                  <span className="text-sm">{int.name}</span>
                  {int.connected ? (
                    <StatusBadge label="Connected" tone="success" />
                  ) : (
                    <button className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400 underline underline-offset-2 hover:text-zinc-900">Connect</button>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <h2 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-900">
        {icon && <span className="text-zinc-400">{icon}</span>}
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-900"
      />
    </div>
  );
}
