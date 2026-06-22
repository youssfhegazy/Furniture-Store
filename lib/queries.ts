/**
 * Server-side, typed read helpers for catalog data.
 *
 * These wrap the DB-or-static helpers in lib/api.ts: when MONGODB_URI is set the
 * data comes from MongoDB, otherwise it falls back to the in-source dataset. Use
 * these from server components / pages so the rendered site is driven by the
 * database. Marketing copy and pure helpers still live in lib/data.ts.
 *
 * Intended for server components / route handlers only (it reaches the DB).
 */
import { fetchAll, fetchOne } from "./api";
import type { CollectionName } from "./dataset";
import type { Review, ShopProduct } from "./data";

export type CategoryRecord = {
  _id?: string;
  id: number;
  name: string;
  slug: string;
  blurb?: string;
  image: string;
  count: number;
};

export type BlogPostRecord = {
  _id?: string;
  id: number;
  slug: string;
  title: string;
  author?: string;
  date?: string;
  ago?: string;
  category?: string;
  image: string;
};

export type TestimonialRecord = {
  _id?: string;
  id: number;
  name: string;
  location?: string;
  title?: string;
  quote?: string;
};

export type FaqRecord = {
  _id?: string;
  id: number;
  question: string;
  answer?: string;
};

export type FeaturedCategoryRecord = {
  _id?: string;
  id: number;
  name: string;
  count?: number;
  image?: string;
};

export type TeamRecord = {
  _id?: string;
  id: number;
  name: string;
  role?: string;
  image?: string;
};

export type TrendingRecord = {
  _id?: string;
  id: number;
  slug: string;
  name: string;
  price: number;
  discount?: number;
  category?: string;
  image?: string;
};

async function readAll<T>(name: CollectionName): Promise<T[]> {
  return (await fetchAll(name)) as unknown as T[];
}

async function readOne<T>(
  name: CollectionName,
  field: string,
  value: string
): Promise<T | null> {
  return (await fetchOne(name, field, value)) as unknown as T | null;
}

export const getProducts = () => readAll<ShopProduct>("products");
export const getProductBySlug = (slug: string) =>
  readOne<ShopProduct>("products", "slug", slug);

export const getCategories = () => readAll<CategoryRecord>("categories");
export const getCategoryBySlug = (slug: string) =>
  readOne<CategoryRecord>("categories", "slug", slug);

export const getBlogPosts = () => readAll<BlogPostRecord>("blog");
export const getBlogPostBySlug = (slug: string) =>
  readOne<BlogPostRecord>("blog", "slug", slug);

export const getReviews = () => readAll<Review>("reviews");
export const getTestimonials = () => readAll<TestimonialRecord>("testimonials");
export const getFaqs = () => readAll<FaqRecord>("faqs");
export const getFeaturedCategories = () =>
  readAll<FeaturedCategoryRecord>("featured-categories");
export const getTeam = () => readAll<TeamRecord>("team");
export const getTrending = () => readAll<TrendingRecord>("trending");

/** Same-category-first related products, read from the DB. */
export async function getRelatedProducts(
  product: ShopProduct,
  count: number
): Promise<ShopProduct[]> {
  const list = await getProducts();
  const sameCategory = list.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const others = list.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  return [...sameCategory, ...others].slice(0, count);
}
