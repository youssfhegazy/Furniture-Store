import type { Metadata } from "next";
import { Suspense } from "react";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { ProductsBrowser } from "@/components/site/products-browser";
import { FeatureBar } from "@/components/site/feature-bar";
import { Footer } from "@/components/site/footer";
import { getProducts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Products — FurniFlex",
  description: "Browse our full collection of modern furniture.",
};

// Prerender this page and refresh the product list hourly (ISR). The `?category`
// deep-link is read on the client (ProductsBrowser), so the page no longer has to
// render dynamically / block on a live DB query per request — it loads instantly.
export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Products" />
        {/* Suspense boundary required for the client-side useSearchParams in ProductsBrowser. */}
        <Suspense fallback={null}>
          <ProductsBrowser products={products} />
        </Suspense>
        <FeatureBar />
      </main>
      <Footer />
    </>
  );
}
