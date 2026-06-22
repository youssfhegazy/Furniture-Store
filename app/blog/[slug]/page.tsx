import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPostBySlug, getBlogPosts } from "@/lib/queries";
import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { BlogDetail } from "@/components/site/blog-detail";
import { Footer } from "@/components/site/footer";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return { title: post ? `${post.title} — FurniFlex` : "Blog — FurniFlex" };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [post, latest] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);
  if (!post) notFound();

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Our Blog Details" />
        <BlogDetail post={post} latest={latest} />
      </main>
      <Footer />
    </>
  );
}
