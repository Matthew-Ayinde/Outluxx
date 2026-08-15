"use client";

import { useEffect, useState } from "react";
import { IconCheckCircle, IconGlobe, IconBell, IconCard, IconStore, IconGear } from "@/components/admin/icons";
import { Panel, SectionHeader, StatusBadge, Toggle, Button, IconChip, type Accent } from "@/components/admin/ui";
import { apiFetch, ApiError } from "@/lib/api/client";

interface NotificationSettings {
  orderConfirmation: boolean;
  shippingNotification: boolean;
  lowStockAlerts: boolean;
  newCustomerRegistrations: boolean;
  weeklyRevenueSummary: boolean;
}

interface SettingsForm {
  storeName: string;
  contactEmail: string;
  supportPhone: string;
  currency: string;
  deliveryFee: string;
  deliveryFeeNGN: string;
  metaTitle: string;
  metaDescription: string;
  notifications: NotificationSettings;
}

const FORM_DEFAULTS: SettingsForm = {
  storeName: "",
  contactEmail: "",
  supportPhone: "",
  currency: "GBP",
  deliveryFee: "3.98",
  deliveryFeeNGN: "",
  metaTitle: "",
  metaDescription: "",
  notifications: {
    orderConfirmation: true,
    shippingNotification: true,
    lowStockAlerts: true,
    newCustomerRegistrations: false,
    weeklyRevenueSummary: true,
  },
};

