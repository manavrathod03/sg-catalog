import Link from "next/link";
import Image from "next/image";
import { designs } from "./lib/data";

export default function HomePage() {
  const shirts = designs.filter((d) => d.product_type === "SHIRT");
  const pants = designs.filter((d) => d.product_type === "PANT");

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-widest uppercase text-stone-800">
            Catalog
          </span>
          <span className="text-xs text-stone-400">
            {designs.length} designs
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Shirts section */}
        <Section
          title="Shirts"
          count={shirts.length}
          items={shirts}
        />

        {/* Pants section */}
        <Section
          title="Pants"
          count={pants.length}
          items={pants}
        />
      </div>
    </main>
  );
}

function Section({
  title,
  count,
  items,
}: {
  title: string;
  count: number;
  items: typeof designs;
}) {
  if (count === 0) return null;
  return (
    <section className="mt-8">
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-stone-500">
          {title}
        </h2>
        <span className="text-xs text-stone-400">{count}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((design) => (
          <DesignCard key={design.design_id} design={design} />
        ))}
      </div>
    </section>
  );
}

function DesignCard({ design }: { design: (typeof designs)[0] }) {
  const totalColors = design.colors.length;

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
        <p className="text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
          D-{design.design_number}
        </p>
        <p className="text-sm font-medium text-stone-800 mt-0.5 leading-tight truncate">
          {design.name}
        </p>
        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mt-2">
          {design.colors.slice(0, 5).map((c) => (
            <span
              key={c.color_id}
              className="w-3.5 h-3.5 rounded-full border border-stone-200 flex-shrink-0"
              style={{ backgroundColor: c.code }}
              title={c.name}
            />
          ))}
          {totalColors > 5 && (
            <span className="text-[10px] text-stone-400">
              +{totalColors - 5}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
