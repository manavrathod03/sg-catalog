import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { designs } from "../../lib/data";
import { ALL_SIZES, BADGE_CONFIG, getAvailableSizes } from "../../lib/utils";
import { MediaStrip } from "../../components/MediaStrip";
import { ColorCard } from "../../components/ColorCard";
import { ChevronLeft, Phone, MessageCircle } from "lucide-react";

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
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors flex-shrink-0"
              aria-label="Back to catalog"
            >
              <ChevronLeft className="w-4 h-4 text-stone-600" />
            </Link>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-stone-800 leading-tight truncate">
                D-{design.design_number}
              </p>
              <p className="text-[10px] font-medium text-stone-400 mt-0.5 leading-none truncate">
                {design.name}
              </p>
            </div>
          </div>

          {/* Action buttons (Order, WhatsApp) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Order Now (Call) */}
            <a
              href="tel:+919833113880"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider active:scale-95 transition-all duration-150 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              Order
            </a>

            {/* WhatsApp Chat */}
            <a
              href="https://wa.me/919833113880"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95 transition-all duration-150 shadow-sm flex items-center justify-center"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
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