const NOTIFICATION_ITEMS: { key: keyof NotificationSettings; label: string; live: boolean }[] = [
  { key: "orderConfirmation", label: "Order confirmation emails", live: true },
  { key: "shippingNotification", label: "Shipping notification emails", live: false },
  { key: "lowStockAlerts", label: "Low stock alerts", live: false },
  { key: "newCustomerRegistrations", label: "New customer registrations", live: false },
  { key: "weeklyRevenueSummary", label: "Weekly revenue summary", live: false },
];

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(FORM_DEFAULTS);
  const [siteUrl, setSiteUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<SettingsForm & { deliveryFee: number; deliveryFeeNGN?: number; siteUrl: string }>("/api/settings")
      .then((data) => {
        setForm({
          storeName: data.storeName,
          contactEmail: data.contactEmail,
          supportPhone: data.supportPhone,
          currency: data.currency,
          deliveryFee: String(data.deliveryFee),
          deliveryFeeNGN: data.deliveryFeeNGN != null ? String(data.deliveryFeeNGN) : "",
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          notifications: data.notifications,
        });
        setSiteUrl(data.siteUrl);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof SettingsForm>(key: K, value: SettingsForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setNotification(key: keyof NotificationSettings, value: boolean) {
    setForm((prev) => ({ ...prev, notifications: { ...prev.notifications, [key]: value } }));
  }

  async function handleSave() {
    setError("");
    const fee = Number(form.deliveryFee);
    if (!Number.isFinite(fee) || fee < 0) {
      setError("Delivery fee must be a valid non-negative number.");
      return;
    }
    const feeNGN = form.deliveryFeeNGN ? Number(form.deliveryFeeNGN) : undefined;
    if (feeNGN !== undefined && (!Number.isFinite(feeNGN) || feeNGN < 0)) {
      setError("Naira delivery fee must be a valid non-negative number.");
      return;
    }
    if (!form.storeName.trim()) {
      setError("Store name is required.");
      return;
    }
    if (!/^[A-Za-z]{3}$/.test(form.currency.trim())) {
      setError("Currency must be a 3-letter code, e.g. GBP.");
      return;
    }

    setSaving(true);
    try {
      await apiFetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify({
          storeName: form.storeName.trim(),
          contactEmail: form.contactEmail.trim(),
          supportPhone: form.supportPhone.trim(),
          currency: form.currency.trim().toUpperCase(),
          deliveryFee: fee,
          deliveryFeeNGN: feeNGN,
          metaTitle: form.metaTitle.trim(),
          metaDescription: form.metaDescription.trim(),
          notifications: form.notifications,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <SectionHeader title="Settings" subtitle="Manage your store configuration." icon={<IconGear className="h-5 w-5" />} accent="slate" />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* General */}
          <Section title="General" icon={<IconStore className="h-4 w-4" />} accent="blue">
            <Field label="Store Name" value={form.storeName} disabled={loading} onChange={(v) => set("storeName", v)} />
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Store URL
              </label>
              <input
                type="text"
                value={siteUrl}
                readOnly
                disabled
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-500 outline-none"
              />
              <p className="mt-1 text-[11px] text-zinc-400">
                Set via the NEXT_PUBLIC_APP_URL environment variable — not editable here.
              </p>
            </div>
            <Field label="Contact Email" type="email" value={form.contactEmail} disabled={loading} onChange={(v) => set("contactEmail", v)} />
            <Field label="Support Phone" value={form.supportPhone} disabled={loading} onChange={(v) => set("supportPhone", v)} />
          </Section>

          {/* Commerce */}
          <Section title="Commerce" icon={<IconCard className="h-4 w-4" />} accent="emerald">
            <Field label="Default Currency" value={form.currency} disabled={loading} onChange={(v) => set("currency", v.toUpperCase())} maxLength={3} />
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Delivery Fee (£)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.deliveryFee}
                disabled={loading}
                onChange={(e) => set("deliveryFee", e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 disabled:opacity-50"
              />
              <p className="mt-1 text-[11px] text-zinc-400">
                Flat shipping fee charged on every order, applied at checkout.
              </p>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Delivery Fee (₦)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.deliveryFeeNGN}
                disabled={loading}
                onChange={(e) => set("deliveryFeeNGN", e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 disabled:opacity-50"
              />
              <p className="mt-1 text-[11px] text-zinc-400">
                Shown to Nigerian visitors instead of the £ fee. Set independently — not converted.
              </p>
            </div>
          </Section>

          {/* SEO */}
          <Section title="SEO & Metadata" icon={<IconGlobe className="h-4 w-4" />} accent="sky">
            <Field label="Meta Title" value={form.metaTitle} disabled={loading} onChange={(v) => set("metaTitle", v)} />
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Meta Description
              </label>
              <textarea
                value={form.metaDescription}
                disabled={loading}
                onChange={(e) => set("metaDescription", e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:opacity-50"
              />
            </div>
          </Section>

          {/* Notifications */}
          <Section title="Notifications" icon={<IconBell className="h-4 w-4" />} accent="orange">
            <div className="space-y-4">
              {NOTIFICATION_ITEMS.map((item) => (
                <label key={item.key} className="flex cursor-pointer items-center justify-between">
                  <span className="text-sm text-zinc-700">
                    {item.label}
                    {!item.live && (
                      <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                        (not yet active)
                      </span>
                    )}
                  </span>
                  <Toggle
                    checked={form.notifications[item.key]}
                    disabled={loading}
                    onChange={(e) => setNotification(item.key, e.target.checked)}
                  />
                </label>
              ))}
            </div>
          </Section>

          <div className="flex items-center gap-4 pt-2">
            <Button onClick={handleSave} disabled={saving || loading} className="h-11">
              {saving ? "Saving…" : "Save Settings"}
            </Button>
            {saved && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <IconCheckCircle className="h-3.5 w-3.5" /> Settings saved successfully.
              </p>
            )}
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
          </div>
        </div>

        {/* Status sidebar */}
        <div className="space-y-4">
          <Panel title="Store Status" icon={<IconStore className="h-4 w-4" />} accent="emerald">
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

          <Panel title="Integrations" icon={<IconCard className="h-4 w-4" />} accent="teal">
            <div className="space-y-3 p-5">
              {[
                { name: "Stripe", connected: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY },
                { name: "Paystack", connected: !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY },
                { name: "Mailchimp", connected: true },
                { name: "Google Analytics", connected: false },
                { name: "Klaviyo", connected: false },
              ].map((int) => (
                <div key={int.name} className="flex items-center justify-between">
                  <span className="text-sm">{int.name}</span>
                  {int.connected ? (
                    <StatusBadge label="Connected" tone="success" />
                  ) : (
                    <button className="text-[10px] font-semibold uppercase tracking-wide text-teal-600 underline underline-offset-2 hover:text-teal-800">Connect</button>
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

function Section({ title, icon, accent = "slate", children }: { title: string; icon?: React.ReactNode; accent?: Accent; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-zinc-900">
        {icon && <IconChip icon={icon} accent={accent} size="sm" />}
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", disabled, maxLength,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; disabled?: boolean; maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 disabled:opacity-50"
      />
    </div>
  );
}
