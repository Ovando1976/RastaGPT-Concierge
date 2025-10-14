import { invokeTool } from "../../lib/mcp";
import { BEACHES } from "../../data/beaches";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const island = searchParams.get("island") ?? undefined;
  const name = searchParams.get("name") ?? undefined;

  try {
    const items = await invokeTool<any[]>("get_beach_conditions", { island, name });
    return Response.json({ items });
  } catch {
    const items = BEACHES.filter(
      b =>
        (!island || b.island.toLowerCase() === island.toLowerCase()) &&
        (!name || b.name.toLowerCase().startsWith(name.toLowerCase()))
    );
    return Response.json({ items, source: "mock" });
  }
}