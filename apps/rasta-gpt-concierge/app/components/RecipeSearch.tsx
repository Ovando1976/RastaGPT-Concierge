"use client";
import { useEffect, useMemo, useState } from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeSearch() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function run(search: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/recipes?q=${encodeURIComponent(search)}`, { cache: "no-store" });
      const json = await res.json();
      setItems(json.items || []);
    } finally {
      setLoading(false);
    }
  }

  // initial load
  useEffect(() => { run(""); }, []);

  const list = useMemo(() => items || [], [items]);

  return (
    <section style={{ marginTop: 24 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search recipes (e.g., conch, soup, okra)…"
          onKeyDown={(e) => e.key === "Enter" && run(q)}
          style={{
            flex: 1, padding: "10px 12px", borderRadius: 10,
            border: "1px solid #e5e7eb", fontSize: 14
          }}
        />
        <button onClick={() => run(q)} style={{
          padding: "10px 14px", borderRadius: 10,
          border: "1px solid #d1d5db", background: "#fff", cursor: "pointer"
        }}>
          Search
        </button>
        {loading && <span style={{ fontSize: 12, color: "#6b7280" }}>Loading…</span>}
      </div>

      {list.length > 0 && (
        <div style={{ display: "flex", gap: 16, overflowX: "auto", marginTop: 12 }}>
          {list.map((r: any) => <RecipeCard key={r.id || r.name} r={r} />)}
        </div>
      )}
      {items && !list.length && (
        <p style={{ color: "#6b7280", marginTop: 12 }}>No results.</p>
      )}
    </section>
  );
}