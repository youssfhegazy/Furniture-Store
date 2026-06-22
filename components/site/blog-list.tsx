"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Send } from "lucide-react";

import { BLOG_PER_PAGE } from "@/lib/data";
import type { BlogPostRecord } from "@/lib/queries";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  XIcon,
} from "@/components/icons/socials";
import { cn } from "@/lib/utils";

const socials = [InstagramIcon, XIcon, FacebookIcon, PinterestIcon];

function buildPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

export function BlogList({ posts }: { posts: BlogPostRecord[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_PER_PAGE));
  const start = (page - 1) * BLOG_PER_PAGE;
  const visible = posts.slice(start, start + BLOG_PER_PAGE);
  const pageItems = buildPages(page, totalPages);

  return (
    <section className="container-x py-12 lg:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">
        About Our Blog
      </h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
        At Furniture FurniFlex., we&apos;re passionate about more than just
        furniture; we&apos;re dedicated to helping you create a home that
        reflects your unique style and personality. Our blog is your go-to
        resource for the latest trends, design tips, and practical advice on all
        things related to home decor and furnishings.
      </p>

      {/* Grid */}
      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
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
              <h2 className="mt-4 text-lg font-semibold text-ink transition-colors group-hover:text-gold">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                by {post.author} on{" "}
                <span className="text-gold">{post.date}</span>
              </p>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:bg-ink/5 disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Prev
          </button>
          {pageItems.map((item, i) =>
            item === "…" ? (
              <span key={`gap-${i}`} className="px-1 text-ink-soft">
                …
              </span>
            ) : (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full text-sm transition-colors",
                  page === item
                    ? "bg-gold/15 font-semibold text-gold"
                    : "text-ink-soft hover:bg-ink/5"
                )}
              >
                {item}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Community + Share */}
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-teal p-8 text-white lg:p-10">
          <h3 className="text-2xl font-semibold">Join Our Community</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            We invite you to join our growing community of design enthusiasts,
            DIY lovers, and home improvement aficionados. Subscribe to our
            newsletter to get the latest blog posts delivered straight to your
            inbox, and follow us on social media for daily inspiration and
            updates.
          </p>
          <form className="mt-6 flex max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5 pl-4">
            <Mail className="h-4 w-4 shrink-0 text-white/60" />
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-6 flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-muted/50 p-8 lg:p-10">
          <h3 className="text-2xl font-semibold text-ink">Share Your Story</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Have a furniture transformation or a home decor success story to
            share? We&apos;d love to feature you on our blog! Submit your story
            and photos to
          </p>
          <p className="mt-2 text-sm font-medium text-gold">
            Email: mdaminur.oc@gmail.com
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
            Thank you for visiting the Furniture Emporium Blog. We&apos;re
            excited to be part of your journey in creating a beautiful,
            comfortable, and stylish home
          </p>
        </div>
      </div>
    </section>
  );
}
