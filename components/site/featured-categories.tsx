"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { featuredCategories } from "@/lib/data";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

export function FeaturedCategories() {
  const railRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  // Derive the active page + page count from the rail's real scroll position,
  // so the dots track scrolling and dragging (not just arrow clicks).
  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const { scrollLeft, clientWidth, scrollWidth } = rail;
    const max = scrollWidth - clientWidth;
    const pages = Math.max(1, Math.round(scrollWidth / clientWidth));
    setPageCount(pages);
    setPage(max <= 1 ? 0 : Math.round((scrollLeft / max) * (pages - 1)));
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollToPage = (p: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    rail.scrollTo({ left: (p / Math.max(1, pageCount - 1)) * max, behavior: "smooth" });
  };

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: rail.clientWidth * 0.8 * dir, behavior: "smooth" });
  };

  const atStart = page === 0;
  const atEnd = page >= pageCount - 1;

  return (
    <section className="container-x py-12 lg:py-16">
      <SectionHeading title="Featured Categories">
        <div className="flex gap-3">
          <button
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Previous categories"
            className="grid h-11 w-14 place-items-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-ink/5 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="Next categories"
            className="grid h-11 w-14 place-items-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark disabled:opacity-40 disabled:hover:bg-gold"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </SectionHeading>

      <div
        ref={railRef}
        onScroll={sync}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {featuredCategories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className="group flex w-36 shrink-0 snap-start flex-col items-center text-center sm:w-44"
          >
            <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-full bg-muted transition-colors group-hover:bg-gold/10">
              <Image
                src={cat.image}
                alt={cat.name}
                width={220}
                height={220}
                className="h-28 w-28 rounded-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-32 sm:w-32"
              />
            </div>
            <p className="mt-4 text-base font-semibold text-ink">{cat.name}</p>
            <p className="mt-1 text-xs text-ink-soft">
              Discover {cat.count} Products
            </p>
          </Link>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === page ? "w-8 bg-teal" : "w-1.5 bg-ink/20 hover:bg-ink/40"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
