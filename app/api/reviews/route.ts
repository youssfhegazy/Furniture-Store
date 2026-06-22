import type { NextRequest } from "next/server";

import { fetchAll, ok, paginate } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { data, meta } = paginate(
    await fetchAll("reviews"),
    searchParams.get("page"),
    searchParams.get("limit")
  );
  return ok({ data, meta });
}
