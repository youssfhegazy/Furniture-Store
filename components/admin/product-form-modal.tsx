"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Plus, X } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

import {
  categoryOptions,
  materialOptions,
  woodTypes,
  colorOptions,
  type AdminProduct,
} from "@/lib/admin-data";
import { fileToDataUrl, type ApiProduct } from "@/lib/admin-client";
import { cn } from "@/lib/utils";

export type ProductPayload = {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  material: string;
  woodType: string;
  colors: string[];
  image: string;
  images: string[];
  inStock: boolean;
};

const swatch: Record<string, string> = {
  Brown: "#8b5e3c",
  Black: "#1c1917",
  White: "#f5f5f4",
  Grey: "#9ca3af",
  Blue: "#3b82f6",
  Green: "#16a34a",
  Red: "#dc2626",
  Orange: "#ea580c",
  Beige: "#e7d8c2",
};

const field =
  "h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30";
const labelCls = "mb-1.5 block text-sm font-medium text-stone-700";

const MAX_IMAGES = 4;
const MAX_BYTES = 5 * 1024 * 1024;

export function ProductFormModal({
  open,
  onClose,
  onSubmit,
  product,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: ProductPayload) => Promise<void>;
  product?: ApiProduct | null;
}) {
  const editing = Boolean(product);
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [material, setMaterial] = useState("Wood");
  const [woodType, setWoodType] = useState(woodTypes[0]);
  const [colors, setColors] = useState<string[]>(["Brown"]);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Prefill the form whenever the modal opens (for both add + edit).
  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);
    setName(product?.name ?? "");
    setDescription(product?.description ?? "");
    setCategory(product?.category ?? categoryOptions[0]);
    setPrice(product?.price != null ? String(product.price) : "");
    setStock(product?.stock != null ? String(product.stock) : "");
    setMaterial(product?.material ?? "Wood");
    setWoodType(product?.woodType ?? woodTypes[0]);
    setColors(product?.colors?.length ? product.colors : product?.color ? [product.color] : ["Brown"]);
    setImages(product?.images?.length ? product.images : product?.image ? [product.image] : []);
  }, [open, product]);

  if (!open) return null;

  const toggleColor = (c: string) =>
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    const room = MAX_IMAGES - images.length;
    const picked = Array.from(files).slice(0, room);
    for (const f of picked) {
      if (f.size > MAX_BYTES) {
        setError(`"${f.name}" is larger than 5MB.`);
        continue;
      }
      const url = await fileToDataUrl(f);
      setImages((prev) => (prev.length >= MAX_IMAGES ? prev : [...prev, url]));
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  const removeImage = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const priceNum = Number(price);
    const stockNum = Number(stock);
    if (!name.trim()) return setError("Product title is required.");
    if (!Number.isFinite(priceNum) || priceNum <= 0) return setError("Enter a valid price.");

    setSaving(true);
    setError(null);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        category,
        price: priceNum,
        stock: Number.isFinite(stockNum) ? stockNum : 0,
        material,
        woodType: material === "Wood" ? woodType : "",
        colors,
        image: images[0] ?? "",
        images,
        inStock: (Number.isFinite(stockNum) ? stockNum : 0) > 0,
      });
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              {editing ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-stone-500">
              {editing
                ? "Update this item and save changes to the database."
                : "Create a new furniture item for your catalogue."}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-lg text-stone-500 hover:bg-stone-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="grid grid-cols-1 gap-4 overflow-y-auto px-6 py-5 sm:grid-cols-2">
            {/* Image upload */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Product Images</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={images.length >= MAX_IMAGES}
                  className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-stone-300 text-stone-400 transition-colors hover:border-amber-400 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs font-medium">Upload</span>
                </button>
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Image ${i + 1}`} className="h-full w-full object-cover" />
                    {i === 0 && (
                      <span className="absolute left-1 top-1 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold text-stone-900">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label="Remove image"
                      className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-md bg-stone-900/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, MAX_IMAGES - 1 - images.length) }).map((_, i) => (
                  <div
                    key={`ph-${i}`}
                    className="flex aspect-square items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-stone-300"
                  >
                    <ImagePlus className="h-5 w-5" />
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-stone-400">PNG or JPG up to 5MB. First image is the cover.</p>
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Product Title</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Oak Dining Table"
                className={field}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe materials, dimensions and craftsmanship…"
                className={cn(field, "h-auto py-2")}
              />
            </div>

            <div>
              <label className={labelCls}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
                {categoryOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls}>Base Price ($)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                required
                placeholder="0.00"
                className={field}
              />
            </div>

            <div>
              <label className={labelCls}>Stock Quantity</label>
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type="number"
                min="0"
                placeholder="0"
                className={field}
              />
            </div>

            <div>
              <label className={labelCls}>Material</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className={field}>
                {materialOptions.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className={cn("sm:col-span-2", material !== "Wood" && "opacity-50")}>
              <label className={labelCls}>Wood Type</label>
              <select
                value={woodType}
                onChange={(e) => setWoodType(e.target.value)}
                disabled={material !== "Wood"}
                className={field}
              >
                {woodTypes.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Color Options</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => {
                  const on = colors.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleColor(c)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                        on
                          ? "border-amber-400 bg-amber-50 text-amber-700"
                          : "border-stone-200 text-stone-600 hover:border-stone-300"
                      )}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-stone-300"
                        style={{ backgroundColor: swatch[c] }}
                      />
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {error && (
            <p className="mx-6 mb-1 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-stone-100 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-600 disabled:opacity-60"
            >
              {saving ? <Spinner size="sm" /> : <Plus className="h-4 w-4" />}
              {editing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Builds a display row from an API product so the table can render it.
export function toAdminProduct(p: ApiProduct, fallbackId: number): AdminProduct {
  const stock = p.stock ?? (p.inStock === false ? 0 : 12);
  const stockState = stock === 0 ? "Out of Stock" : stock <= 8 ? "Low Stock" : "In Stock";
  return {
    id: p.id ?? fallbackId,
    name: p.name,
    slug: p.slug,
    price: p.price,
    oldPrice: p.oldPrice ?? p.price,
    discount: p.discount ?? 0,
    category: p.category,
    material: p.material ?? "",
    color: p.colors?.[0] ?? p.color ?? "",
    inStock: stock > 0,
    image:
      p.image ||
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&h=600&q=80",
    stock,
    stockState,
  };
}
