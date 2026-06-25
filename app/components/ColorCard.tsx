"use client";

import Image from "next/image";
import { useState } from "react";
import { ColorItem, ProductType, SleeveType } from "../lib/data";
import { ALL_SIZES, BADGE_CONFIG, getAvailableSizes } from "../lib/utils";

interface Props {
  color: ColorItem;
  productType: ProductType;
}

export function ColorCard({ color, productType }: Props) {
  const isShirt = productType === "SHIRT";
  const sleeves = isShirt ? (["FULL", "HALF"] as SleeveType[]) : null;

  const [sleeve, setSleeve] = useState<SleeveType>("FULL");

  const stockForSleeve = isShirt
    ? color.stock.filter((s) => s.sleeve === sleeve)
    : color.stock;

  const availableSizes = getAvailableSizes(stockForSleeve);

  // Only show sizes relevant to product type
  const relevantSizes = productType === "PANT"
    ? ALL_SIZES.filter((s) => ["30","32","34","36","38","40","42","44"].includes(s))
    : ALL_SIZES.filter((s) => ["36","38","40","42","44","46"].includes(s));

  // Filter to sizes that appear in ANY stock entry for this color (+ sleeve if shirt)
  const sizesInStock = new Set(stockForSleeve.map((s) => s.size));
  const displaySizes = relevantSizes.filter(
    (sz) => sizesInStock.has(sz) || availableSizes.has(sz)
  );
  // fallback: if no stock entries match, show relevant sizes from all stock
  const allColorSizes = new Set(color.stock.map((s) => s.size));
  const finalSizes = relevantSizes.filter((sz) => allColorSizes.has(sz) || availableSizes.has(sz));

  const badge = color.badge ? BADGE_CONFIG[color.badge] : null;

  return (
    <div className="rounded-2xl bg-white border border-stone-100 shadow-sm overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square bg-stone-100">
        <Image
          src={color.image}
          alt={color.name}
          fill
          sizes="(max-width: 640px) 50vw, 300px"
          className="object-cover"
        />
        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-2 left-2 text-[9px] font-semibold px-2 py-0.5 rounded-full ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        {/* Color name + swatch */}
        <div className="flex items-center gap-1.5 mb-2">
          <span
            className="w-3 h-3 rounded-full border border-stone-200 flex-shrink-0"
            style={{ backgroundColor: color.code }}
          />
          <p className="text-xs font-medium text-stone-700 truncate">
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
    </div>
  );
}
