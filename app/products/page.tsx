import type { Metadata } from "next";

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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await getProducts();

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Products" />
        <ProductsBrowser products={products} initialCategory={category} />
        <FeatureBar />
      </main>
      <Footer />
    </>
  );
}
