import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { ContentPage } from "@/components/site/content-page";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Delivery Information — FurniFlex",
  description: "How FurniFlex ships and delivers your furniture.",
};

export default function DeliveryPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Delivery Information" />
        <ContentPage
          intro="We partner with specialist furniture couriers to get your pieces home safely. Here's what to expect from order to doorstep."
          sections={[
            {
              heading: "Shipping options",
              bullets: [
                "Standard delivery (5–10 business days) on in-stock items.",
                "White-glove delivery with assembly and room-of-choice placement for large pieces.",
                "Free standard shipping on orders over $500.",
              ],
            },
            {
              heading: "Lead times",
              paragraphs: [
                "Most in-stock items ship within 2 business days. Made-to-order and upholstered pieces are crafted on demand and typically take 2–4 weeks before they enter production tracking in your account.",
              ],
            },
            {
              heading: "Tracking your order",
              paragraphs: [
                "Once your order ships you'll receive a tracking link by email. You can also view live status — including \"In Production\" and \"Shipped\" — from your profile at any time.",
              ],
            },
            {
              heading: "Delivery appointments",
              paragraphs: [
                "For white-glove deliveries our team contacts you to schedule a 4-hour window. Please ensure doorways and stairwells can accommodate larger items; measurements are listed on every product page.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
