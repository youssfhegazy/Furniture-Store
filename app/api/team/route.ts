import { fetchAll, ok } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const data = await fetchAll("team");
  return ok({ data, meta: { total: data.length } });
}
