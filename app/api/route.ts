import { ok, usingDB } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return ok({
    name: "FurniFlex API",
    source: usingDB() ? "mongodb" : "static-dataset",
    endpoints: {
      products: "/api/products?category=&q=&page=&limit=",
      productBySlug: "/api/products/{slug}",
      categories: "/api/categories",
      blog: "/api/blog?page=&limit=",
      blogBySlug: "/api/blog/{slug}",
      reviews: "/api/reviews?page=&limit=",
      testimonials: "/api/testimonials",
      faqs: "/api/faqs",
      team: "/api/team",
      featuredCategories: "/api/featured-categories",
      trending: "/api/trending",
    },
  });
}
