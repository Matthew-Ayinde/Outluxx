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
        className="flex w-full items-center justify-between py-5 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-foreground"
      >
        {title}
        <svg
          width="13" height="13" viewBox="0 0 14 14" fill="none"
          className={`shrink-0 text-faint transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="pb-6 text-sm font-light leading-7 text-muted">{children}</div>
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
      <nav className="mb-12 flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.2em]">
        <Link href="/" className="text-muted transition-colors duration-300 hover:text-foreground">Home</Link>
        <span className="text-faint">/</span>
        <Link href={`/${product.category}`} className="text-muted transition-colors duration-300 hover:text-foreground">
          {categoryLabel}
        </Link>
        <span className="text-faint">/</span>
        <span className="max-w-45 truncate text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={product.images} />

        {/* Info — animate in from right */}
        <div className="animate-slide-right flex flex-col gap-6">
          <div>
            <p className="eyebrow mb-3">{product.brand}</p>
            <h1 className="font-heading text-4xl font-light leading-[1.1] tracking-[-0.01em] sm:text-5xl">
              {product.title}
            </h1>
            <div className="mt-5">
              <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
            </div>
          </div>

          {product.isNew && (
            <div>
              <span className="border border-hairline px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-foreground">
                New Arrival
              </span>
            </div>
          )}

          <p className="text-sm font-light leading-7 text-muted">{product.description}</p>

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
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
              Quantity
            </p>
            <div className="flex h-11 w-32 items-center border border-hairline">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-full w-10 items-center justify-center text-foreground hover:bg-surface transition-colors"
                aria-label="Decrease quantity"
              >
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                  <path d="M1 1h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
              <span className="flex-1 text-center text-sm font-normal">{qty}</span>
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

          {error && <p className="text-xs font-light text-red-700">{error}</p>}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className="flex h-13 w-full items-center justify-center border border-foreground bg-foreground text-[10px] font-medium uppercase tracking-[0.26em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <button
              onClick={() => toggle(product)}
              className={[
                "flex h-13 w-full items-center justify-center gap-2.5 border text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300",
                wishlisted
                  ? "border-foreground bg-foreground text-background"
                  : "border-hairline text-foreground hover:border-foreground",
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
        <div className="mt-28 border-t border-border pt-20">
          <p className="eyebrow mb-3">Complete the Look</p>
          <h2 className="section-title mb-12 text-3xl sm:text-4xl">You May Also Like</h2>
          <ProductGrid products={related} columns={4} />
        </div>
      )}
    </div>
  );
}
