import { fetchAll, ok } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const data = await fetchAll("testimonials");
  return ok({ data, meta: { total: data.length } });
}
