import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { OrderCompleted } from "@/components/site/order-completed";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Order Completed — FurniFlex",
};

export default function OrderCompletedPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Order Completed" />
        <OrderCompleted />
      </main>
      <Footer />
    </>
  );
}
