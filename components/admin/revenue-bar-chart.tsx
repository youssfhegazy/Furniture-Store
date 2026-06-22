"use client";

import { useState } from "react";

import { formatMoney } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

/**
 * Lightweight SVG bar chart — a drop-in placeholder for a Recharts
 * <BarChart>. Swap for Recharts later; the data shape already matches.
 */
export function RevenueBarChart({ data }: { data: { month: string; revenue: number }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="px-5 py-6">
      <div className="flex h-56 items-end gap-2 sm:gap-3">
        {data.map((d, i) => {
          const pct = (d.revenue / max) * 100;
          const isActive = active === i;
          return (
            <div
              key={d.month}
              className="group relative flex h-full flex-1 flex-col items-center justify-end gap-2"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {isActive && (
                <div className="absolute -top-9 z-10 whitespace-nowrap rounded-lg bg-stone-900 px-2.5 py-1 text-xs font-medium text-white shadow-lg">
                  {formatMoney(d.revenue)}
                </div>
              )}
              <div
                className={cn(
                  "w-full rounded-t-md transition-all duration-300",
                  isActive ? "bg-amber-500" : "bg-amber-400/70 group-hover:bg-amber-500"
                )}
                style={{ height: `${pct}%` }}
              />
              <span className="text-[11px] font-medium text-stone-400">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
