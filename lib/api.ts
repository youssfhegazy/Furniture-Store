import { NextResponse } from "next/server";

import { dataset, type CollectionName } from "./dataset";

type Doc = Record<string, unknown>;

/**
 * Mongoose `.lean()` returns plain objects but leaves `_id` as a Bson ObjectId,
 * which isn't a plain value and throws "Only plain objects can be passed to
 * Client Components" when a server component forwards it. Stringify `_id` so the
 * rows are safe to cross the server→client boundary. (Date fields are fine.)
 */
function serialize<T extends Doc>(doc: T): T {
  if (doc && typeof doc === "object" && "_id" in doc) {
    return { ...doc, _id: String(doc._id) };
  }
  return doc;
}

export const ok = (data: unknown, init?: ResponseInit) =>
  NextResponse.json(data, init);

export const fail = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

/** True when a MongoDB connection is configured. */
export const usingDB = () => Boolean(process.env.MONGODB_URI);

async function getModel(name: CollectionName) {
  const { connectDB } = await import("./mongodb");
  const { models } = await import("./models");
  await connectDB();
  return models[name as keyof typeof models];
}

/** Read a whole collection from MongoDB, falling back to the static dataset. */
export async function fetchAll(name: CollectionName): Promise<Doc[]> {
  if (usingDB()) {
    const model = await getModel(name);
    if (model) return ((await model.find().lean()) as Doc[]).map(serialize);
  }
  return dataset[name] as unknown as Doc[];
}

/** Read a single document by a field (e.g. slug), with the same fallback. */
export async function fetchOne(
  name: CollectionName,
  field: string,
  value: string
): Promise<Doc | null> {
  if (usingDB()) {
    const model = await getModel(name);
    if (model) {
      const doc = (await model.findOne({ [field]: value }).lean()) as Doc | null;
      return doc ? serialize(doc) : null;
    }
  }
  return (
    (dataset[name] as unknown as Doc[]).find((r) => r[field] === value) ?? null
  );
}

/** Create a document (DB only). */
export async function createOne(name: CollectionName, body: Doc) {
  const model = await getModel(name);
  if (!model) throw new Error("Unknown collection");
  return (await model.create(body)).toObject();
}

/** Update a document by field (DB only). */
export async function updateOne(
  name: CollectionName,
  field: string,
  value: string,
  body: Doc
) {
  const model = await getModel(name);
  if (!model) throw new Error("Unknown collection");
  return model.findOneAndUpdate({ [field]: value }, body, { new: true }).lean();
}

/** Delete a document by field (DB only). */
export async function deleteOne(
  name: CollectionName,
  field: string,
  value: string
) {
  const model = await getModel(name);
  if (!model) throw new Error("Unknown collection");
  return model.findOneAndDelete({ [field]: value }).lean();
}

/** Slice an array for ?page & ?limit and wrap with pagination metadata. */
export function paginate<T>(items: T[], pageParam?: string | null, limitParam?: string | null) {
  const total = items.length;
  const limit = Math.max(1, Number(limitParam) || total || 1);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    meta: { total, page, limit, totalPages },
  };
}
