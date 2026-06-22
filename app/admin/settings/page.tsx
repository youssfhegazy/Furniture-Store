import { Store, Bell, CreditCard, Truck } from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { Card, CardHeader } from "@/components/admin/card";

const field =
  "h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30";
const labelCls = "mb-1.5 block text-sm font-medium text-stone-700";

function Toggle({ label, hint, on = false }: { label: string; hint: string; on?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-3">
      <span>
        <span className="block text-sm font-medium text-stone-800">{label}</span>
        <span className="block text-xs text-stone-400">{hint}</span>
      </span>
      <span className="relative inline-flex">
        <input type="checkbox" defaultChecked={on} className="peer sr-only" />
        <span className="h-6 w-11 rounded-full bg-stone-200 transition-colors peer-checked:bg-amber-500" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Configure your store profile and preferences.">
        <button className="inline-flex h-10 items-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-600">
          Save Changes
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Store profile */}
        <Card className="lg:col-span-2">
          <CardHeader
            title={
              <span className="flex items-center gap-2">
                <Store className="h-4 w-4 text-amber-600" /> Store Profile
              </span>
            }
            subtitle="Public details shown to your customers"
          />
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Store Name</label>
              <input className={field} defaultValue="FurniFlex" />
            </div>
            <div>
              <label className={labelCls}>Support Email</label>
              <input className={field} defaultValue="support@furniflex.com" />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input className={field} defaultValue="+1 (100) 234-5678" />
            </div>
            <div>
              <label className={labelCls}>Currency</label>
              <select className={field} defaultValue="USD">
                <option>USD — US Dollar</option>
                <option>EUR — Euro</option>
                <option>GBP — British Pound</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Store Address</label>
              <input className={field} defaultValue="5678 Seltice Way, Coeur d'Alene, ID" />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader
            title={
              <span className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-600" /> Notifications
              </span>
            }
          />
          <div className="divide-y divide-stone-100 px-5 py-2">
            <Toggle label="New order alerts" hint="Email me when an order is placed" on />
            <Toggle label="Low stock warnings" hint="Notify when stock drops below 8" on />
            <Toggle label="Customer reviews" hint="Alert me on new product reviews" />
            <Toggle label="Weekly summary" hint="A digest of store performance" on />
          </div>
        </Card>

        {/* Shipping & payments */}
        <Card>
          <CardHeader
            title={
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-600" /> Fulfilment
              </span>
            }
          />
          <div className="space-y-4 p-5">
            <div>
              <label className={labelCls}>Default Lead Time (days)</label>
              <input type="number" className={field} defaultValue={14} />
            </div>
            <div>
              <label className={labelCls}>Free Shipping Threshold ($)</label>
              <input type="number" className={field} defaultValue={500} />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2.5 text-sm text-stone-500">
              <CreditCard className="h-4 w-4 text-stone-400" />
              Payments handled via Stripe — connected
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
