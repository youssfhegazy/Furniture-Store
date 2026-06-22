import type { NextRequest } from "next/server";

import { createOne, fail, fetchAll, ok, paginate, usingDB } from "@/lib/api";
import { slugify } from "@/lib/data";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  let products = await fetchAll("products");
  if (category) products = products.filter((p) => p.category === category);
  if (q)
    products = products.filter((p) =>
      String(p.name).toLowerCase().includes(q)
    );

  const { data, meta } = paginate(
    products,
    searchParams.get("page"),
    searchParams.get("limit")
  );
  return ok({ data, meta });
}

export async function POST(request: NextRequest) {
  if (!usingDB())
    return fail("Database not configured — set MONGODB_URI to create.", 501);
  try {
    const body = await request.json();
    if (!body?.name || body?.price == null)
      return fail("`name` and `price` are required.");
    body.slug ||= slugify(body.name);
    const created = await createOne("products", body);
    return ok(created, { status: 201 });
  } catch (err) {
    const message = (err as Error).message;
    if (/duplicate key/i.test(message))
      return fail("A product with this name already exists.", 409);
    return fail(message, 500);
  }
}
