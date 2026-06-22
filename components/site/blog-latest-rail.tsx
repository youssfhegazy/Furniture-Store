"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { BlogPostRecord } from "@/lib/queries";

export function BlogLatestRail({ posts }: { posts: BlogPostRecord[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    railRef.current?.scrollBy({
      left: railRef.current.clientWidth * 0.8 * dir,
      behavior: "smooth",
    });
  };

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">
          Latest Blog
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="grid h-11 w-14 place-items-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-ink/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="grid h-11 w-14 place-items-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar mt-8 flex snap-x gap-6 overflow-x-auto pb-2"
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group w-64 shrink-0 snap-start sm:w-72"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="288px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-ink transition-colors group-hover:text-gold">
              {post.title}
            </h3>
            <p className="mt-1 text-xs text-ink-soft">
              by {post.author} on <span className="text-gold">{post.ago}</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
