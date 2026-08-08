import { apiFetch } from "./client";
import type { MediaType } from "@/lib/media/slots";

export interface ResolvedMediaSlot {
  slot: string;
  label: string;
  group: string;
  allowed: MediaType[];
  mediaType: MediaType;
  url: string;
  isCustom: boolean;
}

export async function getMediaSlots(): Promise<ResolvedMediaSlot[]> {
  return apiFetch<ResolvedMediaSlot[]>("/api/media", { cache: "no-store" });
}

export async function uploadMediaSlot(slot: string, file: File): Promise<ResolvedMediaSlot> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`/api/media/${slot}`, {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Upload failed");
  return json.data;
}

export async function resetMediaSlot(slot: string): Promise<void> {
  const res = await fetch(`/api/media/${slot}`, { method: "DELETE", credentials: "include" });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? "Reset failed");
  }
}
