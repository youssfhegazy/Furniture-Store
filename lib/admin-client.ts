"use client";

/**
 * Thin client-side wrapper around the REST API in `app/api/**`.
 * Every admin mutation goes through MongoDB via these helpers.
 */

export type ApiProduct = {
  _id?: string;
  id?: number;
  slug: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  material?: string;
  color?: string;
  colors?: string[];
  woodType?: string;
  inStock?: boolean;
  stock?: number;
  image?: string;
  images?: string[];
};

export type ApiCategory = {
  _id?: string;
  id?: number;
  slug: string;
  name: string;
  blurb?: string;
  image?: string;
  count?: number;
};

// Demo read-only mode: when on, all non-GET requests are blocked client-side so
// the shared demo admin can browse but not mutate. Set from AdminShell.
let readOnly = false;
export function setAdminReadOnly(value: boolean) {
  readOnly = value;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? "GET").toUpperCase();
  if (readOnly && method !== "GET") {
    throw new Error("Demo mode: changes are disabled in the live demo.");
  }
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body?.error || `Request failed (${res.status}).`);
  }
  return body as T;
}

/* -------------------------------- products -------------------------------- */

export async function listProducts(): Promise<ApiProduct[]> {
  const { data } = await request<{ data: ApiProduct[] }>("/api/products?limit=500");
  return data;
}

export function createProduct(body: Partial<ApiProduct>) {
  return request<ApiProduct>("/api/products", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateProduct(slug: string, body: Partial<ApiProduct>) {
  return request<ApiProduct>(`/api/products/${slug}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteProduct(slug: string) {
  return request<{ deleted: boolean }>(`/api/products/${slug}`, {
    method: "DELETE",
  });
}

/* ------------------------------- categories ------------------------------- */

export async function listCategories(): Promise<ApiCategory[]> {
  const { data } = await request<{ data: ApiCategory[] }>("/api/categories");
  return data;
}

export function createCategory(body: Partial<ApiCategory>) {
  return request<ApiCategory>("/api/categories", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateCategory(slug: string, body: Partial<ApiCategory>) {
  return request<ApiCategory>(`/api/categories/${slug}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteCategory(slug: string) {
  return request<{ deleted: boolean }>(`/api/categories/${slug}`, {
    method: "DELETE",
  });
}

/** Read a File as a base64 data URL so it can be stored directly in MongoDB. */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
