# FurniFlex — Data, MongoDB & API Guide

All site content is "scraped" (normalized) from `lib/data.ts` into a single
dataset, exported to JSON, seeded into MongoDB, and served via App Router APIs.

## Architecture

```
lib/data.ts ──► lib/dataset.ts ──┬──► scripts/export-json.ts ──► data/json/*.json
 (raw content)   (normalized)     ├──► scripts/seed.ts ─────────► MongoDB (Mongoose)
                                  └──► app/api/**/route.ts ─────► REST API
                                         (MongoDB, or dataset fallback if no DB)
```

- **`lib/dataset.ts`** — pure data, no DB/React. The single source of truth for
  every collection: `products, categories, blog, reviews, testimonials, faqs,
  team, featured-categories, trending`.
- **`lib/mongodb.ts`** — cached Mongoose connection (`connectDB()`).
- **`lib/models.ts`** — Mongoose schemas/models for each collection.
- **`lib/api.ts`** — `fetchAll/fetchOne/createOne/updateOne/deleteOne` +
  `paginate`. Uses MongoDB when `MONGODB_URI` is set, otherwise falls back to the
  static dataset so the API works with zero config.

## Step 1 — Environment

Create `.env.local` (git-ignored):

```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net
MONGODB_DB=furniflex
```

> Never put real credentials in `.env.example` (it's a committed template).

## Step 2 — Export JSON files

```bash
npm run export:json
```

Writes `data/json/<collection>.json` for each collection plus `data/json/all.json`
(combined dump with counts + timestamp). No database required.

## Step 3 — Seed MongoDB

```bash
npm run db:seed
```

Connects with `MONGODB_URI`, clears each collection, and inserts the dataset.

## Step 4 — Run & call the API

```bash
npm run dev
```

| Method | Endpoint | Notes |
| ------ | -------- | ----- |
| GET | `/api` | API index / endpoint list + data source |
| GET | `/api/products?category=&q=&page=&limit=` | filter + paginate |
| POST | `/api/products` | create (DB only) |
| GET/PUT/DELETE | `/api/products/{slug}` | single product |
| GET | `/api/categories` | with product counts |
| GET | `/api/blog?category=&page=&limit=` | list |
| GET | `/api/blog/{slug}` | single post |
| GET | `/api/reviews?page=&limit=` | list |
| GET | `/api/testimonials` | list |
| GET | `/api/faqs` | list |
| GET | `/api/team` | list |
| GET | `/api/featured-categories` | list |
| GET | `/api/trending` | list |

List responses are shaped `{ data: [...], meta: { total, page, limit, totalPages } }`.

Examples:

```bash
curl http://localhost:3000/api/products?category=Office
curl http://localhost:3000/api/products/zenith-zephyr-chair
curl http://localhost:3000/api/products?q=sofa
```

## Notes

- API routes use `runtime = "nodejs"` and `dynamic = "force-dynamic"` (Mongoose
  needs Node, and data should not be statically cached).
- Mongoose v9 ships heavy types; if `tsc`/`next build` runs out of memory, raise
  the heap: `NODE_OPTIONS=--max-old-space-size=8192`.
- To extend: add the entity to `lib/dataset.ts`, a model in `lib/models.ts`
  (and the `models` map), then an `app/api/<name>/route.ts`. Export + seed pick
  it up automatically.
```
