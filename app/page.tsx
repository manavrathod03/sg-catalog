"use client";

import Link from "next/link";
import Image from "next/image";
import { designs } from "./lib/data";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DesignCard } from "./components/DesignCard";

// Duplicate the list to simulate infinite scrolling
const expandedShirts = Array.from({ length: 10 }).flatMap((_, i) =>
  designs
    .filter((d) => d.product_type === "SHIRT")
    .map((d) => ({
      ...d,
      design_id: d.design_id + i * 1000,
      design_number: d.design_number + i * 100,
      name: i === 0 ? d.name : `${d.name} (${i + 1})`,
    }))
);

const expandedPants = Array.from({ length: 20 }).flatMap((_, i) =>
  designs
    .filter((d) => d.product_type === "PANT")
    .map((d) => ({
      ...d,
      design_id: d.design_id + i * 1000,
      design_number: d.design_number + i * 100,
      name: i === 0 ? d.name : `${d.name} (${i + 1})`,
    }))
);

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"SHIRT" | "PANT">("SHIRT");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const totalDesigns = expandedShirts.length + expandedPants.length;

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between relative overflow-hidden">
          {/* Logo / Title */}
          <span
            className={`text-sm font-semibold tracking-widest uppercase text-stone-800 transition-all duration-300 ${
              isSearchOpen
                ? "opacity-0 -translate-x-4 pointer-events-none"
                : "opacity-100 translate-x-0"
            }`}
          >
            Catalog
          </span>

          {/* Search Trigger (Icon) */}
          {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full active:scale-95 transition-all duration-200"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          )}

          {/* Expanded Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
            className={`absolute left-4 right-4 h-9 flex items-center transition-all duration-300 ease-in-out ${
              isSearchOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            <div className="relative w-full flex items-center bg-stone-100 border border-stone-200 rounded-full px-3 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-stone-400 mr-2 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search catalog (e.g. Classic, Denim)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-none py-1"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-200/50 flex-shrink-0 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Modern sliding tabs switcher */}
      <div className="sticky top-14 z-10 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 py-3">
        <div className="max-w-2xl mx-auto px-4 flex justify-center">
          <div className="relative flex bg-stone-100 p-1 rounded-full w-64">
            {/* Active sliding pill */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm transition-all duration-300 ease-in-out"
              style={{
                left: activeTab === "SHIRT" ? "4px" : "calc(50% + 2px)",
                width: "calc(50% - 6px)",
              }}
            />
            <button
              onClick={() => {
                setActiveTab("SHIRT");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`relative z-10 flex-1 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-200 ${
                activeTab === "SHIRT" ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Shirts ({expandedShirts.length})
            </button>
            <button
              onClick={() => {
                setActiveTab("PANT");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`relative z-10 flex-1 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-200 ${
                activeTab === "PANT" ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Pants ({expandedPants.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Render Tab Contents (Keep mounted but toggle visibility to preserve scroll/pages loaded) */}
        <div className={activeTab === "SHIRT" ? "block" : "hidden"}>
          <TabContent items={expandedShirts} isActive={activeTab === "SHIRT"} />
        </div>
        <div className={activeTab === "PANT" ? "block" : "hidden"}>
          <TabContent items={expandedPants} isActive={activeTab === "PANT"} />
        </div>
      </div>
    </main>
  );
}

interface TabContentProps {
  items: typeof designs;
  isActive: boolean;
}

function TabContent({ items, isActive }: TabContentProps) {
  const PAGE_SIZE = 8;
  const [visibleItems, setVisibleItems] = useState<(typeof designs)[0][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Initialize visible items once
  useEffect(() => {
    setVisibleItems(items.slice(0, PAGE_SIZE));
  }, [items]);

  useEffect(() => {
    if (!isActive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && visibleItems.length < items.length) {
          setIsLoading(true);
          // Simulate loading delay to show skeleton states beautifully
          setTimeout(() => {
            setVisibleItems((prev) => {
              const currentLength = prev.length;
              const nextItems = items.slice(0, currentLength + PAGE_SIZE);
              setIsLoading(false);
              return nextItems;
            });
          }, 600);
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isActive, isLoading, visibleItems.length, items]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mt-6 animate-fade-in">
        {visibleItems.map((design) => (
          <DesignCard key={design.design_id} design={design} />
        ))}
        {/* Render skeletons when loading more */}
        {isLoading && (
          <>
            <DesignCardSkeleton />
            <DesignCardSkeleton />
            <DesignCardSkeleton />
          </>
        )}
      </div>

      {/* Intersection target element and spinner */}
      {visibleItems.length < items.length && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-6">
          {isLoading ? (
            <span className="text-xs text-stone-400 font-medium">Loading more designs...</span>
          ) : (
            <div className="w-5 h-5 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
}

function DesignCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden bg-white border border-stone-100 shadow-sm">
      {/* Image Skeleton */}
      <div className="aspect-square bg-stone-200" />
      {/* Info Skeleton */}
      <div className="p-3 space-y-2">
        <div className="h-3 bg-stone-200 rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-stone-200 rounded w-3/4 animate-pulse" />
        {/* <div className="flex gap-1.5 mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full bg-stone-100 border border-stone-200/50" />
          ))}
        </div> */}
      </div>
    </div>
  );
}



