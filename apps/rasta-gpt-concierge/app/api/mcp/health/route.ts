import { invokeTool } from "../../../lib/mcp";

export const runtime = "nodejs";

export async function GET() {
  try {
    const res = await invokeTool<{ ok: boolean; name: string; tools: string[] }>("health");
    return Response.json({ connected: !!res?.ok, tools: res?.tools ?? [], source: "mcp" });
  } catch (e: any) {
    // Treat any failure as disconnected; do not 5xx so UI can render a banner.
    return Response.json({ connected: false, tools: [], error: "unreachable", detail: e?.message ?? null, source: "mock" });
  }
}