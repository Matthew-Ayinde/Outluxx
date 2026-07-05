"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  eyebrow: string;
  lines: { text: string; italic?: boolean }[];
  copy: string;
  duration: number;
  media:
    | { type: "video"; src: string; poster: string }
    | { type: "image"; src: string; alt: string };
};

const slides: Slide[] = [
  {
    eyebrow: "Outlxx · Premium Fashion House",
    lines: [{ text: "Refined by" }, { text: "Restraint.", italic: true }],
    copy: "Considered apparel built on exceptional material and precise construction. For wardrobes that outlast trends.",
    duration: 10000,
    media: {
      type: "video",
      src: "/media/home/slide-1.mp4",
      poster: "/media/home/slide-1.svg",
    },
  },
  {
    eyebrow: "The Tailoring Edit",
    lines: [{ text: "Cut with" }, { text: "Intention.", italic: true }],
    copy: "Supima, silk, and cashmere — shaped by hand and finished without compromise.",
    duration: 7000,
    media: {
      type: "image",
      src: "/media/home/img1.jpg",
      alt: "Tailored garment detail",
    },
  },
  {
    eyebrow: "Monochrome Study",
    lines: [{ text: "Quiet is the" }, { text: "Statement.", italic: true }],
    copy: "Black, ivory, and the space between. Foundational pieces that outlast every season.",
    duration: 7000,
    media: {
      type: "image",
      src: "/media/home/img2.jpg",
      alt: "Monochrome editorial look",
    },
  },
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const id = setTimeout(
      () => setActive((c) => (c + 1) % slides.length),
      slides[active].duration
    );
    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (slides[active].media.type === "video") {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  const slide = slides[active];

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* -- Media layers -- */}
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {s.media.type === "video" ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={s.media.src}
              poster={s.media.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <div className={`h-full w-full ${i === active ? "hero-kenburns" : ""}`}>
              <Image
                src={s.media.src}
                alt={s.media.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      ))}

      {/* Flat scrim — keeps type legible without gradients */}
      <div className="absolute inset-0 bg-black/35" />

      {/* -- Text overlay (re-keyed per slide so reveals replay) -- */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-32 text-white sm:px-10 lg:px-16 lg:pb-36">
        <div key={active} className="max-w-4xl">
          <div className="flex items-center gap-4">
            <p className="hero-eyebrow text-[10px] font-medium uppercase text-white/70">
              {slide.eyebrow}
            </p>
          </div>

          <h1 className="mt-6 font-heading font-light leading-[0.95] tracking-[-0.01em]">
            {slide.lines.map((line, li) => (
              <span key={li} className="hero-line-mask">
                <span
                  className={`hero-line block text-6xl sm:text-8xl xl:text-[8.5rem] ${
                    line.italic ? "italic" : ""
                  }`}
                  style={{ animationDelay: `${0.2 + li * 0.14}s` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <span className="hero-line-mask mt-7">
            <p
              className="hero-line max-w-md text-sm font-light leading-7 text-white/70"
              style={{ animationDelay: "0.55s" }}
            >
              {slide.copy}
            </p>
          </span>
        </div>

        {/* Persistent CTA — does not re-animate between slides */}
        <div className="mt-10 flex items-center gap-8">
          <Link
            href="/new-arrivals"
            className="border border-white/80 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Shop New Arrivals
          </Link>
          <Link
            href="#collections"
            className="nav-link text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-white"
          >
            View Collections
          </Link>
        </div>
      </div>

      {/* -- Slide counter & progress -- */}
      <div className="absolute bottom-10 right-5 z-10 flex items-center gap-6 sm:right-10 lg:right-16">
        <p className="text-[10px] font-medium tabular-nums tracking-[0.25em] text-white/60">
          0{active + 1} — 0{slides.length}
        </p>
        <div className="flex items-center gap-2.5">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative flex h-8 w-10 items-center"
            >
              <span className="h-px w-full bg-white/25" />
              <span
                className={`absolute left-0 h-px w-full bg-white ${
                  i === active ? "hero-progress" : "opacity-0"
                }`}
                style={
                  i === active
                    ? { animationDuration: `${s.duration}ms` }
                    : undefined
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="animate-fade-in absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <div className="h-10 w-px bg-white/30" />
        <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/40">
          Scroll
        </p>
      </div>
    </section>
  );
}
