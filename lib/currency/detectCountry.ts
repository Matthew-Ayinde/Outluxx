import type { NextRequest } from "next/server";

/**
 * Resolves the visitor's 2-letter country code for Proxy.
 *
 * `NextRequest.geo`/`.ip` were removed in Next.js 15, so CDN-provided
 * geo headers (when present) are checked first — they're free and instant.
 * Otherwise this falls back to an IP-geolocation lookup. Set IPINFO_TOKEN
 * for reliable production volume; without it, ipinfo.io's free
 * unauthenticated tier is used (low, shared rate limit).
 */
export async function detectCountry(request: NextRequest): Promise<string | null> {
  const cdnCountry =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry");
  if (cdnCountry && /^[A-Za-z]{2}$/.test(cdnCountry)) {
    return cdnCountry.toUpperCase();
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
  return lookupCountryByIP(ip);
}

async function lookupCountryByIP(ip: string): Promise<string | null> {
  if (!ip || ip === "127.0.0.1" || ip === "::1") return null;

  try {
    const token = process.env.IPINFO_TOKEN;
    const url = `https://ipinfo.io/${ip}/country${token ? `?token=${token}` : ""}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    return /^[A-Za-z]{2}$/.test(text) ? text.toUpperCase() : null;
  } catch {
    return null;
  }
}
