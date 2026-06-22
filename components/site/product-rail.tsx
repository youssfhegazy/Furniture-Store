import type { ReactNode } from "react";

import type { ShopProduct } from "@/lib/data";
import { ShopProductCard } from "@/components/site/shop-product-card";

export function ProductRail({
  title,
  subtitle,
  products,
  action,
}: {
  title: string;
  subtitle?: string;
  products: ShopProduct[];
  action?: ReactNode;
}) {
  return (
    <section className="container-x py-8 lg:py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>
          )}
        </div>
        {action}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {products.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
