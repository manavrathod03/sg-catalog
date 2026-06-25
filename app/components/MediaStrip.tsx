"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  media: string[];
  designName: string;
}

export function MediaStrip({ media, designName }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-2">
      {/* Main viewer */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100">
        <Image
          src={media[active]}
          alt={`${designName} view ${active + 1}`}
          fill
          sizes="(max-width: 672px) 100vw, 640px"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail row */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {media.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                i === active
                  ? "border-stone-800"
                  : "border-transparent"
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
    </div>
  );
}
