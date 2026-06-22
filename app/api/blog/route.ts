import type { NextRequest } from "next/server";

import { fetchAll, ok, paginate } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let posts = await fetchAll("blog");
  if (category) posts = posts.filter((p) => p.category === category);

  const { data, meta } = paginate(
    posts,
    searchParams.get("page"),
    searchParams.get("limit")
  );
  return ok({ data, meta });
}
