"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type CarouselSlide = {
  label: string;
  caption: string;
  imageSrc: string;
  videoSrc?: string;
};

const slides = [
  {
    imageSrc: "/media/home/slide-1.svg",
    videoSrc: "/media/home/slide-1.mp4",
    label: "Noir Editorial",
    caption: "A cinematic monochrome story with signature red accents.",
  },
  {
    imageSrc: "/media/home/slide-2.svg",
    videoSrc: "/media/home/slide-2.mp4",
    label: "Atelier Line",
    caption: "Sharp tailoring and gallery-inspired visual composition.",
  },
  {
    imageSrc: "/media/home/slide-3.svg",
    videoSrc: "/media/home/slide-3.mp4",
    label: "Night Signature",
    caption: "Minimal luxury silhouettes with high-contrast mood.",
  },
] satisfies CarouselSlide[];

export default function ImmersiveMediaCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="mx-auto mt-12 max-w-6xl px-4">
      <div className="overflow-hidden border border-black/15 bg-black">
        <div className="relative h-90 w-full sm:h-110 lg:h-140">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;

            return (
              <div
                key={slide.label}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!isActive}
              >
                {slide.videoSrc ? (
                  <video
                    key={`${slide.videoSrc}-${isActive ? "active" : "idle"}`}
                    className={`h-full w-full object-cover transition-transform duration-8000 ease-out ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                    autoPlay={isActive}
                    muted
                    loop
                    playsInline
                    preload={isActive ? "auto" : "metadata"}
                    poster={slide.imageSrc}
                  >
                    <source src={slide.videoSrc} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={slide.imageSrc}
                    alt={slide.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1120px"
                    className={`object-cover transition-transform duration-8000 ease-out ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                    priority={isActive}
                  />
                )}
              </div>
            );
          })}

          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
            <div className="relative min-h-30 sm:min-h-32">
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;

                return (
                  <div
                    key={`caption-${slide.label}`}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    aria-hidden={!isActive}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-red-400">Immersive Campaign</p>
                    <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{slide.label}</h2>
                    <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
                      {slide.caption}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/15 bg-black px-4 py-4 text-white sm:px-6">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.label}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 w-10 transition ${
                  index === activeSlide ? "bg-red-500" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Show ${slide.label}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}
              className="border border-white/30 px-4 py-1.5 text-xs uppercase tracking-[0.16em] hover:border-red-500 hover:text-red-400"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
              className="border border-white/30 px-4 py-1.5 text-xs uppercase tracking-[0.16em] hover:border-red-500 hover:text-red-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}