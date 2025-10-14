const MCP_BASE_URL = process.env.MCP_BASE_URL || "http://127.0.0.1:3333";

/**
 * Calls an MCP tool over SSE HTTP bridge exposed by make_sse_app(app).
 * We POST to /sse/tools/invoke with { name, arguments }.
 * If your server exposes a slightly different path, adjust PATH below.
 */
const PATH = "/sse/tools/invoke";

type MCPInvokeBody = {
  name: string;
  arguments?: Record<string, unknown>;
};

export async function invokeTool<T = any>(
  name: string,
  args?: Record<string, unknown>,
  init?: RequestInit
): Promise<T> {
  const url = MCP_BASE_URL.replace(/\/$/, "") + PATH;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, arguments: args } as MCPInvokeBody),
    // ensure server-side request from Next API route
    cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`MCP ${name} ${res.status}: ${text || res.statusText}`);
  }
  // The SSE bridge returns JSON results (FastMCP tools return JSON-serializable)
  const json = (await res.json()) as T;
  return json;
}