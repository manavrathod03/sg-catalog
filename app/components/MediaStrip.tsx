"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {
  media: string[];
  designName: string;
}

export function MediaStrip({ media, designName }: Props) {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalActive, setModalActive] = useState(0);

  // Sync index back to page view when modal index changes
  useEffect(() => {
    setActive(modalActive);
  }, [modalActive]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowRight") {
        setModalActive((prev) => (prev + 1) % media.length);
      } else if (e.key === "ArrowLeft") {
        setModalActive((prev) => (prev - 1 + media.length) % media.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, media.length]);

  return (
    <div className="space-y-2">
      {/* Main viewer */}
      <div
        onClick={() => {
          setModalActive(active);
          setIsOpen(true);
        }}
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 cursor-zoom-in group active:scale-[0.99] transition-transform duration-200"
      >
        <Image
          src={media[active]}
          alt={`${designName} view ${active + 1}`}
          fill
          sizes="(max-width: 672px) 100vw, 640px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
        {/* Click to expand hover badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Click to expand
        </div>
      </div>

      {/* Thumbnail row */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {media.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                i === active ? "border-stone-800" : "border-transparent"
              }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Overlay Lightbox Carousel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Close fullscreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main Visual Carousel Area */}
          <div
            className="relative w-full max-w-4xl aspect-square sm:aspect-[4/3] md:aspect-[16/10] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left/Prev Arrow */}
            {media.length > 1 && (
              <button
                onClick={() => setModalActive((prev) => (prev - 1 + media.length) % media.length)}
                className="absolute left-2 sm:left-4 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 active:scale-95 flex items-center justify-center shadow-lg backdrop-blur-sm"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}

            {/* Centered Image */}
            <div className="relative w-full h-full max-h-[80vh] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={media[modalActive]}
                  alt={`${designName} full view ${modalActive + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
            </div>

            {/* Right/Next Arrow */}
            {media.length > 1 && (
              <button
                onClick={() => setModalActive((prev) => (prev + 1) % media.length)}
                className="absolute right-2 sm:right-4 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 active:scale-95 flex items-center justify-center shadow-lg backdrop-blur-sm"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}
          </div>

          {/* Current Page Count */}
          <div className="mt-4 text-xs font-semibold tracking-widest text-white/60 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm select-none">
            {modalActive + 1} / {media.length}
          </div>
        </div>
      )}
    </div>
  );
}
