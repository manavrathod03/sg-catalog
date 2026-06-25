import { BadgeType, StockEntry } from "./data";

export const ALL_SIZES = ["30","32","34","36","38","40","42","44","46","48","50","52"] as const;

export function getAvailableSizes(stock: StockEntry[]): Set<string> {
  return new Set(
    stock.filter((s) => s.quantity > 0).map((s) => s.size)
  );
}

export const BADGE_CONFIG: Record<
  NonNullable<BadgeType>,
  { label: string; className: string }
> = {
  selling_fast: {
    label: "Selling Fast",
    className: "bg-orange-100 text-orange-700",
  },
  low_stock: {
    label: "Low Stock",
    className: "bg-red-100 text-red-700",
  },
  new: {
    label: "New",
    className: "bg-emerald-100 text-emerald-700",
  },
  trending: {
    label: "Trending",
    className: "bg-violet-100 text-violet-700",
  },
};
