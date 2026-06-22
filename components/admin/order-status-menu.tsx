"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Check } from "lucide-react";

import { ORDER_STATUSES, type OrderStatus } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

/** Per-row actions dropdown for changing an order's status. */
export function OrderStatusMenu({
  current,
  onChange,
}: {
  current: OrderStatus;
  onChange: (s: OrderStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        aria-label="Update status"
        onClick={() => setOpen((v) => !v)}
        className="grid h-8 w-8 place-items-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl">
          <p className="border-b border-stone-100 px-3 py-2 text-xs font-medium uppercase tracking-wide text-stone-400">
            Update status
          </p>
          <ul className="py-1">
            {ORDER_STATUSES.map((s) => (
              <li key={s}>
                <button
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-stone-50",
                    s === current ? "font-semibold text-amber-600" : "text-stone-700"
                  )}
                >
                  {s}
                  {s === current && <Check className="h-4 w-4" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
