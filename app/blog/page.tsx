import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { BlogList } from "@/components/site/blog-list";
import { Footer } from "@/components/site/footer";
import { getBlogPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Our Blog — FurniFlex",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Our Blog" />
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  );
}
