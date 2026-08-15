import { Product, type IProduct } from "@/lib/db/models/Product";
import { PromoCode, type IPromoCode } from "@/lib/db/models/PromoCode";
import type { Currency } from "@/lib/store/CurrencyContext";
import type { HydratedDocument } from "mongoose";

export class PricingError extends Error {}

export interface CheckoutItemInput {
  slug: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface PricedItem extends CheckoutItemInput {
  product: IProduct;
  unitPrice: number;
}

export interface OrderPricing {
  /**
   * The currency actually charged — may fall back to GBP even when the
   * visitor is browsing in NGN, mirroring resolveCartTotals: we only ever
   * charge NGN when every item has an admin-set Naira price and the Naira
   * delivery fee is configured, otherwise the whole order (display and
   * charge) falls back to GBP rather than mix currencies.
   */
  currency: Currency;
  subtotal: number;
  discountAmount: number;
  shipping: number;
  total: number;
  discountRate: number;
  promo: HydratedDocument<IPromoCode> | null;
  items: PricedItem[];
}

/**
 * Re-prices a cart server-side — the single source of truth shared by both
 * /api/checkout/intent (to decide Stripe vs Paystack and the amount to
 * authorize) and /api/checkout/confirm (to build the Order), so the two can
 * never disagree about what a customer owes.
 */
export async function priceOrder(
  items: CheckoutItemInput[],
  promoCode: string | undefined,
  requestedCurrency: Currency,
  deliveryFee: number,
  deliveryFeeNGN: number | null | undefined
): Promise<OrderPricing> {
  const slugs = items.map((i) => i.slug);
  const products = await Product.find({ slug: { $in: slugs } }).lean();
  const productMap = new Map(products.map((p) => [p.slug, p]));

  const resolvedItems: { item: CheckoutItemInput; product: IProduct }[] = items.map((item) => {
    const product = productMap.get(item.slug);
    if (!product) throw new PricingError(`Product "${item.slug}" not found`);
    return { item, product };
  });

  const currency: Currency =
    requestedCurrency === "NGN" &&
    deliveryFeeNGN != null &&
    resolvedItems.every(({ product }) => product.priceNGN != null)
      ? "NGN"
      : "GBP";

  const items_: PricedItem[] = resolvedItems.map(({ item, product }) => ({
    ...item,
    product,
    unitPrice: currency === "NGN" ? product.priceNGN! : product.price,
  }));

  const subtotal = items_.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  let discountRate = 0;
  let promo: HydratedDocument<IPromoCode> | null = null;
  if (promoCode) {
    const found = await PromoCode.findOne({ code: promoCode.toUpperCase(), active: true });
    if (found && (!found.expiresAt || found.expiresAt > new Date())) {
      if (!found.usageLimit || found.usedCount < found.usageLimit) {
        discountRate = found.discount;
        promo = found;
      }
    }
  }

  const discountAmount = subtotal * discountRate;
  const shipping = currency === "NGN" ? deliveryFeeNGN! : deliveryFee;
  const total = subtotal - discountAmount + shipping;

  return { currency, subtotal, discountAmount, shipping, total, discountRate, promo, items: items_ };
}
