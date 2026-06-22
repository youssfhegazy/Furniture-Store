import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getBlogPosts } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export async function Blog() {
  const blogPosts = await getBlogPosts();

  return (
    <section className="container-x py-12 lg:py-16">
      <SectionHeading title="Explore Our Latest Blog">
        <Reveal delay={0.1}>
          <Button asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </SectionHeading>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.slice(0, 3).map((post, i) => (
          <Reveal key={post.id} delay={i * 0.1}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink transition-colors group-hover:text-gold">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  by {post.author} on{" "}
                  <span className="text-gold">{post.date}</span>
                </p>
              </article>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
