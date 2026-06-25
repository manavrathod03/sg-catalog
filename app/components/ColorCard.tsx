"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ColorItem, ProductType, SleeveType } from "../lib/data";
import { ALL_SIZES, BADGE_CONFIG, getAvailableSizes } from "../lib/utils";

interface Props {
  color: ColorItem;
  productType: ProductType;
}

export function ColorCard({ color, productType }: Props) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxActive, setLightboxActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  const isShirt = productType === "SHIRT";
  const sleeves = isShirt ? (["FULL", "HALF"] as SleeveType[]) : null;

  const [sleeve, setSleeve] = useState<SleeveType>("FULL");

  // Compile media array
  const allMedia = [...color.videos, ...color.images];
  const mediaList = allMedia.length > 0 ? allMedia : [color.image];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync index back to swiper view when lightbox changes
  useEffect(() => {
    setActiveMediaIndex(lightboxActive);
  }, [lightboxActive]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setLightboxActive((prev) => (prev + 1) % mediaList.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxActive((prev) => (prev - 1 + mediaList.length) % mediaList.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, mediaList.length]);

  const stockForSleeve = isShirt
    ? color.stock.filter((s) => s.sleeve === sleeve)
    : color.stock;

  const availableSizes = getAvailableSizes(stockForSleeve);

  // Only show sizes relevant to product type
  const relevantSizes = productType === "PANT"
    ? ALL_SIZES.filter((s) => ["30","32","34","36","38","40","42","44"].includes(s))
    : ALL_SIZES.filter((s) => ["36","38","40","42","44","46"].includes(s));

  // fallback: if no stock entries match, show relevant sizes from all stock
  const allColorSizes = new Set(color.stock.map((s) => s.size));
  const finalSizes = relevantSizes.filter((sz) => allColorSizes.has(sz) || availableSizes.has(sz));

  const badge = color.badge ? BADGE_CONFIG[color.badge] : null;

  return (
    <div className="rounded-lg bg-white border border-stone-100 shadow-card overflow-hidden">
      {/* Image Swiper Container */}
      <div className="relative aspect-square bg-stone-100 group">
        {/* Main Active Image */}
        <div
          onClick={() => {
            setLightboxActive(activeMediaIndex);
            setIsLightboxOpen(true);
          }}
          className="relative w-full h-full cursor-zoom-in"
        >
          <Image
            src={mediaList[activeMediaIndex]}
            alt={`${color.name} view`}
            fill
            sizes="(max-width: 640px) 50vw, 300px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Prev Arrow */}
        {mediaList.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/70 hover:bg-white text-stone-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow active:scale-90"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {/* Next Arrow */}
        {mediaList.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMediaIndex((prev) => (prev + 1) % mediaList.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/70 hover:bg-white text-stone-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow active:scale-90"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}

        {/* Dot Indicators */}
        {mediaList.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
            {mediaList.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMediaIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === activeMediaIndex ? "w-3 bg-stone-800" : "w-1.5 bg-stone-300/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-2 left-2 text-[9px] font-semibold px-2 py-0.5 rounded-full z-10 ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        {/* Color name + number */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded flex-shrink-0 select-none">
            {color.color_number}
          </span>
          <p className="text-xs font-semibold text-stone-700 truncate">
            {color.name}
          </p>
        </div>

        {/* Sleeve toggle (shirts only) */}
        {isShirt && sleeves && (
          <div className="flex rounded-lg overflow-hidden border border-stone-200 mb-2">
            {sleeves.map((sl) => (
              <button
                key={sl}
                onClick={() => setSleeve(sl)}
                className={`flex-1 text-[9px] font-semibold py-1 transition-colors ${
                  sleeve === sl
                    ? "bg-stone-800 text-white"
                    : "text-stone-500 hover:bg-stone-50"
                }`}
              >
                {sl === "FULL" ? "Full" : "Half"}
              </button>
            ))}
          </div>
        )}

        {/* Sizes */}
        <div className="flex flex-wrap gap-1">
          {finalSizes.map((sz) => {
            const available = availableSizes.has(sz);
            return (
              <span
                key={sz}
                className={`text-[9px] font-medium w-6 h-6 flex items-center justify-center rounded-md border ${
                  available
                    ? "border-stone-300 text-stone-700 bg-white"
                    : "border-stone-100 text-stone-300 bg-stone-50 line-through"
                }`}
              >
                {sz}
              </span>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Overlay Lightbox Carousel */}
      {isLightboxOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
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
            {mediaList.length > 1 && (
              <button
                onClick={() => setLightboxActive((prev) => (prev - 1 + mediaList.length) % mediaList.length)}
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
            <div className="relative w-full h-full max-h-[80vh] rounded-lg overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={mediaList[lightboxActive]}
                  alt={`${color.name} full view ${lightboxActive + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
            </div>

            {/* Right/Next Arrow */}
            {mediaList.length > 1 && (
              <button
                onClick={() => setLightboxActive((prev) => (prev + 1) % mediaList.length)}
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
            {lightboxActive + 1} / {mediaList.length}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
