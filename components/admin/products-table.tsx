"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Filter } from "lucide-react";

import { categoryOptions, formatMoney, type AdminProduct } from "@/lib/admin-data";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type ApiProduct,
} from "@/lib/admin-client";
import { cn } from "@/lib/utils";
import { Spinner, LoadingState } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast";
import { Card } from "./card";
import { StockBadge } from "./status-badge";
import {
  ProductFormModal,
  toAdminProduct,
  type ProductPayload,
} from "./product-form-modal";

export function ProductsTable() {
  const { toast } = useToast();
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ApiProduct | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      setItems(await listProducts());
    } catch (err) {
      toast.error("Couldn't load products", { description: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    // Seed the filter from a ?q= param (e.g. coming from the topbar search).
    const initial = new URLSearchParams(window.location.search).get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial) setQuery(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows: AdminProduct[] = useMemo(
    () => items.map((p, i) => toAdminProduct(p, i + 1)),
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (q === "" || p.name.toLowerCase().includes(q))
    );
  }, [rows, query, category]);

  async function handleSubmit(payload: ProductPayload) {
    if (editing) {
      const updated = await updateProduct(editing.slug, payload);
      setItems((prev) => prev.map((p) => (p.slug === editing.slug ? { ...p, ...updated } : p)));
      toast.success("Product updated", { description: payload.name });
    } else {
      const created = await createProduct(payload);
      setItems((prev) => [created, ...prev]);
      toast.success("Product added", { description: payload.name });
    }
  }

  async function handleDelete(slug: string, name: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(slug);
    try {
      await deleteProduct(slug);
      setItems((prev) => prev.filter((p) => p.slug !== slug));
      toast.success("Product deleted", { description: name });
    } catch (err) {
      toast.error("Delete failed", { description: (err as Error).message });
    } finally {
      setDeleting(null);
    }
  }

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(slug: string) {
    const raw = items.find((p) => p.slug === slug) ?? null;
    setEditing(raw);
    setModalOpen(true);
  }

  return (
    <>
      <Card>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 pl-10 pr-3 text-sm text-stone-700 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 rounded-lg border border-stone-200 bg-white pl-9 pr-8 text-sm text-stone-700 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              >
                <option value="All">All Categories</option>
                {categoryOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              onClick={openAdd}
              className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg bg-amber-500 px-4 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-600"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Material</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.slug} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-11 w-11 rounded-lg object-cover ring-1 ring-stone-200"
                      />
                      <div>
                        <p className="font-medium text-stone-900">{p.name}</p>
                        <p className="text-xs text-stone-400">SKU-{String(p.id).padStart(4, "0")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-stone-600">{p.category}</td>
                  <td className="px-5 py-3 text-stone-600">{p.material}</td>
                  <td className="px-5 py-3 font-semibold text-stone-900">{formatMoney(p.price)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <StockBadge state={p.stockState} />
                      <span className="text-xs text-stone-400">{p.stock}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(p.slug)}
                        aria-label={`Edit ${p.name}`}
                        className="grid h-8 w-8 place-items-center rounded-lg text-stone-500 hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.slug, p.name)}
                        disabled={deleting === p.slug}
                        aria-label={`Delete ${p.name}`}
                        className="grid h-8 w-8 place-items-center rounded-lg text-stone-500 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                      >
                        {deleting === p.slug ? <Spinner size="sm" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <LoadingState label="Loading products…" />}
          {!loading && filtered.length === 0 && (
            <p className="px-5 py-12 text-center text-sm text-stone-400">
              No products match your filters.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className={cn("border-t border-stone-100 px-5 py-3 text-xs text-stone-400")}>
          Showing {filtered.length} of {items.length} products
        </div>
      </Card>

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        product={editing}
      />
    </>
  );
}
