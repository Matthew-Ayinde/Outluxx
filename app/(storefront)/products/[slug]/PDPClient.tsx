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

const categoryLabels: Record<string, string> = {
  "tshirts":   "T-Shirts",
  "pants":     "Pants",
  "armless":   "Armless",
  "tank-tops": "Tank Tops",
};

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground"
      >
        {title}
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed text-muted">{children}</div>
      )}
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
  const categoryLabel = categoryLabels[product.category] ?? product.category;

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
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted">
        <Link href="/" className="transition-opacity hover:opacity-100 opacity-60">Home</Link>
        <span className="opacity-30">/</span>
        <Link href={`/${product.category}`} className="transition-opacity hover:opacity-100 opacity-60">
          {categoryLabel}
        </Link>
        <span className="opacity-30">/</span>
        <span className="text-foreground truncate max-w-[180px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={product.images} />

        {/* Info — animate in from right */}
        <div className="animate-slide-right flex flex-col gap-6">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
              {product.brand}
            </p>
            <h1 className="font-heading text-4xl font-light leading-tight sm:text-5xl">
              {product.title}
            </h1>
            <div className="mt-5">
              <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
            </div>
          </div>

          {product.isNew && (
            <div>
              <span className="border border-foreground px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]">
                New Arrival
              </span>
            </div>
          )}

          <p className="text-sm leading-7 text-muted">{product.description}</p>

          {/* Variants */}
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
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
              Quantity
            </p>
            <div className="flex h-10 w-28 items-center border border-border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-full w-10 items-center justify-center text-foreground hover:bg-surface transition-colors"
                aria-label="Decrease quantity"
              >
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                  <path d="M1 1h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
              <span className="flex-1 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-full w-10 items-center justify-center text-foreground hover:bg-surface transition-colors"
                aria-label="Increase quantity"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-foreground opacity-60">{error}</p>}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className="flex h-12 w-full items-center justify-center bg-foreground text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 active:opacity-60"
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <button
              onClick={() => toggle(product)}
              className={[
                "flex h-12 w-full items-center justify-center gap-2 border text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors",
                wishlisted
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-foreground",
              ].join(" ")}
            >
              <svg
                width="14" height="13" viewBox="0 0 24 22" fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="1.8"
              >
                <path d="M20.84 2.61a5.5 5.5 0 0 0-7.78 0L12 3.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 19.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlisted ? "Saved" : "Save to Wishlist"}
            </button>
          </div>

          {/* Accordion details */}
          <div className="border-b border-border">
            <AccordionSection title="Material & Care">
              <p className="mb-1">{product.material}</p>
              <p>{product.careInstructions}</p>
            </AccordionSection>
            <AccordionSection title="Delivery">
              Complimentary standard delivery 3–5 business days. Express available at checkout (1–2 days). All orders fully tracked.
            </AccordionSection>
            <AccordionSection title="Returns">
              Returns accepted within 14 days of delivery. Items must be unworn with tags attached.
            </AccordionSection>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-24 border-t border-border pt-16">
          <h2 className="mb-10 font-heading text-3xl font-light">You May Also Like</h2>
          <ProductGrid products={related} columns={4} />
        </div>
      )}
    </div>
  );
}
