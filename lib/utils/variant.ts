/**
 * Resolves which image to show for a product given a selected colour.
 * Shared between the storefront (types/commerce.Product) and server code
 * (lib/db/models/Product.IProduct) — both shapes are structurally compatible.
 */
export function resolveVariantImage<
  TImage extends { src: string; alt: string },
  TColor extends { value: string; images?: TImage[] }
>(images: TImage[], colors: TColor[], selectedColor?: string): TImage {
  if (selectedColor) {
    const color = colors.find((c) => c.value === selectedColor);
    if (color?.images?.length) return color.images[0];
  }
  return images[0];
}
