import { DollarSign, ShoppingCart, Package, AlertTriangle } from "lucide-react";

import { dashboardStats, formatMoney, monthlyRevenue } from "@/lib/admin-data";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { Card, CardHeader } from "@/components/admin/card";
import { RevenueBarChart } from "@/components/admin/revenue-bar-chart";
import { RevenueLineChart } from "@/components/admin/revenue-line-chart";
import { CategoryDonutChart } from "@/components/admin/category-donut-chart";
import { RecentOrders } from "@/components/admin/recent-orders";

export default function AdminOverviewPage() {
  const s = dashboardStats;

  return (
    <>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back, Youssef — here's what's happening in your store today."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={formatMoney(s.revenue)}
          delta={s.revenueDelta}
          icon={DollarSign}
          accent="amber"
          hint="vs. previous 12 months"
        />
        <StatCard
          label="Total Orders"
          value={s.orders.toLocaleString()}
          delta={s.ordersDelta}
          icon={ShoppingCart}
          accent="teal"
          hint="across all channels"
        />
        <StatCard
          label="Total Products"
          value={s.products.toString()}
          delta={s.productsDelta}
          icon={Package}
          accent="wood"
          hint="active catalogue items"
        />
        <StatCard
          label="Low Stock Alerts"
          value={s.lowStock.toString()}
          delta={s.lowStockDelta}
          icon={AlertTriangle}
          accent="rose"
          hint="items need restocking"
        />
      </div>

      {/* Revenue trend (line) */}
      <div className="mt-6">
        <Card>
          <CardHeader
            title="Revenue Trend"
            subtitle={`Total ${formatMoney(monthlyRevenue.reduce((a, m) => a + m.revenue, 0))} over the last 12 months`}
          />
          <div className="px-3 pb-5 pt-2">
            <RevenueLineChart data={monthlyRevenue} />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader
            title="Monthly Revenue"
            subtitle={`Total ${formatMoney(monthlyRevenue.reduce((a, m) => a + m.revenue, 0))} over the last year`}
          />
          <RevenueBarChart data={monthlyRevenue} />
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Sales by Category" subtitle="Revenue share per room" />
          <CategoryDonutChart />
        </Card>
      </div>

      {/* Recent orders */}
      <div className="mt-6">
        <RecentOrders />
      </div>
    </>
  );
}
