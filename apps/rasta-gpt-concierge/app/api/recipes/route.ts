import { invokeTool } from "../../lib/mcp";
import { RECIPES } from "../../data/recipes";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? ""; // empty = list all in server (we’ll handle both)
  try {
    const items = await invokeTool<any[]>("find_recipe", { query: q || " " });
    return Response.json({ items });
  } catch {
    // fallback to mock if MCP unreachable
    const ql = q.toLowerCase();
    const items = !q
      ? RECIPES
      : RECIPES.filter(
          r =>
            r.name.toLowerCase().includes(ql) ||
            r.ingredients.some(i => i.toLowerCase().includes(ql))
        );
    return Response.json({ items, source: "mock" });
  }
}