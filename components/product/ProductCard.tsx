"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/lib/store/WishlistContext";
import { formatMoney } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types/commerce";

export default function ProductCard({ product }: { product: Product }) {
  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);
  const image = product.images[0];

  return (
    <article className="group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-50">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.isNew && <Badge variant="black">New</Badge>}
            {product.isSale && <Badge variant="red">Sale</Badge>}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); toggle(product); }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/90 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 13.5S2 10 2 5.7A3.5 3.5 0 018 2.4a3.5 3.5 0 016 3.3C14 10 8 13.5 8 13.5z"
                strokeWidth="1.2"
                fill={wishlisted ? "#DC2626" : "none"}
                stroke={wishlisted ? "#DC2626" : "currentColor"}
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black py-3 text-center text-[10px] font-semibold uppercase tracking-widest text-white transition-transform duration-200 group-hover:translate-y-0">
            Quick View
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium leading-snug text-black hover:text-red-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2">
          <span className={product.compareAtPrice ? "text-sm font-semibold text-red-600" : "text-sm font-medium text-black"}>
            {formatMoney(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-zinc-400 line-through">
              {formatMoney(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
