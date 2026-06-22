import { PageHeader } from "@/components/admin/page-header";
import { ProductsTable } from "@/components/admin/products-table";

export default function AdminProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Manage your furniture catalogue, stock and pricing."
      />
      <ProductsTable />
    </>
  );
}
