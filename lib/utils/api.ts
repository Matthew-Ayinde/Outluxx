import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME, type JWTPayload } from "./auth";
import { cookies } from "next/headers";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function err(message: string, status = 400, code?: string) {
  return NextResponse.json({ error: message, ...(code ? { code } : {}) }, { status });
}

export async function requireAuth(): Promise<JWTPayload | NextResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return err("Unauthorized", 401);
  const payload = verifyToken(token);
  if (!payload) return err("Unauthorized", 401);
  return payload;
}

export async function requireAdmin(): Promise<JWTPayload | NextResponse> {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;
  if (result.role !== "admin") return err("Forbidden", 403);
  return result;
}

export function isNextResponse(val: unknown): val is NextResponse {
  return val instanceof NextResponse;
}
