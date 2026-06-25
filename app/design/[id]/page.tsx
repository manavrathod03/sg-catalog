import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { designs } from "../../lib/data";
import { ALL_SIZES, BADGE_CONFIG, getAvailableSizes } from "../../lib/utils";
import { MediaStrip } from "../../components/MediaStrip";
import { ColorCard } from "../../components/ColorCard";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return designs.map((d) => ({ id: String(d.design_id) }));
}

export default function DesignPage({ params }: Props) {
  const design = designs.find((d) => d.design_id === Number(params.id));
  if (!design) notFound();

  const allMedia = [...design.videos, ...design.images];

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Back to catalog"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase leading-none">
              D-{design.design_number}
            </p>
            <p className="text-sm font-medium text-stone-800 leading-tight mt-0.5">
              {design.name}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto pb-20">
        {/* Media strip */}
        {allMedia.length > 0 && (
          <div className="mt-4 px-4">
            <MediaStrip media={allMedia} designName={design.name} />
          </div>
        )}

        {/* Design info */}
        <div className="px-4 mt-5">
          {design.description && (
            <p className="text-sm text-stone-500 leading-relaxed">
              {design.description}
            </p>
          )}
          {/* <div className="flex gap-4 mt-3">
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">
                Cash
              </p>
              <p className="text-base font-semibold text-stone-800">
                ₹{design.price_cash}
              </p>
            </div>
            <div className="w-px bg-stone-200" />
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">
                Credit
              </p>
              <p className="text-base font-semibold text-stone-800">
                ₹{design.price_credit}
              </p>
            </div>
          </div> */}
        </div>

        {/* Colors */}
        <div className="mt-6 px-4">
          <p className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mb-3">
            {design.colors.length} color{design.colors.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {design.colors.map((color) => (
              <ColorCard key={color.color_id} color={color} productType={design.product_type} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
