import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { AboutView } from "@/components/site/about-view";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "About Us — FurniFlex",
};

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="About Us" />
        <AboutView />
      </main>
      <Footer />
    </>
  );
}
