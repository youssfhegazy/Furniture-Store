import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "./card";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "amber",
  hint,
}: {
  label: string;
  value: string;
  delta: number;
  icon: LucideIcon;
  accent?: "amber" | "teal" | "wood" | "rose";
  hint?: string;
}) {
  const up = delta >= 0;
  const accents: Record<string, string> = {
    amber: "bg-amber-100 text-amber-700",
    teal: "bg-teal/10 text-teal",
    wood: "bg-orange-100 text-orange-700",
    rose: "bg-rose-100 text-rose-700",
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className={cn("grid h-11 w-11 place-items-center rounded-xl", accents[accent])}>
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold",
            up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}
        >
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {Math.abs(delta)}%
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-stone-900">{value}</p>
      <p className="mt-1 text-sm text-stone-500">{label}</p>
      {hint && <p className="mt-2 text-xs text-stone-400">{hint}</p>}
    </Card>
  );
}
