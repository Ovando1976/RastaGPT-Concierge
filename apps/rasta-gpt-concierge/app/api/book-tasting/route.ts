import { invokeTool } from "../../lib/mcp";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { recipe_id, guests = 2, date } = body as { recipe_id?: string; guests?: number; date?: string };

  if (!recipe_id) return Response.json({ ok: false, error: "missing_recipe_id" }, { status: 400 });

  try {
    const result = await invokeTool("book_catering", { request: { recipe_id, guests, date } });
    return Response.json(result);
  } catch (e: any) {
    return Response.json({ ok: false, error: "mcp_unavailable", detail: e?.message }, { status: 200 });
  }
}