"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
  orders as seedOrders,
  ORDER_STATUSES,
  formatMoney,
  type Order,
  type OrderStatus,
} from "@/lib/admin-data";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { StatusBadge } from "./status-badge";
import { OrderStatusMenu } from "./order-status-menu";

const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

type Filter = "All" | OrderStatus;
const filters: Filter[] = ["All", ...ORDER_STATUSES];

export function OrdersTable() {
  const [items, setItems] = useState<Order[]>(seedOrders);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: items.length };
    for (const s of ORDER_STATUSES) map[s] = items.filter((o) => o.status === s).length;
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (o) =>
        (filter === "All" || o.status === filter) &&
        (q === "" ||
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q))
    );
  }, [items, filter, query]);

  function updateStatus(id: string, status: OrderStatus) {
    // Wire to PATCH /api/orders/[id] when the DB is connected.
    setItems((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <Card>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 p-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            )}
          >
            {f}
            <span
              className={cn(
                "rounded-full px-1.5 text-xs",
                filter === f ? "bg-white/20 text-white" : "bg-white text-stone-500"
              )}
            >
              {counts[f] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="border-b border-stone-100 p-4">
        <div className="relative sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order ID or customer…"
            className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 pl-10 pr-3 text-sm text-stone-700 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-left text-xs uppercase tracking-wide text-stone-400">
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Items</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60">
                <td className="px-5 py-3.5 font-medium text-stone-900">#{o.id}</td>
                <td className="px-5 py-3.5">
                  <span className="font-medium text-stone-700">{o.customer}</span>
                  <span className="block text-xs text-stone-400">{o.email}</span>
                </td>
                <td className="px-5 py-3.5 text-stone-500">{dateFmt(o.date)}</td>
                <td className="px-5 py-3.5 text-stone-600">{o.items}</td>
                <td className="px-5 py-3.5 font-semibold text-stone-900">{formatMoney(o.amount)}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end">
                    <OrderStatusMenu current={o.status} onChange={(s) => updateStatus(o.id, s)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-5 py-12 text-center text-sm text-stone-400">No orders match this filter.</p>
        )}
      </div>

      <div className="border-t border-stone-100 px-5 py-3 text-xs text-stone-400">
        Showing {filtered.length} of {items.length} orders
      </div>
    </Card>
  );
}
