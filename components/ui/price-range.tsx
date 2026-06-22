"use client";

import { cn } from "@/lib/utils";

export function PriceRange({
  min,
  max,
  value,
  onChange,
  className,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}) {
  const [lo, hi] = value;
  const pct = (n: number) => ((n - min) / (max - min)) * 100;

  return (
    <div className={cn("relative h-5 select-none", className)}>
      {/* track */}
      <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-ink/10" />
      {/* active fill */}
      <div
        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gold"
        style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
      />
      {/* low thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={lo}
        aria-label="Minimum price"
        onChange={(e) =>
          onChange([Math.min(Number(e.target.value), hi), hi])
        }
        className="pointer-events-none absolute inset-0 h-5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-white"
      />
      {/* high thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={hi}
        aria-label="Maximum price"
        onChange={(e) =>
          onChange([lo, Math.max(Number(e.target.value), lo)])
        }
        className="pointer-events-none absolute inset-0 h-5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-white"
      />
    </div>
  );
}
