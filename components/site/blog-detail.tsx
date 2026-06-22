import Image from "next/image";
import Link from "next/link";

import { blogArticle } from "@/lib/data";
import type { BlogPostRecord } from "@/lib/queries";
import { Avatar } from "@/components/ui/avatar";
import { BlogLatestRail } from "@/components/site/blog-latest-rail";

export function BlogDetail({
  post,
  latest,
}: {
  post: BlogPostRecord;
  latest: BlogPostRecord[];
}) {
  return (
    <>
      <article className="container-x py-12 lg:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {blogArticle.welcomeTitle}
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
          {blogArticle.welcomeIntro}
        </p>

        {/* Featured image */}
        <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Meta + author */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-ink">{post.title}</h2>
            <p className="mt-1 text-sm text-ink-soft">
              by {post.author} on{" "}
              <span className="text-gold">{post.date}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar
              name={blogArticle.writtenBy.name}
              className="h-9 w-9 shrink-0 text-xs"
            />
            <div className="text-sm">
              <p className="text-ink-soft">Written by</p>
              <p className="font-medium text-ink">
                {blogArticle.writtenBy.name}
              </p>
            </div>
          </div>
        </div>

        {/* Body + sidebar */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px]">
          <div>
            <h3 className="text-2xl font-semibold text-ink">
              {blogArticle.title}
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {blogArticle.intro}
            </p>
            <div className="mt-8 space-y-8">
              {blogArticle.sections.map((s, i) => (
                <div key={s.title}>
                  <h4 className="text-lg font-semibold text-ink">
                    {i + 1}. {s.title}
                  </h4>
                  <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="space-y-4">
              {blogArticle.socials.map((s) => (
                <div key={s.platform}>
                  <p className="text-sm text-ink-soft">{s.platform}</p>
                  <p className="text-sm font-medium text-gold">{s.handle}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-ink">Categories Link</h4>
              <ul className="mt-3 space-y-2">
                {blogArticle.categories.map((c) => (
                  <li key={c}>
                    <Link
                      href="/blog"
                      className="text-sm text-gold underline-offset-4 hover:underline"
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      <BlogLatestRail posts={latest} />
    </>
  );
}
