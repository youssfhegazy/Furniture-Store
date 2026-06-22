"use client";

import { useState } from "react";

import { salesByCategory } from "@/lib/admin-data";

/**
 * SVG donut chart — placeholder for a Recharts <PieChart>. Segments are drawn
 * with stroke-dasharray so no charting dependency is required.
 */
export function CategoryDonutChart({ data = salesByCategory }: { data?: typeof salesByCategory }) {
  const [active, setActive] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = 60;
  const circ = 2 * Math.PI * radius;

  let offset = 0;
  const segments = data.map((d, i) => {
    const fraction = d.value / total;
    const seg = { ...d, i, dash: fraction * circ, offset };
    offset += fraction * circ;
    return seg;
  });

  const focused = active !== null ? data[active] : null;

  return (
    <div className="flex flex-col items-center gap-6 px-5 py-6 sm:flex-row sm:justify-around">
      <div className="relative h-44 w-44 shrink-0">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#f5f5f4" strokeWidth="18" />
          {segments.map((s) => (
            <circle
              key={s.name}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={active === s.i ? 22 : 18}
              strokeDasharray={`${s.dash} ${circ - s.dash}`}
              strokeDashoffset={-s.offset}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setActive(s.i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-stone-900">
            {focused ? `${focused.value}%` : `${total}%`}
          </span>
          <span className="max-w-24 text-center text-[11px] text-stone-400">
            {focused ? focused.name : "Total Sales"}
          </span>
        </div>
      </div>

      <ul className="grid w-full max-w-xs grid-cols-1 gap-2.5 sm:w-auto">
        {data.map((d, i) => (
          <li
            key={d.name}
            className="flex items-center justify-between gap-6 text-sm"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="flex items-center gap-2 text-stone-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.name}
            </span>
            <span className="font-semibold text-stone-900">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
