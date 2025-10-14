import { invokeTool } from "../../../lib/mcp";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { tool, args } = await req.json().catch(() => ({}));
  if (!tool) return Response.json({ ok: false, error: "missing_tool" }, { status: 400 });
  try {
    const out = await invokeTool(tool, args || {});
    return Response.json({ ok: true, tool, result: out });
  } catch (e: any) {
    return Response.json({ ok: false, error: "mcp_invoke_failed", detail: e?.message ?? null }, { status: 200 });
  }
}