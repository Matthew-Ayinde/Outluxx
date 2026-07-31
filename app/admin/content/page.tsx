"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  GalleryHorizontal,
  Plus,
  X,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  ImageOff,
  UploadCloud,
  Save,
  AlertCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

const TYPE_COLORS: Record<string, string> = {
  hero: "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400",
  editorial: "bg-violet-500/10 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
  banner: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  carousel: "bg-sky-500/10 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
};

interface ContentBlock {
  _id: string;
  key: string;
  type: "hero" | "editorial" | "banner" | "carousel";
  title: string;
  subtitle?: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  cloudinaryPublicId?: string;
  cta?: { text: string; href: string };
  active: boolean;
  order: number;
}

export default function AdminContentPage() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ContentBlock | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content?all=true");
      const json = await res.json();
      setBlocks(Array.isArray(json.data) ? json.data : []);
    } catch {
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

  async function toggleActive(block: ContentBlock) {
    setToggling(block._id);
    try {
      await fetch(`/api/content/${block.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !block.active }),
      });
      setBlocks((bs) => bs.map((b) => b._id === block._id ? { ...b, active: !b.active } : b));
    } finally {
      setToggling(null);
    }
  }

  async function handleDelete(block: ContentBlock) {
    if (!confirm(`Delete "${block.title}"? This cannot be undone.`)) return;
    setDeleting(block._id);
    try {
      await fetch(`/api/content/${block.key}`, { method: "DELETE" });
      setBlocks((bs) => bs.filter((b) => b._id !== block._id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
            <GalleryHorizontal size={18} strokeWidth={1.75} />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-light">Content</h1>
            <p className="mt-1 text-sm text-muted">Manage banners, announcements, and homepage modules.</p>
          </div>
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="flex items-center gap-1.5 rounded-lg bg-foreground px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-background hover:opacity-90 transition-colors"
        >
          <Plus size={14} strokeWidth={2} />
          Add Block
        </button>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border bg-background p-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-faint">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        </div>
      ) : blocks.length === 0 ? (
        <div className="rounded-xl border border-border bg-background p-8 text-center">
          <ImageOff size={24} strokeWidth={1.5} className="mx-auto mb-2 text-faint" />
          <p className="text-sm text-faint">No content blocks configured yet.</p>
          <button onClick={() => setShowModal(true)} className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] text-rose-600 dark:text-rose-400 underline">
            Add your first block
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <div key={block._id} className="rounded-xl border border-border bg-background overflow-hidden">
              <div className="relative aspect-video bg-surface">
                {block.mediaType === "video" ? (
                  <video src={block.mediaUrl} className="h-full w-full object-cover" muted />
                ) : (
                  <Image src={block.mediaUrl} alt={block.title} fill className="object-cover" sizes="400px" />
                )}
                <div className="absolute left-3 top-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${TYPE_COLORS[block.type] ?? "bg-surface text-muted"}`}>
                    {block.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium leading-tight">{block.title}</h3>
                  <span className={`inline-flex shrink-0 items-center gap-1 rounded-full text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 ${
                    block.active
                      ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                      : "bg-surface text-muted"
                  }`}>
                    {block.active ? <CheckCircle2 size={10} /> : <EyeOff size={10} />}
                    {block.active ? "Live" : "Off"}
                  </span>
                </div>
                {block.subtitle && <p className="text-xs text-muted mb-2 line-clamp-2">{block.subtitle}</p>}
                <p className="text-[10px] text-faint mb-3">Key: <code className="font-mono">{block.key}</code></p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(block); setShowModal(true); }}
                    className="flex items-center gap-1 rounded-lg border border-hairline px-3 py-1.5 text-[11px] font-medium hover:border-foreground transition-colors"
                  ><Pencil size={12} strokeWidth={1.75} /> Edit</button>
                  <button
                    onClick={() => toggleActive(block)}
                    disabled={toggling === block._id}
                    className="flex items-center gap-1 rounded-lg border border-hairline px-3 py-1.5 text-[11px] font-medium hover:border-foreground transition-colors disabled:opacity-50"
                  >
                    {toggling === block._id ? <Loader2 size={12} className="animate-spin" /> : block.active ? <EyeOff size={12} strokeWidth={1.75} /> : <Eye size={12} strokeWidth={1.75} />}
                    {block.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(block)}
                    disabled={deleting === block._id}
                    className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-medium text-red-500 hover:border-red-400 transition-colors disabled:opacity-50 ml-auto dark:border-red-500/20"
                  >{deleting === block._id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} strokeWidth={1.75} />}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ContentModal
          block={editing}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); fetchBlocks(); }}
        />
      )}
    </div>
  );
}

