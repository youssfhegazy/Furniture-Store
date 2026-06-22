"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";

import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type ApiCategory,
} from "@/lib/admin-client";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { Spinner, LoadingState } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast";
import { CategoryFormModal, type CategoryPayload } from "@/components/admin/category-form-modal";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=400&q=80";

export function CategoriesManager() {
  const { toast } = useToast();
  const [items, setItems] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ApiCategory | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      setItems(await listCategories());
    } catch (err) {
      toast.error("Couldn't load categories", { description: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(payload: CategoryPayload) {
    if (editing) {
      const updated = await updateCategory(editing.slug, payload);
      setItems((prev) => prev.map((c) => (c.slug === editing.slug ? { ...c, ...updated } : c)));
      toast.success("Category updated", { description: payload.name });
    } else {
      const created = await createCategory(payload);
      setItems((prev) => [...prev, created]);
      toast.success("Category added", { description: payload.name });
    }
  }

  async function handleDelete(slug: string, name: string) {
    if (!confirm("Delete this category?")) return;
    setDeleting(slug);
    try {
      await deleteCategory(slug);
      setItems((prev) => prev.filter((c) => c.slug !== slug));
      toast.success("Category deleted", { description: name });
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

  function openEdit(c: ApiCategory) {
    setEditing(c);
    setModalOpen(true);
  }

  return (
    <>
      <PageHeader
        title="Categories"
        subtitle="Organise your catalogue into rooms and collections."
      >
        <button
          onClick={openAdd}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-amber-500 px-4 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </PageHeader>

      {loading ? (
        <LoadingState label="Loading categories…" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((c) => (
            <Card key={c.slug} className="group overflow-hidden">
              <div className="relative h-40 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image || FALLBACK_IMAGE}
                  alt={c.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-700 backdrop-blur">
                  <Package className="h-3.5 w-3.5" />
                  {c.count ?? 0} products
                </span>
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <h3 className="font-semibold text-stone-900">{c.name}</h3>
                  <p className="mt-0.5 text-sm text-stone-500">{c.blurb}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => openEdit(c)}
                    aria-label={`Edit ${c.name}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-stone-500 hover:bg-amber-50 hover:text-amber-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.slug, c.name)}
                    disabled={deleting === c.slug}
                    aria-label={`Delete ${c.name}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-stone-500 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                  >
                    {deleting === c.slug ? <Spinner size="sm" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CategoryFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        category={editing}
      />
    </>
  );
}
