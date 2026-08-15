"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/commerce";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);

  // Selecting a colour swaps in a different image set — jump back to the first shot.
  useEffect(() => {
    setActive(0);
  }, [images]);

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                "relative h-16 w-12 shrink-0 overflow-hidden border transition-colors",
                i === active ? "border-black" : "border-black/15 hover:border-black/40",
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
      <div className="relative flex-1 aspect-3/4 overflow-hidden bg-zinc-50">
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
