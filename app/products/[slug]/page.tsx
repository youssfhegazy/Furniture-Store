import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { productDetail } from "@/lib/data";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  getReviews,
} from "@/lib/queries";
import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { ProductGallery } from "@/components/site/product-gallery";
import { ProductPurchase } from "@/components/site/product-purchase";
import { ProductTabs } from "@/components/site/product-tabs";
import { ProductRail } from "@/components/site/product-rail";
import { Footer } from "@/components/site/footer";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product ? `${product.name} — FurniFlex` : "Product — FurniFlex",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const detail = productDetail(product);
  const type = product.name.split(" ").pop() ?? "Item";
  const [similar, frequentPool, reviews] = await Promise.all([
    getRelatedProducts(product, 4),
    getRelatedProducts(product, 8),
    getReviews(),
  ]);
  const frequent = frequentPool.slice(4, 8);

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title={`Products/${type}/Product Details`} />

        {/* Main product */}
        <section className="container-x py-10 lg:py-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-medium text-gold transition-colors hover:text-gold-dark"
          >
            <ArrowLeft className="h-5 w-5" /> Back to product
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <ProductGallery images={detail.gallery} name={product.name} />
            <ProductPurchase product={product} />
          </div>
        </section>

        {/* Tabs */}
        <ProductTabs product={product} reviews={reviews} />

        {/* Related rails */}
        <ProductRail
          title="Discover similar items"
          products={similar}
          action={
            <Link
              href="/products"
              className="text-sm font-medium text-gold underline decoration-gold decoration-2 underline-offset-4"
            >
              More filters
            </Link>
          }
        />
        <ProductRail
          title="Customers frequently viewed"
          subtitle="Popular products in the last 7 days"
          products={frequent}
          action={<span className="text-sm text-ink-soft">Page 1 of 3</span>}
        />
      </main>
      <Footer />
    </>
  );
}
