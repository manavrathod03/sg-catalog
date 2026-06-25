"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { designs } from "../lib/data";
import { DesignCard } from "../components/DesignCard";
import { Suspense } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = designs.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.design_number.toString().includes(query) ||
      d.description.toLowerCase().includes(query.toLowerCase()) ||
      d.product_type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 -ml-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full active:scale-95 transition-all flex items-center justify-center"
            aria-label="Back to home"
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-stone-800 truncate">
              Search Results
            </h1>
            <p className="text-xs text-stone-400 truncate">
              {results.length} {results.length === 1 ? "design" : "designs"} found for "{query}"
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {results.map((design) => (
              <DesignCard key={design.design_id} design={design} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-12 h-12 bg-stone-100 border border-stone-200 rounded-full flex items-center justify-center text-stone-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h2 className="text-sm font-medium text-stone-800">No results found</h2>
            <p className="text-xs text-stone-400 mt-1 max-w-[280px]">
              We couldn't find any designs matching "{query}". Try checking your spelling or search for something else.
            </p>
            <Link
              href="/"
              className="mt-6 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-850 active:scale-95 transition-all"
            >
              Browse all items
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-stone-50">
          <header className="sticky top-0 z-20 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200 h-14 flex items-center px-4">
            <div className="w-6 h-6 bg-stone-200 rounded-full animate-pulse mr-4" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3 bg-stone-200 rounded w-24 animate-pulse" />
              <div className="h-2 bg-stone-200 rounded w-40 animate-pulse" />
            </div>
          </header>
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl overflow-hidden bg-stone-200 shadow-sm h-64" />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
