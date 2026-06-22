import Link from "next/link";

import { orders, formatMoney } from "@/lib/admin-data";
import { Card, CardHeader } from "./card";
import { StatusBadge } from "./status-badge";

const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export function RecentOrders() {
  const recent = orders.slice(0, 6);

  return (
    <Card>
      <CardHeader
        title="Recent Orders"
        subtitle="Latest transactions across the store"
        action={
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            View all
          </Link>
        }
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-left text-xs uppercase tracking-wide text-stone-400">
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((o) => (
              <tr key={o.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60">
                <td className="px-5 py-3.5 font-medium text-stone-900">#{o.id}</td>
                <td className="px-5 py-3.5">
                  <span className="font-medium text-stone-700">{o.customer}</span>
                  <span className="block text-xs text-stone-400">{o.product}</span>
                </td>
                <td className="px-5 py-3.5 text-stone-500">{dateFmt(o.date)}</td>
                <td className="px-5 py-3.5 font-semibold text-stone-900">{formatMoney(o.amount)}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={o.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