function ContentModal({ block, onClose, onSaved }: {
  block: ContentBlock | null; onClose: () => void; onSaved: () => void;
}) {
  const isEdit = !!block;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    key: block?.key ?? "",
    type: block?.type ?? "hero",
    title: block?.title ?? "",
    subtitle: block?.subtitle ?? "",
    mediaUrl: block?.mediaUrl ?? "",
    mediaType: block?.mediaType ?? "image",
    cloudinaryPublicId: block?.cloudinaryPublicId ?? "",
    ctaText: block?.cta?.text ?? "",
    ctaHref: block?.cta?.href ?? "",
    active: block?.active ?? true,
    order: String(block?.order ?? 0),
  });

  async function handleFileUpload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "content");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const json = await res.json();
      setForm((f) => ({
        ...f,
        mediaUrl: json.data.url,
        cloudinaryPublicId: json.data.publicId,
        mediaType: json.data.resourceType === "video" ? "video" : "image",
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        key: form.key,
        type: form.type,
        title: form.title,
        subtitle: form.subtitle || undefined,
        mediaUrl: form.mediaUrl,
        mediaType: form.mediaType,
        cloudinaryPublicId: form.cloudinaryPublicId || undefined,
        cta: form.ctaText ? { text: form.ctaText, href: form.ctaHref } : undefined,
        active: form.active,
        order: Number(form.order),
      };

      const url = isEdit ? `/api/content/${block!.key}` : "/api/content";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Save failed");
      }
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 pt-10 pb-10">
      <div className="w-full max-w-lg rounded-xl bg-background mx-4">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground">
            <GalleryHorizontal size={14} strokeWidth={1.75} className="text-rose-500" />
            {isEdit ? "Edit Block" : "Add Content Block"}
          </h2>
          <button onClick={onClose} className="text-faint hover:text-foreground"><X size={16} strokeWidth={1.75} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10">
              <AlertCircle size={14} strokeWidth={1.75} /> {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <CF label="Key *" value={form.key} onChange={(v) => setForm((f) => ({ ...f, key: v }))} required disabled={isEdit} />
            <div>
              <label className="mb-1 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">Type *</label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as ContentBlock["type"] }))} className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm outline-none focus:border-foreground">
                {["hero", "editorial", "banner", "carousel"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <CF label="Title *" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
          <CF label="Subtitle" value={form.subtitle} onChange={(v) => setForm((f) => ({ ...f, subtitle: v }))} />

          {/* Media upload */}
          <div>
            <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">
              Media {uploading && <span className="text-faint">(uploading…)</span>}
            </label>
            {form.mediaUrl && (
              <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-lg bg-surface">
                {form.mediaType === "video"
                  ? <video src={form.mediaUrl} className="h-full w-full object-cover" muted />
                  : <Image src={form.mediaUrl} alt="Preview" fill className="object-cover" sizes="400px" />
                }
              </div>
            )}
            <label className="mb-2 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-hairline px-4 py-3 text-xs text-muted hover:border-foreground transition-colors">
              <UploadCloud size={16} strokeWidth={1.75} />
              Upload image or video
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
            </label>
            <CF label="Or paste a URL" value={form.mediaUrl} onChange={(v) => setForm((f) => ({ ...f, mediaUrl: v }))} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CF label="CTA Text" value={form.ctaText} onChange={(v) => setForm((f) => ({ ...f, ctaText: v }))} />
            <CF label="CTA Link" value={form.ctaHref} onChange={(v) => setForm((f) => ({ ...f, ctaHref: v }))} />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="accent-rose-600" />
              Active (visible on site)
            </label>
            <CF label="Display order" value={form.order} onChange={(v) => setForm((f) => ({ ...f, order: v }))} type="number" />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button type="button" onClick={onClose} className="rounded-lg border border-hairline px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground hover:border-foreground transition-colors">Cancel</button>
            <button type="submit" disabled={loading || uploading} className="flex items-center gap-1.5 rounded-lg bg-foreground px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-background hover:opacity-90 transition-colors disabled:opacity-60">
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} strokeWidth={1.75} />}
              {loading ? "Saving…" : isEdit ? "Update" : "Add Block"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CF({ label, value, onChange, type = "text", required, disabled }: {
  label: string; value: string; onChange?: (v: string) => void; type?: string; required?: boolean; disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
        disabled={disabled}
        className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm outline-none focus:border-foreground disabled:bg-surface"
      />
    </div>
  );
}
