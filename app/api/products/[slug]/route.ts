import type { NextRequest } from "next/server";

import { deleteOne, fail, fetchOne, ok, updateOne, usingDB } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const product = await fetchOne("products", "slug", slug);
  if (!product) return fail("Product not found.", 404);
  return ok(product);
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  if (!usingDB()) return fail("Database not configured.", 501);
  const { slug } = await params;
  const body = await request.json();
  const updated = await updateOne("products", "slug", slug, body);
  if (!updated) return fail("Product not found.", 404);
  return ok(updated);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!usingDB()) return fail("Database not configured.", 501);
  const { slug } = await params;
  const deleted = await deleteOne("products", "slug", slug);
  if (!deleted) return fail("Product not found.", 404);
  return ok({ deleted: true });
}
