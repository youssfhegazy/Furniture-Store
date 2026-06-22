"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { formatCompact, formatMoney } from "@/lib/admin-data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: { label: "Revenue", color: "#d97706" },
  target: { label: "Target", color: "#b08968" },
} satisfies ChartConfig;

export function RevenueLineChart({
  data,
}: {
  data: { month: string; revenue: number }[];
}) {
  // Pair each month with a smoothed target line for context.
  const series = data.map((d, i) => ({
    ...d,
    target: Math.round(
      (data.slice(Math.max(0, i - 1), i + 2).reduce((a, m) => a + m.revenue, 0) /
        data.slice(Math.max(0, i - 1), i + 2).length) *
        0.96
    ),
  }));

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full px-2">
      <LineChart data={series} margin={{ left: 4, right: 12, top: 12, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={44}
          tickFormatter={(v) => formatCompact(Number(v))}
        />
        <ChartTooltip
          cursor={{ stroke: "#e7e5e4" }}
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-stone-500">{chartConfig[name as keyof typeof chartConfig]?.label ?? String(name)}</span>
                  <span className="font-mono font-medium text-stone-900">
                    {formatMoney(Number(value))}
                  </span>
                </div>
              )}
            />
          }
        />
        <Line
          dataKey="target"
          type="monotone"
          stroke="var(--color-target)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
        />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--color-revenue)" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
