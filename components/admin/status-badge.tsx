import { cn } from "@/lib/utils";
import type { OrderStatus, StockState } from "@/lib/admin-data";

const orderStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Processing: "bg-sky-50 text-sky-700 ring-sky-200",
  "In Production": "bg-violet-50 text-violet-700 ring-violet-200",
  Shipped: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

const dotStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-500",
  Processing: "bg-sky-500",
  "In Production": "bg-violet-500",
  Shipped: "bg-indigo-500",
  Delivered: "bg-emerald-500",
  Cancelled: "bg-rose-500",
};

export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        orderStyles[status],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[status])} />
      {status}
    </span>
  );
}

const stockStyles: Record<StockState, string> = {
  "In Stock": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Low Stock": "bg-amber-50 text-amber-700 ring-amber-200",
  "Out of Stock": "bg-rose-50 text-rose-700 ring-rose-200",
};

export function StockBadge({ state, className }: { state: StockState; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        stockStyles[state],
        className
      )}
    >
      {state}
    </span>
  );
}
