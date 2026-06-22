import { PageHeader } from "@/components/admin/page-header";
import { OrdersTable } from "@/components/admin/orders-table";

export default function AdminOrdersPage() {
  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Track and update orders — from production through to delivery."
      />
      <OrdersTable />
    </>
  );
}
