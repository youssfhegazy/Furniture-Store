import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { CategoriesView } from "@/components/site/categories-view";
import { FeatureBar } from "@/components/site/feature-bar";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Categories — FurniFlex",
};

export default function CategoriesPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Categories" />
        <CategoriesView />
        <FeatureBar />
      </main>
      <Footer />
    </>
  );
}
