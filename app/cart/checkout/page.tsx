import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { CheckoutView } from "@/components/site/checkout-view";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Checkout — FurniFlex",
};

export default function CheckoutPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Shopping Cart/Checkout" />
        <CheckoutView />
      </main>
      <Footer />
    </>
  );
}
