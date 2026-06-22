import { customers, formatMoney } from "@/lib/admin-data";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const statusStyles: Record<string, string> = {
  VIP: "bg-amber-50 text-amber-700 ring-amber-200",
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  New: "bg-sky-50 text-sky-700 ring-sky-200",
};

export default function AdminCustomersPage() {
  return (
    <>
      <PageHeader title="Customers" subtitle="Your shoppers and their lifetime value." />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Orders</th>
                <th className="px-5 py-3 font-medium">Total Spent</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} className="h-10 w-10 shrink-0 text-sm" />
                      <div>
                        <p className="font-medium text-stone-900">{c.name}</p>
                        <p className="text-xs text-stone-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-stone-600">{c.location}</td>
                  <td className="px-5 py-3 text-stone-600">{c.orders}</td>
                  <td className="px-5 py-3 font-semibold text-stone-900">{formatMoney(c.spent)}</td>
                  <td className="px-5 py-3 text-stone-500">{dateFmt(c.joined)}</td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
                        statusStyles[c.status]
                      )}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
