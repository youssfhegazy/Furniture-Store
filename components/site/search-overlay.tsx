"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefreshCw, Search, Settings2 } from "lucide-react";

type SearchProduct = { id: number | string; slug: string; name: string };

function pickRandom<T>(arr: T[], n: number) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [seed, setSeed] = useState(0);
  const [products, setProducts] = useState<SearchProduct[]>([]);

  // Load the catalog from the API the first time the overlay opens.
  useEffect(() => {
    if (!open || products.length) return;
    let cancelled = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setProducts(json.data ?? []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open, products.length]);

  // Focus the input + close on Escape or any click outside the panel.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, onClose]);

  const topChoices = useMemo(
    () => pickRandom(products, 5),
    // reshuffle when seed changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, products]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topChoices;
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query, topChoices, products]);

  if (!open) return null;

  const submit = () => {
    if (results[0]) {
      router.push(`/products/${results[0].slug}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="container-x relative pt-6">
       <div ref={panelRef}>
        {/* Search bar */}
        <div className="flex items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-xl">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Search products..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-soft focus:outline-none"
          />
          <button
            aria-label="Filters"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5"
          >
            <Settings2 className="h-5 w-5" />
          </button>
          <button
            onClick={submit}
            className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-3 rounded-2xl bg-white p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">
              {query.trim() ? "Results" : "Top Choices for You"}
            </p>
            {!query.trim() && (
              <button
                onClick={() => setSeed((s) => s + 1)}
                className="flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-gold decoration-2 underline-offset-4"
              >
                Refresh <RefreshCw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <ul className="mt-3 divide-y divide-ink/5">
            {results.length === 0 && (
              <li className="py-3 text-sm text-ink-soft">
                No products match &ldquo;{query}&rdquo;.
              </li>
            )}
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/products/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 py-3 text-sm text-ink transition-colors hover:text-gold"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-ink-soft">
                    <Search className="h-4 w-4" />
                  </span>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
       </div>
      </div>
    </div>
  );
}
