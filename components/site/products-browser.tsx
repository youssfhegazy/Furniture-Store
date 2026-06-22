"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

import {
  filterGroups,
  PRODUCTS_PER_PAGE,
  type ShopProduct,
  sortOptions,
} from "@/lib/data";
import { ShopProductCard } from "@/components/site/shop-product-card";
import { PriceRange } from "@/components/ui/price-range";
import { cn } from "@/lib/utils";

/* ---------- Sidebar building blocks ---------- */

function FilterCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between"
      >
        <span className="text-lg font-semibold text-ink">{title}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-ink-soft" />
        ) : (
          <ChevronDown className="h-4 w-4 text-ink-soft" />
        )}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function RadioRow({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-full border px-4 py-2.5 text-sm transition-colors",
        selected
          ? "border-gold/40 bg-gold/10 font-medium text-gold"
          : "border-ink/10 text-ink-soft hover:border-ink/20"
      )}
    >
      <span
        className={cn(
          "grid h-4 w-4 shrink-0 place-items-center rounded-full border",
          selected ? "border-gold" : "border-ink/30"
        )}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-gold" />}
      </span>
      {label}
    </button>
  );
}

function PillToggle({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors",
        selected
          ? "border-gold/40 bg-gold/10 font-medium text-gold"
          : "border-ink/10 text-ink-soft hover:border-ink/20"
      )}
    >
      {label}
    </button>
  );
}

function SortSelect({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-full border border-ink/15 bg-white py-2 pl-4 pr-9 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
    </div>
  );
}

/* ---------- Pagination helper ---------- */

// Returns the page items to render, e.g. [1, "…", 4, 5, 6, "…", 14].
function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([
    1,
    total,
    current,
    current - 1,
    current + 1,
  ]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("…");
    result.push(p);
    prev = p;
  }
  return result;
}

/* ---------- Main browser ---------- */

export function ProductsBrowser({ products }: { products: ShopProduct[] }) {
  // Read the ?category deep-link on the client so the page itself stays static.
  const initialCategory = useSearchParams().get("category") ?? undefined;
  const validCategory =
    initialCategory && filterGroups.categories.includes(initialCategory)
      ? initialCategory
      : null;
  const [category, setCategory] = useState<string | null>(validCategory);
  const [materials, setMaterials] = useState<string[]>([]);
  const [color, setColor] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);
  const [price, setPrice] = useState<[number, number]>(filterGroups.priceBounds);
  const [sort, setSort] = useState(sortOptions[0]);
  const [size, setSize] = useState("Size");
  const [page, setPage] = useState(1);

  // Any filter change returns the user to the first page of results.
  const toggleMaterial = (m: string) => {
    setMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
    setPage(1);
  };
  const selectCategory = (c: string) => {
    setCategory((prev) => (prev === c ? null : c));
    setPage(1);
  };
  const selectColor = (c: string) => {
    setColor((prev) => (prev === c ? null : c));
    setPage(1);
  };
  const selectAvailability = (a: string) => {
    setAvailability((prev) => (prev === a ? null : a));
    setPage(1);
  };
  const changePrice = (v: [number, number]) => {
    setPrice(v);
    setPage(1);
  };
  const changeSort = (v: string) => {
    setSort(v);
    setPage(1);
  };

  const visible = useMemo(() => {
    const list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (materials.length > 0 && !materials.includes(p.material)) return false;
      if (color && p.color !== color) return false;
      if (availability) {
        const wantInStock = availability === "In Stock";
        if (p.inStock !== wantInStock) return false;
      }
      if (p.price < price[0] || p.price > price[1]) return false;
      return true;
    });

    switch (sort) {
      case "Price: Low to High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "Name: A to Z":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [products, category, materials, color, availability, price, sort]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paged = visible.slice(start, start + PRODUCTS_PER_PAGE);
  const rangeStart = visible.length === 0 ? 0 : start + 1;
  const rangeEnd = start + paged.length;
  const pageItems = buildPageList(safePage, totalPages);

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-72">
          <h2 className="mb-5 text-2xl font-semibold text-ink">Filter Option</h2>
          <div className="flex flex-col gap-5">
            <FilterCard title="Category">
              <div className="flex flex-col gap-2.5">
                {filterGroups.categories.map((c) => (
                  <RadioRow
                    key={c}
                    label={c}
                    selected={category === c}
                    onClick={() => selectCategory(c)}
                  />
                ))}
              </div>
            </FilterCard>

            <FilterCard title="Price">
              <p className="mb-4 text-sm text-ink-soft">
                ${price[0].toFixed(2)}-${price[1].toFixed(2)}
              </p>
              <PriceRange
                min={filterGroups.priceBounds[0]}
                max={filterGroups.priceBounds[1]}
                value={price}
                onChange={changePrice}
              />
            </FilterCard>

            <FilterCard title="Martial">
              <div className="flex flex-wrap gap-2.5">
                {filterGroups.materials.map((m) => (
                  <PillToggle
                    key={m}
                    label={m}
                    selected={materials.includes(m)}
                    onClick={() => toggleMaterial(m)}
                  />
                ))}
              </div>
            </FilterCard>

            <FilterCard title="Color">
              <div className="flex flex-col gap-2.5">
                {filterGroups.colors.map((c) => (
                  <RadioRow
                    key={c}
                    label={c}
                    selected={color === c}
                    onClick={() => selectColor(c)}
                  />
                ))}
              </div>
            </FilterCard>

            <FilterCard title="Availability">
              <div className="flex flex-col gap-2.5">
                {filterGroups.availability.map((a) => (
                  <RadioRow
                    key={a}
                    label={a}
                    selected={availability === a}
                    onClick={() => selectAvailability(a)}
                  />
                ))}
              </div>
            </FilterCard>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-soft">
              Showing {rangeStart}-{rangeEnd} of {visible.length} result
            </p>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-ink-soft sm:inline">
                Short by:
              </span>
              <SortSelect
                value={sort}
                onChange={changeSort}
                options={sortOptions}
                className="min-w-[160px]"
              />
              <SortSelect
                value={size}
                onChange={setSize}
                options={["Size", "Small", "Medium", "Large"]}
                className="min-w-[96px]"
              />
            </div>
          </div>

          {/* Grid */}
          {paged.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3">
              {paged.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-ink-soft">
              No products match these filters.
            </p>
          )}

          {/* Pagination — only when results span more than one page */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              <button
                onClick={() => setPage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Prev
              </button>

              {pageItems.map((item, i) =>
                item === "…" ? (
                  <span key={`gap-${i}`} className="px-1 text-ink-soft">
                    …
                  </span>
                ) : (
                  <PageButton
                    key={item}
                    n={item}
                    active={safePage === item}
                    onClick={() => setPage(item)}
                  />
                )
              )}

              <button
                onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
                className="flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PageButton({
  n,
  active,
  onClick,
}: {
  n: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full text-sm transition-colors",
        active
          ? "bg-gold/15 font-semibold text-gold"
          : "text-ink-soft hover:bg-ink/5"
      )}
    >
      {n}
    </button>
  );
}
