/**
 * Normalized dataset — the single source of truth "scraped" from the app's
 * content in lib/data.ts. Pure data only (no mongoose / no React) so it can be
 * imported by API routes, the JSON exporter, and the DB seed script alike.
 */
import {
  aboutPage,
  allReviews,
  blogPosts,
  categories,
  categoryCount,
  faqs,
  featuredCategories,
  products as trendingProducts,
  shopProducts,
  slugify,
  testimonials,
} from "./data";

export const productsData = shopProducts.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  price: p.price,
  oldPrice: p.oldPrice,
  discount: p.discount,
  category: p.category,
  material: p.material,
  color: p.color,
  inStock: p.inStock,
  liked: Boolean(p.liked),
  image: p.image,
}));

export const categoriesData = categories.map((c, i) => ({
  id: i + 1,
  name: c.name,
  slug: slugify(c.name),
  blurb: c.blurb,
  image: c.image,
  count: categoryCount(c.name),
}));

export const blogData = blogPosts.map((b) => ({
  id: b.id,
  slug: b.slug,
  title: b.title,
  author: b.author,
  date: b.date,
  ago: b.ago,
  category: b.category,
  image: b.image,
}));

export const reviewsData = allReviews.map((r) => ({
  id: r.id,
  name: r.name,
  avatar: r.avatar,
  verified: r.verified,
  date: r.date,
  rating: r.rating,
  title: r.title,
  text: r.text,
  helpful: r.helpful,
  image: r.image ?? null,
}));

export const testimonialsData = testimonials.map((t, i) => ({
  id: i + 1,
  name: t.name,
  location: t.location,
  title: t.title,
  quote: t.quote,
}));

export const faqsData = faqs.map((f, i) => ({
  id: i + 1,
  question: f.q,
  answer: f.a,
}));

export const trendingData = trendingProducts.map((p) => ({
  id: p.id,
  slug: slugify(p.name),
  name: p.name,
  price: p.price,
  discount: p.discount,
  category: p.category,
  image: p.image,
}));

export const teamData = aboutPage.team.map((m, i) => ({
  id: i + 1,
  name: m.name,
  role: m.role,
  image: m.image,
}));

export const featuredCategoriesData = featuredCategories.map((c, i) => ({
  id: i + 1,
  name: c.name,
  count: c.count,
  image: c.image,
}));

/** All collections keyed by their API/DB name. */
export const dataset = {
  products: productsData,
  categories: categoriesData,
  blog: blogData,
  reviews: reviewsData,
  testimonials: testimonialsData,
  faqs: faqsData,
  trending: trendingData,
  team: teamData,
  "featured-categories": featuredCategoriesData,
} as const;

export type CollectionName = keyof typeof dataset;
export const collectionNames = Object.keys(dataset) as CollectionName[];
