"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Manage your store configuration.</p>
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
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Meta Description
              </label>
              <textarea
                defaultValue="Curated luxury fashion for the modern wardrobe. Discover timeless tailoring, elevated essentials, and editorial pieces."
                rows={3}
                className="w-full resize-none border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
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
                  <input type="checkbox" defaultChecked={item.checked} className="accent-black" />
                  <span className="text-sm">{item.label}</span>
                </label>
              ))}
            </div>
          </Section>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              className="flex h-11 items-center justify-center bg-black px-8 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
            >
              Save Settings
            </button>
            {saved && <p className="text-xs text-green-700">Settings saved successfully.</p>}
          </div>
        </div>

        {/* Status sidebar */}
        <div className="space-y-4">
          <div className="border border-black/10 bg-white p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Store Status</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "Store", status: "Live", ok: true },
                { label: "Payments", status: "Active", ok: true },
                { label: "Shipping", status: "Configured", ok: true },
                { label: "SSL", status: "Valid", ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-zinc-600">{item.label}</span>
                  <span className={`text-xs font-semibold ${item.ok ? "text-green-600" : "text-red-600"}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-black/10 bg-white p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Integrations</h3>
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
                    <span className="text-[10px] font-semibold text-green-600">Connected</span>
                  ) : (
                    <button className="text-[10px] font-semibold text-zinc-400 underline hover:text-black">Connect</button>
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
  return (
    <div className="border border-black/10 bg-white p-6">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest">{title}</h2>
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
        className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black"
      />
    </div>
  );
}
