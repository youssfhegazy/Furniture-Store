"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Plus, X } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

import { fileToDataUrl, type ApiCategory } from "@/lib/admin-client";
import { cn } from "@/lib/utils";

export type CategoryPayload = {
  name: string;
  blurb: string;
  image: string;
};

const field =
  "h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30";
const labelCls = "mb-1.5 block text-sm font-medium text-stone-700";
const MAX_BYTES = 5 * 1024 * 1024;

export function CategoryFormModal({
  open,
  onClose,
  onSubmit,
  category,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CategoryPayload) => Promise<void>;
  category?: ApiCategory | null;
}) {
  const editing = Boolean(category);
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [blurb, setBlurb] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);
    setName(category?.name ?? "");
    setBlurb(category?.blurb ?? "");
    setImage(category?.image ?? "");
  }, [open, category]);

  if (!open) return null;

  async function handleFile(file?: File | null) {
    if (!file) return;
    if (file.size > MAX_BYTES) return setError("Image is larger than 5MB.");
    setError(null);
    setImage(await fileToDataUrl(file));
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    if (!name.trim()) return setError("Category name is required.");
    setSaving(true);
    setError(null);
    try {
      await onSubmit({ name: name.trim(), blurb: blurb.trim(), image });
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
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-stone-900">
            {editing ? "Edit Category" : "Add Category"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-lg text-stone-500 hover:bg-stone-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div className="mb-4">
            <label className={labelCls}>Cover Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-stone-300 text-stone-400 transition-colors hover:border-amber-400 hover:text-amber-500"
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="Category cover" className="h-full w-full object-cover" />
              ) : (
                <span className="flex flex-col items-center gap-1">
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs font-medium">Upload image</span>
                </span>
              )}
            </button>
          </div>

          <div className="mb-4">
            <label className={labelCls}>Category Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Living Room"
              className={field}
            />
          </div>

          <div className="mb-4">
            <label className={labelCls}>Short Description</label>
            <input
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
              placeholder="e.g. Sofas, chairs & coffee tables"
              className={field}
            />
          </div>

          {error && (
            <p className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3">
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
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-600 disabled:opacity-60"
              )}
            >
              {saving ? <Spinner size="sm" /> : <Plus className="h-4 w-4" />}
              {editing ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
