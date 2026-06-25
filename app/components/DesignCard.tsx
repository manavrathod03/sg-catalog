import Link from "next/link";
import Image from "next/image";
import { Design } from "../lib/data";

interface DesignCardProps {
  design: Design;
}

export function DesignCard({ design }: DesignCardProps) {
  return (
    <Link
      href={`/design/${design.design_id}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm active:scale-[0.98] transition-transform duration-150"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Image
          src={design.cover_image}
          alt={`Design ${design.design_number}`}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Type pill */}
        <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm text-stone-600">
          {design.product_type === "SHIRT" ? "Shirt" : "Pant"}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-semibold text-stone-850 leading-tight truncate">
          D-{design.design_number}
        </p>
        <p className="text-[11px] font-medium text-stone-400 mt-0.5 truncate">
          {design.name}
        </p>
      </div>
    </Link>
  );
}
