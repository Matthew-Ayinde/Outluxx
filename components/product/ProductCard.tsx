"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/lib/store/WishlistContext";
import { formatMoney } from "@/lib/utils/format";
import type { Product } from "@/types/commerce";

export default function ProductCard({ product }: { product: Product }) {
  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);
  const image = product.images[0];
  const hover = product.images[1];

  return (
    <article className="group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-3/4 w-full overflow-hidden bg-surface">
          {/* Primary image */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`img-zoom object-cover ${
              hover ? "transition-opacity duration-700 group-hover:opacity-0" : ""
            }`}
          />
          {/* Hover image crossfade */}
          {hover && (
            <Image
              src={hover.src}
              alt={hover.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            />
          )}

          {/* NEW badge */}
          {product.isNew && (
            <div className="absolute left-3 top-3">
              <span className="bg-background px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.26em] text-foreground">
                New
              </span>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); toggle(product); }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-background opacity-0 transition-opacity duration-300 hover:opacity-100! group-hover:opacity-90"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg width="14" height="13" viewBox="0 0 24 22" fill="none">
              <path
                d="M20.84 2.61a5.5 5.5 0 0 0-7.78 0L12 3.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 19.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                strokeWidth="1.8"
                fill={wishlisted ? "currentColor" : "none"}
                className="text-foreground"
              />
            </svg>
          </button>

          {/* Quick view */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-background/95 py-3.5 text-center text-[9px] font-medium uppercase tracking-[0.26em] text-foreground transition-transform duration-300 ease-out group-hover:translate-y-0">
            Quick View
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-5 space-y-1.5">
        <p className="text-[9px] font-medium uppercase tracking-[0.26em] text-faint">
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-lg font-light leading-snug text-foreground transition-opacity duration-300 hover:opacity-60">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2.5 pt-0.5">
          <span className="text-sm font-normal text-foreground">
            {formatMoney(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs font-light text-muted line-through">
              {formatMoney(product.compareAtPrice)}
            </span>
          )}
          {product.isSale && (
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
              Sale
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
