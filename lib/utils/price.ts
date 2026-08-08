import type { Currency } from "@/lib/store/CurrencyContext";
import type { CartItem } from "@/types/commerce";

export type PriceFields = {
  price: number;
  compareAtPrice?: number;
  priceNGN?: number;
  compareAtPriceNGN?: number;
};

/**
 * Naira prices are admin-set per context, not a converted equivalent of the
 * GBP figure — so whenever one is missing, we fall back to GBP for that
 * specific figure rather than fabricate a conversion.
 */
export function resolveMoney(
  gbpAmount: number,
  ngnAmount: number | null | undefined,
  currency: Currency
): { amount: number; currency: Currency } {
  if (currency === "NGN" && ngnAmount != null) {
    return { amount: ngnAmount, currency: "NGN" };
  }
  return { amount: gbpAmount, currency: "GBP" };
}

export function resolveProductPrice(product: PriceFields, currency: Currency) {
  const price = resolveMoney(product.price, product.priceNGN, currency);
  // Compare-at price follows whichever currency the main price resolved to,
  // so a product never shows a £ price struck through with a ₦ one.
  const compareAtPrice =
    product.compareAtPrice != null
      ? resolveMoney(product.compareAtPrice, product.compareAtPriceNGN, price.currency).amount
      : undefined;
  return { price: price.amount, compareAtPrice, currency: price.currency };
}

/**
 * Cart/checkout totals mix multiple line items plus a shipping fee, so they
 * can only render in one currency. We switch the whole summary to NGN only
 * when every item's NGN price and the NGN delivery fee are set — otherwise
 * the summary falls back to GBP rather than mix currencies or fabricate a
 * conversion for whatever is missing.
 */
export function resolveCartTotals(
  items: CartItem[],
  discountRate: number,
  deliveryFee: number,
  deliveryFeeNGN: number | null | undefined,
  currency: Currency
) {
  const canUseNGN =
    currency === "NGN" &&
    deliveryFeeNGN != null &&
    items.every((i) => i.product.priceNGN != null);

  const effectiveCurrency: Currency = canUseNGN ? "NGN" : "GBP";
  const subtotal = items.reduce((sum, i) => {
    const unit = effectiveCurrency === "NGN" ? i.product.priceNGN! : i.product.price;
    return sum + unit * i.quantity;
  }, 0);
  const shipping = effectiveCurrency === "NGN" ? deliveryFeeNGN! : deliveryFee;
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount + shipping;

  return { currency: effectiveCurrency, subtotal, shipping, discountAmount, total };
}
