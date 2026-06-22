import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { ContactView } from "@/components/site/contact-view";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Contact Us — FurniFlex",
};

export default function ContactPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Contact Us" />
        <ContactView />
      </main>
      <Footer />
    </>
  );
}
