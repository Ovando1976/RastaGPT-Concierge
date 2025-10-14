import { RECIPES } from "./data/recipes";
import { BEACHES } from "./data/beaches";
import { EVENTS } from "./data/events";
import McpStatus from "./components/McpStatus";
import ShowcaseClient from "./components/ShowcaseClient";
import ToastHost from "./components/Toast";



export default function Home() {
  return (
    <main style={{ maxWidth: 1040, margin: "40px auto", padding: 24 }}>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>🌴 RastaGPT-Concierge</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        USVI food, beaches, and events—right inside ChatGPT/Claude. The MCP server runs locally;
        this site previews the rich cards & carousels.
      </p>

      <ShowcaseClient />
      <McpStatus />
      <ToastHost />

      <section style={{ marginTop: 28 }}>
        <h3>🩺 Health</h3>
        <pre style={pre}>
{`GET /api/health  -> { "ok": true, "name": "rasta-gpt-concierge-web" }
GET /api/recipes -> { items: [...] }
GET /api/beaches -> { items: [...] }
GET /api/events  -> { items: [...] }`}
        </pre>
      </section>
    </main>
  );
}

const pre: React.CSSProperties = {
  background: "#f6f8fa",
  padding: 12,
  borderRadius: 8,
  overflowX: "auto",
  border: "1px solid #e5e7eb",
};