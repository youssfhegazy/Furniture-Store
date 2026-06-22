import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { getFaqs } from "@/lib/queries";

export const metadata: Metadata = {
  title: "FAQ — FurniFlex",
  description: "Answers to the questions we hear most often.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="FAQ" />
        <Faq faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
