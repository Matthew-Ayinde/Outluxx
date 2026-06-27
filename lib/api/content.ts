import { apiFetch } from "./client";

export interface ContentBlock {
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

export async function getContentBlocks(): Promise<ContentBlock[]> {
  try {
    return await apiFetch<ContentBlock[]>("/api/content", { cache: "no-store" });
  } catch {
    return [];
  }
}

export async function getContentBlock(key: string): Promise<ContentBlock | null> {
  try {
    return await apiFetch<ContentBlock>(`/api/content/${key}`, { cache: "no-store" });
  } catch {
    return null;
  }
}

export async function createContentBlock(data: Omit<ContentBlock, "_id">): Promise<ContentBlock> {
  return apiFetch("/api/content", { method: "POST", body: JSON.stringify(data) });
}

export async function updateContentBlock(key: string, data: Partial<ContentBlock>): Promise<ContentBlock> {
  return apiFetch(`/api/content/${key}`, { method: "PUT", body: JSON.stringify(data) });
}

export async function deleteContentBlock(key: string): Promise<void> {
  await apiFetch(`/api/content/${key}`, { method: "DELETE" });
}
