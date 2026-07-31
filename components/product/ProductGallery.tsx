"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/commerce";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2.5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                "relative h-16 w-12 shrink-0 overflow-hidden border transition-colors duration-300",
                i === active
                  ? "border-foreground"
                  : "border-hairline opacity-70 hover:border-foreground hover:opacity-100",
              ].join(" ")}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="48px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative aspect-3/4 flex-1 overflow-hidden bg-surface">
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
