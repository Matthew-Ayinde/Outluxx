import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db/mongoose";
import { Product } from "@/lib/db/models/Product";
import { ok, err } from "@/lib/utils/api";

const CartItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  quantity: z.number().int().positive(),
  selectedSize: z.string(),
  selectedColor: z.string(),
  clientPrice: z.number().positive(),
});

const Schema = z.object({ items: z.array(CartItemSchema).min(1) });

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message, 422);

  const slugs = parsed.data.items.map((i) => i.slug);
  const products = await Product.find({ slug: { $in: slugs } }).lean();
  const productMap = new Map(products.map((p) => [p.slug, p]));

  const issues: string[] = [];
  const validatedItems = parsed.data.items.map((item) => {
    const product = productMap.get(item.slug);
    if (!product) {
      issues.push(`"${item.slug}" is no longer available`);
      return null;
    }
    const priceChanged = product.price !== item.clientPrice;
    const sizeAvailable = product.sizes.find((s) => s.value === item.selectedSize)?.available;
    const colorAvailable = product.colors.find((c) => c.value === item.selectedColor)?.available;

    if (!sizeAvailable) issues.push(`${product.title} in size ${item.selectedSize} is unavailable`);
    if (!colorAvailable) issues.push(`${product.title} in color ${item.selectedColor} is unavailable`);

    return {
      slug: item.slug,
      currentPrice: product.price,
      priceChanged,
      available: !!sizeAvailable && !!colorAvailable,
    };
  });

  return ok({ issues, items: validatedItems.filter(Boolean) });
}
