import mongoose, { Schema, type Model, type SchemaOptions } from "mongoose";

/**
 * Mongoose models for every scraped collection.
 * `mongoose.models.X || mongoose.model(...)` avoids the OverwriteModelError that
 * Next.js hot reload / repeated imports would otherwise trigger.
 */

const opts: SchemaOptions = { timestamps: true, versionKey: false };

const ProductSchema = new Schema(
  {
    id: { type: Number, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: Number,
    discount: Number,
    category: { type: String, index: true },
    material: { type: String, index: true },
    color: { type: String, index: true },
    inStock: { type: Boolean, default: true },
    liked: { type: Boolean, default: false },
    image: String,
    images: { type: [String], default: undefined },
    description: String,
    stock: { type: Number, default: 0 },
    woodType: String,
    colors: { type: [String], default: undefined },
  },
  opts
);

const CategorySchema = new Schema(
  {
    id: Number,
    name: { type: String, required: true, unique: true },
    slug: { type: String, index: true },
    blurb: String,
    image: String,
    count: Number,
  },
  opts
);

const BlogPostSchema = new Schema(
  {
    id: Number,
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: String,
    date: String,
    ago: String,
    category: { type: String, index: true },
    image: String,
  },
  opts
);

const ReviewSchema = new Schema(
  {
    id: { type: Number, index: true },
    name: String,
    avatar: String,
    verified: Boolean,
    date: String,
    rating: { type: Number, index: true },
    title: String,
    text: String,
    helpful: Number,
    image: { type: String, default: null },
  },
  opts
);

const TestimonialSchema = new Schema(
  {
    id: Number,
    name: String,
    location: String,
    title: String,
    quote: String,
    image: String,
  },
  opts
);

const FaqSchema = new Schema(
  {
    id: Number,
    question: { type: String, required: true },
    answer: String,
  },
  opts
);

const TeamSchema = new Schema(
  { id: Number, name: String, role: String, image: String },
  opts
);

const FeaturedCategorySchema = new Schema(
  { id: Number, name: String, count: Number, image: String },
  opts
);

const TrendingSchema = new Schema(
  {
    id: Number,
    slug: String,
    name: String,
    price: Number,
    discount: Number,
    category: String,
    image: String,
  },
  opts
);

// Authenticated accounts. Populated by NextAuth on Google sign-in (see auth.ts).
// Kept out of the `models` map below so the seed/export pipeline never touches it.
const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true, index: true },
    image: String,
    provider: { type: String, default: "google" },
    emailVerified: Date,
  },
  opts
);

// NOTE: never pass the free generic `T` into `mongoose.model<T>()` / `Model<T>`
// here. Mongoose v9's `Model` is a deep web of conditional types; resolving it
// against an unbound type variable makes the type-relation checker blow up and
// run the build out of memory (8 GB+). Calling `mongoose.model` without a type
// argument and casting the result keeps inference concrete and cheap while
// still giving callers a typed `Model<T>`.
function model<T>(name: string, schema: Schema): Model<T> {
  return (mongoose.models[name] || mongoose.model(name, schema)) as Model<T>;
}

export const Product = model("Product", ProductSchema);
export const Category = model("Category", CategorySchema);
export const BlogPost = model("BlogPost", BlogPostSchema);
export const Review = model("Review", ReviewSchema);
export const Testimonial = model("Testimonial", TestimonialSchema);
export const Faq = model("Faq", FaqSchema);
export const Team = model("Team", TeamSchema);
export const FeaturedCategory = model("FeaturedCategory", FeaturedCategorySchema);
export const Trending = model("Trending", TrendingSchema);
export const User = model("User", UserSchema);

/** Map collection name -> model, mirroring lib/dataset.ts keys. */
export const models = {
  products: Product,
  categories: Category,
  blog: BlogPost,
  reviews: Review,
  testimonials: Testimonial,
  faqs: Faq,
  team: Team,
  "featured-categories": FeaturedCategory,
  trending: Trending,
} as const;
