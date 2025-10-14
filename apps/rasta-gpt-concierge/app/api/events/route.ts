import { invokeTool } from "../../lib/mcp";
import { EVENTS } from "../../data/events";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") ?? undefined;    // "festival" | "concert" | ...
  const island = searchParams.get("island") ?? undefined;
  const month = searchParams.get("month") ? Number(searchParams.get("month")) : undefined;

  try {
    const items = await invokeTool<any[]>("find_events", { kind, island, month });
    return Response.json({ items });
  } catch {
    const items = EVENTS.filter(e => {
      if (kind && e.type.toLowerCase() !== kind.toLowerCase() && e.type !== kind) return false;
      if (island && e.island.toLowerCase() !== island.toLowerCase()) return false;
      if (month) {
        const m = Number(e.date.split("-")[1]);
        if (m !== month) return false;
      }
      return true;
    });
    return Response.json({ items, source: "mock" });
  }
}