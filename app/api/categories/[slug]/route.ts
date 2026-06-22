import type { NextRequest } from "next/server";

import { deleteOne, fail, fetchOne, ok, updateOne, usingDB } from "@/lib/api";
import { slugify } from "@/lib/data";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const category = await fetchOne("categories", "slug", slug);
  if (!category) return fail("Category not found.", 404);
  return ok(category);
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  if (!usingDB()) return fail("Database not configured.", 501);
  const { slug } = await params;
  const body = await request.json();
  // Keep slug in sync with the name if it changed.
  if (body?.name) body.slug = slugify(body.name);
  const updated = await updateOne("categories", "slug", slug, body);
  if (!updated) return fail("Category not found.", 404);
  return ok(updated);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!usingDB()) return fail("Database not configured.", 501);
  const { slug } = await params;
  const deleted = await deleteOne("categories", "slug", slug);
  if (!deleted) return fail("Category not found.", 404);
  return ok({ deleted: true });
}
