"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Slide = { label: string; caption: string; seed: string };

const slides: Slide[] = [
  { seed: "olx-slide-a", label: "Autumn Collection", caption: "Precision tailoring and considered materials for the season ahead." },
  { seed: "olx-slide-b", label: "Monochrome Edit",   caption: "A study in restraint — black, white, and the space between." },
  { seed: "olx-slide-c", label: "The Essentials",    caption: "Foundational pieces elevated to their highest possible expression." },
];

export default function ImmersiveMediaCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
      <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "16/7" }}>
        {slides.map((slide, i) => (
          <div
            key={slide.seed}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
          >
            <Image
              src={`https://picsum.photos/seed/${slide.seed}/1600/700`}
              alt={slide.label}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className={`object-cover transition-transform duration-7000 ease-out ${
                i === active ? "scale-105" : "scale-100"
              }`}
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          {slides.map((slide, i) => (
            <div
              key={`cap-${slide.seed}`}
              className={`absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10 transition-all duration-700 ease-out ${
                i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              aria-hidden={i !== active}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
                Campaign
              </p>
              <h2 className="mt-2 font-heading text-3xl font-light text-white sm:text-4xl">
                {slide.label}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-white/60">{slide.caption}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3 sm:bottom-10 sm:right-10">
          {slides.map((slide, i) => (
            <button
              key={`dot-${slide.seed}`}
              onClick={() => setActive(i)}
              className={`h-px transition-all duration-300 ${
                i === active ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
