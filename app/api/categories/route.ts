import type { NextRequest } from "next/server";

import { createOne, fail, fetchAll, ok, usingDB } from "@/lib/api";
import { slugify } from "@/lib/data";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const data = await fetchAll("categories");
  return ok({ data, meta: { total: data.length } });
}

export async function POST(request: NextRequest) {
  if (!usingDB())
    return fail("Database not configured — set MONGODB_URI to create.", 501);
  try {
    const body = await request.json();
    if (!body?.name) return fail("`name` is required.");
    body.slug ||= slugify(body.name);
    body.count ??= 0;
    const created = await createOne("categories", body);
    return ok(created, { status: 201 });
  } catch (err) {
    const message = (err as Error).message;
    if (/duplicate key/i.test(message))
      return fail("A category with this name already exists.", 409);
    return fail(message, 500);
  }
}
