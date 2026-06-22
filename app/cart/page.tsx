import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { CartView } from "@/components/site/cart-view";
import { FeatureBar } from "@/components/site/feature-bar";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Shopping Cart — FurniFlex",
};

export default function CartPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Shopping Cart" />
        <CartView />
        <FeatureBar />
      </main>
      <Footer />
    </>
  );
}
