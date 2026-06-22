"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ChevronDown,
  ChevronsRight,
  MinusCircle,
  Star,
  StarHalf,
} from "lucide-react";

import type { Review, ShopProduct } from "@/lib/data";
import {
  additionalInformation,
  productAbout,
  productDescription,
  reviewSortOptions,
  REVIEWS_PER_PAGE,
  reviewSummary,
  technicalDetails,
  warranty,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const TABS = ["Description", "Product Information", "Review"] as const;
type Tab = (typeof TABS)[number];

/* ---------- Shared ---------- */

function Stars({ value, className }: { value: number; className?: string }) {
  const full = Math.floor(value);
  const half = value - full >= 0.3;
  return (
    <span className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)
          return <Star key={i} className="h-4 w-4 fill-gold text-gold" />;
        if (i === full && half)
          return <StarHalf key={i} className="h-4 w-4 fill-gold text-gold" />;
        return <Star key={i} className="h-4 w-4 text-gold/40" />;
      })}
    </span>
  );
}

/* ---------- Product Information ---------- */

function InfoTable({
  title,
  columns,
  children,
}: {
  title: string;
  columns: [string, string];
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-ink">{title}</h3>
      <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10">
        <div className="grid grid-cols-[1fr_1.3fr] bg-teal text-white">
          <div className="px-5 py-3.5 text-sm font-medium">{columns[0]}</div>
          <div className="px-5 py-3.5 text-sm font-medium">{columns[1]}</div>
        </div>
        {children}
      </div>
    </div>
  );
}

function InfoRow({
  label,
  index,
  children,
}: {
  label?: string;
  index: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid min-h-[56px] grid-cols-[1fr_1.3fr] items-center",
        index % 2 === 1 && "bg-muted/60"
      )}
    >
      <div className="px-5 py-3.5 text-sm text-ink-soft">{label}</div>
      <div className="px-5 py-3.5 text-sm text-ink">{children}</div>
    </div>
  );
}

function ProductInformation({ product }: { product: ShopProduct }) {
  const techRows = technicalDetails.map(([label, value], i) => {
    // reflect the real product where it makes sense
    const v = label === "Color" ? product.color : value;
    return (
      <InfoRow key={label} label={label} index={i}>
        {v}
      </InfoRow>
    );
  });

  const padCount = Math.max(0, technicalDetails.length - additionalInformation.length);

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-2">
        <InfoTable title="Technical Details" columns={["Features", "Details"]}>
          {techRows}
        </InfoTable>

        <InfoTable
          title="Additional Information"
          columns={["Features", "Information"]}
        >
          {additionalInformation.map((row, i) => (
            <InfoRow key={row.label} label={row.label} index={i}>
              {row.type === "rating" ? (
                <span className="flex items-center gap-2">
                  <span className="font-medium text-ink">4.0</span>
                  <Stars value={4} />
                  <span className="text-ink-soft">7,900 ratings</span>
                </span>
              ) : (
                row.value
              )}
            </InfoRow>
          ))}
          {Array.from({ length: padCount }).map((_, i) => (
            <InfoRow key={`pad-${i}`} index={additionalInformation.length + i} />
          ))}
        </InfoTable>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-ink">Warranty &amp; Support</h3>
        <p className="mt-5 max-w-3xl text-ink-soft">
          {warranty.intro}
          <a href="#" className="text-gold underline underline-offset-2">
            {warranty.introLink}
          </a>
        </p>
        <p className="mt-4 max-w-3xl text-ink-soft">
          {warranty.manufacturer}
          <a href="#" className="text-gold underline underline-offset-2">
            {warranty.manufacturerLink}
          </a>
          {warranty.manufacturerTail}
        </p>
      </div>
    </div>
  );
}

/* ---------- Review ---------- */

function aspectStyles(sentiment: "positive" | "neutral" | "mixed") {
  if (sentiment === "positive")
    return { cls: "bg-teal/10 text-teal", icon: CheckCircle2 };
  if (sentiment === "mixed")
    return { cls: "bg-gold/10 text-gold", icon: MinusCircle };
  return { cls: "bg-muted text-ink-soft", icon: null };
}

