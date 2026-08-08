const CURRENCY_LOCALES: Record<string, string> = {
  GBP: "en-GB",
  NGN: "en-NG",
};

export function formatMoney(value: number, currency = "GBP") {
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency] ?? "en-GB", {
    style: "currency",
    currency,
  }).format(value);
}
