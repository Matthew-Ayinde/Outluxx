import { apiFetch } from "./client";

export interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "customer" | "admin";
  addresses: unknown[];
}

export async function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<SessionUser> {
  return apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
}

export async function login(data: { email: string; password: string }): Promise<SessionUser> {
  return apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(data) });
}

export async function logout(): Promise<void> {
  await apiFetch("/api/auth/me", { method: "DELETE" });
}

export async function getMe(): Promise<SessionUser | null> {
  try {
    return await apiFetch<SessionUser>("/api/auth/me");
  } catch {
    return null;
  }
}

export async function validatePromo(code: string): Promise<{ code: string; discount: number }> {
  return apiFetch("/api/promo/validate", { method: "POST", body: JSON.stringify({ code }) });
}