// Page list centered on the current page, e.g. [1, "…", 4, 5, 6, "…", 32].
function buildReviewPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("…");
    result.push(p);
    prev = p;
  }
  return result;
}

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const active = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            aria-label={`${n} star`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
          >
            <Star
              className={cn(
                "h-6 w-6 transition-colors",
                active ? "fill-gold text-gold" : "text-gold/30"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [marked, setMarked] = useState(false);

  const toggleHelpful = () => {
    setHelpful((h) => h + (marked ? -1 : 1));
    setMarked((m) => !m);
  };

  return (
    <li className="border-b border-ink/10 pb-8 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={review.name} className="h-10 w-10 shrink-0 text-sm" />
          <div>
            <p className="font-medium text-ink">{review.name}</p>
            {review.verified && (
              <p className="text-xs font-medium text-teal">Verified Purchase</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-ink-soft">{review.date}</p>
          <Stars value={review.rating} className="mt-1 justify-end" />
        </div>
      </div>

      <h4 className="mt-4 font-semibold text-ink">{review.title}</h4>
      <p className="mt-2 max-w-4xl text-sm leading-relaxed text-ink-soft">
        {review.text}
      </p>

      {review.image && (
        <div className="relative mt-4 h-32 w-40 overflow-hidden rounded-lg bg-muted">
          <Image
            src={review.image}
            alt="Customer photo"
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      )}

      <p className="mt-4 text-sm text-ink-soft">
        {helpful} people found this helpful
      </p>
      <div className="mt-3 flex items-center gap-3 text-sm">
        <button
          onClick={toggleHelpful}
          className={cn(
            "rounded-full px-4 py-1.5 font-medium transition-colors",
            marked
              ? "bg-teal text-white"
              : "bg-muted text-ink hover:bg-ink/10"
          )}
        >
          {marked ? "Marked Helpful" : "Helpful"}
        </button>
        <button className="text-ink-soft transition-colors hover:text-ink">
          Report
        </button>
      </div>
    </li>
  );
}

function ReviewForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (r: Omit<Review, "id">) => void;
  onCancel: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;
    onSubmit({
      name: name.trim() || "Anonymous",
      avatar: "",
      verified: false,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      rating,
      title: title.trim(),
      text: text.trim(),
      helpful: 0,
    });
  };

  const inputCls =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 max-w-2xl rounded-2xl border border-ink/10 bg-muted/40 p-6"
    >
      <div>
        <label className="text-sm font-medium text-ink">Overall rating</label>
        <div className="mt-2">
          <StarInput value={rating} onChange={setRating} />
        </div>
      </div>
      <div className="mt-4">
        <input
          className={inputCls}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <input
          className={inputCls}
          placeholder="Add a headline"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mt-4">
        <textarea
          className={cn(inputCls, "min-h-28 resize-y")}
          placeholder="What did you like or dislike?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div className="mt-5 flex gap-3">
        <Button type="submit">Submit review</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function ReviewTab({ reviews }: { reviews: Review[] }) {
  const [sort, setSort] = useState(reviewSortOptions[0]);
  const [page, setPage] = useState(1);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const combined = useMemo(() => {
    const list = [...userReviews, ...reviews];
    switch (sort) {
      case "Top reviews":
        return [...list].sort((a, b) => b.helpful - a.helpful);
      case "Highest rated":
        return [...list].sort((a, b) => b.rating - a.rating);
      case "Lowest rated":
        return [...list].sort((a, b) => a.rating - b.rating);
      default:
        return list; // Recent reviews
    }
  }, [sort, userReviews, reviews]);

  const total = combined.length;
  const totalPages = Math.max(1, Math.ceil(total / REVIEWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * REVIEWS_PER_PAGE;
  const pageReviews = combined.slice(start, start + REVIEWS_PER_PAGE);
  const pageItems = buildReviewPages(safePage, totalPages);

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const changeSort = (v: string) => {
    setSort(v);
    setPage(1);
  };

  const addReview = (r: Omit<Review, "id">) => {
    setUserReviews((prev) => [{ id: Date.now(), ...r }, ...prev]);
    setShowForm(false);
    setSort(reviewSortOptions[0]);
    setPage(1);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Summary */}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="text-3xl font-semibold text-ink">Customer reviews</h3>
          <div className="mt-4 flex items-center gap-3">
            <Stars value={reviewSummary.average} className="gap-1" />
            <span className="font-medium text-ink">
              {reviewSummary.average} out of 5
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            {reviewSummary.totalRatings.toLocaleString()} global ratings
          </p>
        </div>

        <div className="flex flex-col justify-center gap-2.5">
          {reviewSummary.breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-3 text-sm">
              <span className="w-14 shrink-0 text-ink-soft">{b.star} Star</span>
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-gold"
                  style={{ width: `${b.pct}%` }}
                />
              </span>
              <span className="w-9 shrink-0 text-right text-ink-soft">
                {b.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer say */}
      <div className="mt-14">
        <h3 className="text-3xl font-semibold text-ink">Customer say</h3>
        <p className="mt-5 max-w-4xl leading-relaxed text-ink-soft">
          {reviewSummary.say}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {reviewSummary.aspects.map((a) => {
            const { cls, icon: Icon } = aspectStyles(a.sentiment);
            return (
              <span
                key={a.label}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium",
                  cls
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {a.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Toolbar */}
      <div
        ref={listRef}
        className="mt-12 flex scroll-mt-28 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-sm text-ink-soft">
          Showing {total === 0 ? 0 : start + 1}-{start + pageReviews.length} of{" "}
          {total} results
        </p>
        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <span>Short by:</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => changeSort(e.target.value)}
              className="appearance-none rounded-full border border-ink/15 bg-white py-2 pl-4 pr-9 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              {reviewSortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          </div>
        </div>
      </div>

      {/* Review list */}
      <ul className="mt-8 space-y-8">
        {pageReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        <button
          onClick={() => goToPage(safePage - 1)}
          disabled={safePage === 1}
          className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:bg-ink/5 disabled:opacity-40"
        >
          ← Prev
        </button>
        {pageItems.map((item, i) =>
          item === "…" ? (
            <span key={`gap-${i}`} className="px-1 text-ink-soft">
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => goToPage(item)}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full text-sm transition-colors",
                safePage === item
                  ? "bg-gold/15 font-semibold text-gold"
                  : "text-ink-soft hover:bg-ink/5"
              )}
            >
              {item}
            </button>
          )
        )}
        <button
          onClick={() => goToPage(safePage + 1)}
          disabled={safePage === totalPages}
          className="flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold"
        >
          Next →
        </button>
      </div>

      {/* Write a review */}
      <div className="mt-14">
        <h3 className="text-3xl font-semibold text-ink">Review this product</h3>
        <p className="mt-2 text-ink-soft">
          Share your thoughts with other customers
        </p>
        {showForm ? (
          <ReviewForm onSubmit={addReview} onCancel={() => setShowForm(false)} />
        ) : (
          <Button size="lg" className="mt-6" onClick={() => setShowForm(true)}>
            Write a customer review
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---------- Tabs shell ---------- */

export function ProductTabs({
  product,
  reviews,
}: {
  product: ShopProduct;
  reviews: Review[];
}) {
  const [tab, setTab] = useState<Tab>("Description");

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="flex flex-wrap justify-center gap-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full border px-6 py-2.5 text-sm font-medium transition-colors",
              t === tab
                ? "border-gold text-gold"
                : "border-ink/15 text-ink-soft hover:border-ink/30"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "Description" && (
          <div className="mx-auto max-w-4xl">
            <p className="leading-relaxed text-ink-soft">{productDescription}</p>
            <h3 className="mt-10 text-2xl font-semibold text-ink">
              About this item
            </h3>
            <ul className="mt-6 space-y-5">
              {productAbout.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <ChevronsRight className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "Product Information" && <ProductInformation product={product} />}

        {tab === "Review" && <ReviewTab reviews={reviews} />}
      </div>
    </section>
  );
}
