"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IconImage, IconRefresh, IconUpload } from "@/components/admin/icons";
import { SectionHeader, StatusBadge } from "@/components/admin/ui";
import { getMediaSlots, resetMediaSlot, uploadMediaSlot, type ResolvedMediaSlot } from "@/lib/api/media";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  const [slots, setSlots] = useState<ResolvedMediaSlot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      setSlots(await getMediaSlots());
    } catch {
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  function updateSlot(next: ResolvedMediaSlot) {
    setSlots((prev) => prev.map((s) => (s.slot === next.slot ? next : s)));
  }

  const groups = slots.reduce<Record<string, ResolvedMediaSlot[]>>((acc, s) => {
    (acc[s.group] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div>
      <SectionHeader
        title="Media"
        subtitle="Swap the pictures and videos shown on the storefront. Text and layout stay as-is."
        icon={<IconImage className="h-5 w-5" />}
        accent="teal"
      />

      {loading ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-zinc-400">Loading…</p>
        </div>
      ) : (
        Object.entries(groups).map(([group, groupSlots]) => (
          <div key={group} className="mb-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">{group}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {groupSlots.map((slot) => (
                <MediaSlotCard key={slot.slot} slot={slot} onChange={updateSlot} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function MediaSlotCard({ slot, onChange }: { slot: ResolvedMediaSlot; onChange: (s: ResolvedMediaSlot) => void }) {
  const [uploading, setUploading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      await uploadMediaSlot(slot.slot, file);
      const fresh = await getMediaSlots();
      const updated = fresh.find((s) => s.slot === slot.slot);
      if (updated) onChange(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleReset() {
    if (!slot.isCustom) return;
    if (!confirm(`Reset "${slot.label}" to its default media?`)) return;
    setError("");
    setResetting(true);
    try {
      await resetMediaSlot(slot.slot);
      const fresh = await getMediaSlots();
      const updated = fresh.find((s) => s.slot === slot.slot);
      if (updated) onChange(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setResetting(false);
    }
  }

  const accept = slot.allowed.map((t) => `${t}/*`).join(",");
  const busy = uploading || resetting;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative aspect-video bg-zinc-100">
        {slot.mediaType === "video" ? (
          <video src={slot.url} className="h-full w-full object-cover" muted loop autoPlay playsInline />
        ) : (
          <Image src={slot.url} alt={slot.label} fill className="object-cover" sizes="400px" />
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-medium text-white">
            Uploading…
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-tight">{slot.label}</h3>
          <StatusBadge label={slot.isCustom ? "Custom" : "Default"} tone={slot.isCustom ? "success" : "neutral"} className="shrink-0" />
        </div>
        {error && <p className="mb-2 text-[11px] text-rose-600">{error}</p>}
        <div className="flex items-center gap-2">
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-300 px-3 py-2 text-[11px] font-medium text-zinc-500 transition-colors hover:border-teal-400 hover:text-teal-600">
            <IconUpload className="h-3.5 w-3.5" />
            {uploading ? "Uploading…" : "Replace"}
            <input
              type="file"
              accept={accept}
              disabled={busy}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
          </label>
          {slot.isCustom && (
            <button
              onClick={handleReset}
              disabled={busy}
              title="Reset to default"
              aria-label="Reset to default"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40"
            >
              <IconRefresh className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
