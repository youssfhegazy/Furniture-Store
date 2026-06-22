import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { ContentPage } from "@/components/site/content-page";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — FurniFlex",
  description: "The terms that govern your use of FurniFlex.",
};

export default function TermsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Terms & Conditions" />
        <ContentPage
          updated="June 21, 2026"
          intro="By accessing and shopping with FurniFlex you agree to the following terms. Please read them carefully."
          sections={[
            {
              heading: "Use of our site",
              paragraphs: [
                "You agree to use FurniFlex for lawful purposes only and not to misuse the site, attempt to disrupt it, or infringe the rights of others.",
              ],
            },
            {
              heading: "Orders & pricing",
              paragraphs: [
                "All orders are subject to acceptance and availability. We reserve the right to correct pricing errors and to cancel any order affected by such an error, with a full refund where payment has been taken.",
              ],
            },
            {
              heading: "Product information",
              paragraphs: [
                "We work hard to display colours and finishes accurately, but slight variations can occur between screens and natural materials such as wood and leather.",
              ],
            },
            {
              heading: "Limitation of liability",
              paragraphs: [
                "To the extent permitted by law, FurniFlex is not liable for indirect or consequential losses arising from the use of our products or website.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
