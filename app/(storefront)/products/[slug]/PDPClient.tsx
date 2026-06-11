"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/store/CartContext";
import { useWishlist } from "@/lib/store/WishlistContext";
import ProductGallery from "@/components/product/ProductGallery";
import PriceBlock from "@/components/product/PriceBlock";
import VariantSelector from "@/components/product/VariantSelector";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types/commerce";

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-black/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium"
      >
        {title}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="pb-5 text-xs leading-relaxed text-zinc-600">{children}</div>}
    </div>
  );
}

export default function PDPClient({ product, related }: { product: Product; related: Product[] }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const wishlisted = has(product.id);

  function handleAddToCart() {
    if (!size) { setError("Please select a size."); return; }
    if (product.colors.length > 0 && !color) { setError("Please select a colour."); return; }
    setError("");
    for (let i = 0; i < qty; i++) {
      addItem(product, size, color || product.colors[0]?.value || "os");
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-[11px] text-zinc-400">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href={`/${product.category}`} className="hover:text-black capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-black truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={product.images} />

        {/* Product info */}
        <div className="flex flex-col gap-6">
          <div>
            <Link
              href={`/brands/${product.designerId}`}
              className="mb-1 inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-400 hover:text-red-600 transition-colors"
            >
              {product.brand}
            </Link>
            <h1 className="font-heading text-3xl font-semibold leading-tight sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-4">
              <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            {product.isNew && (
              <span className="border border-black px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                New
              </span>
            )}
            {product.isSale && (
              <span className="border border-red-600 bg-red-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                Sale
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-zinc-600">{product.description}</p>

          {/* Variant selectors */}
          <div className="flex flex-col gap-5">
            <VariantSelector
              label="Size"
              options={product.sizes}
              selected={size}
              onChange={setSize}
              variant="size"
            />
            {product.colors.length > 0 && (
              <VariantSelector
                label="Colour"
                options={product.colors}
                selected={color}
                onChange={setColor}
                variant="color"
              />
            )}
          </div>

          {/* Quantity */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest">Quantity</p>
            <div className="flex h-10 w-28 items-center border border-black/20">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-full w-10 items-center justify-center hover:bg-zinc-50"
                aria-label="Decrease quantity"
              >
                <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
                  <path d="M1 1h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <span className="flex-1 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-full w-10 items-center justify-center hover:bg-zinc-50"
                aria-label="Increase quantity"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className="flex h-12 w-full items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800 active:bg-zinc-700"
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <button
              onClick={() => toggle(product)}
              className={[
                "flex h-12 w-full items-center justify-center gap-2 border text-xs font-semibold uppercase tracking-widest transition-colors",
                wishlisted
                  ? "border-black bg-black text-white"
                  : "border-black/20 hover:border-black",
              ].join(" ")}
            >
              <svg
                width="14" height="13" viewBox="0 0 24 22" fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="1.8"
              >
                <path d="M20.84 2.61a5.5 5.5 0 0 0-7.78 0L12 3.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 19.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>
          </div>

          {/* Accordion */}
          <div className="border-b border-black/10">
            <AccordionSection title="Material & Care">
              <p className="mb-1">{product.material}</p>
              <p>{product.careInstructions}</p>
            </AccordionSection>
            <AccordionSection title="Delivery">
              Complimentary standard delivery (3–5 business days). Express delivery available at checkout (1–2 business days). All orders are fully tracked.
            </AccordionSection>
            <AccordionSection title="Returns">
              Returns are accepted within 14 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Final sale items are non-returnable.
            </AccordionSection>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-black/10 pt-14">
          <h2 className="mb-8 font-heading text-2xl font-semibold">You May Also Like</h2>
          <ProductGrid products={related} columns={4} />
        </div>
      )}
    </div>
  );
}
