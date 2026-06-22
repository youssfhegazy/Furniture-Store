import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { ContentPage } from "@/components/site/content-page";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Returns & Exchanges — FurniFlex",
  description: "Our 30-day return and exchange policy.",
};

export default function ReturnsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Returns & Exchanges" />
        <ContentPage
          intro="Not quite right? You have 30 days from delivery to return most items for a full refund. Here's how it works."
          sections={[
            {
              heading: "Eligibility",
              bullets: [
                "Items must be in original, unused condition with all packaging.",
                "Made-to-order and custom upholstered pieces are non-returnable unless faulty.",
                "Proof of purchase is required for every return.",
              ],
            },
            {
              heading: "How to start a return",
              paragraphs: [
                "Open your order in your profile, choose the item, and select \"Request return\". Our team will email a prepaid label or arrange pickup for larger pieces within 2 business days.",
              ],
            },
            {
              heading: "Refunds",
              paragraphs: [
                "Once we receive and inspect your return, refunds are issued to your original payment method within 5–7 business days. Original shipping costs are non-refundable except for faulty items.",
              ],
            },
            {
              heading: "Exchanges",
              paragraphs: [
                "Exchanges are free. Tell us the replacement you'd like and we'll arrange the swap once your original item is on its way back to us.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
