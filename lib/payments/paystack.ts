import crypto from "node:crypto";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

function secretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not configured");
  return key;
}

async function paystackFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${PAYSTACK_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || json.status !== true) {
    throw new Error(json.message ?? "Paystack request failed");
  }
  return json.data as T;
}

/** Reference format allows only -, ., = and alphanumerics per Paystack's inline-js docs. */
export function generatePaystackReference(): string {
  const ts = Date.now().toString(36);
  const rand = crypto.randomBytes(6).toString("hex");
  return `olx-${ts}-${rand}`;
}

export interface PaystackInitializeResult {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export async function initializeTransaction(params: {
  email: string;
  amountKobo: number;
  reference: string;
  metadata?: Record<string, unknown>;
}): Promise<PaystackInitializeResult> {
  return paystackFetch<PaystackInitializeResult>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKobo,
      currency: "NGN",
      reference: params.reference,
      metadata: params.metadata,
    }),
  });
}

export interface PaystackVerifyResult {
  status: "success" | "failed" | "abandoned" | "pending" | string;
  reference: string;
  amount: number;
  currency: string;
  id: number;
  gateway_response: string;
  customer: { email: string };
}

export async function verifyTransaction(reference: string): Promise<PaystackVerifyResult> {
  return paystackFetch<PaystackVerifyResult>(`/transaction/verify/${encodeURIComponent(reference)}`);
}

export interface PaystackRefundResult {
  status: string;
  id: number;
  amount: number;
}

export async function createRefund(reference: string): Promise<PaystackRefundResult> {
  return paystackFetch<PaystackRefundResult>("/refund", {
    method: "POST",
    body: JSON.stringify({ transaction: reference }),
  });
}

/** Paystack signs webhooks with HMAC-SHA512 of the raw body using the secret key — no separate webhook secret. */
export function isValidPaystackSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const expected = crypto.createHmac("sha512", secretKey()).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signature, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
