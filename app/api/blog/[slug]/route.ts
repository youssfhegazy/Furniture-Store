import type { NextRequest } from "next/server";

import { fail, fetchOne, ok } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await fetchOne("blog", "slug", slug);
  if (!post) return fail("Post not found.", 404);
  return ok(post);
}
