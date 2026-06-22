import type { Metadata } from "next";
import Link from "next/link";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { ContentPage } from "@/components/site/content-page";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Help Center — FurniFlex",
  description: "Find answers and get in touch with FurniFlex support.",
};

export default function HelpPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Help Center" />
        <ContentPage
          intro="Need a hand? Browse the quick answers below, or reach our team directly — we're available 24/7."
          sections={[
            {
              heading: "Orders & tracking",
              paragraphs: [
                "Track any order from your profile. Status moves through Processing, In Production, Shipped and Delivered so you always know where your furniture is.",
              ],
            },
            {
              heading: "Payments",
              paragraphs: [
                "We accept major cards and Alma instalments. Your payment details are encrypted and never stored on our servers.",
              ],
            },
            {
              heading: "Returns & warranty",
              paragraphs: [
                "Most items can be returned within 30 days, and every piece is covered by our manufacturer warranty. See the Returns and Delivery pages for full details.",
              ],
            },
          ]}
        />
        <div className="container-x pb-16">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl bg-muted p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ink">Still need help?</h3>
              <p className="mt-1 text-sm text-ink-soft">
                Our support team typically replies within minutes.
              </p>
            </div>
            <Button asChild className="shrink-0">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
