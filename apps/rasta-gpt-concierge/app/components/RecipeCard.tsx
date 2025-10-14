"use client";

import type { Recipe } from "../types";
import { useState } from "react";
import { useToasts } from "./Toast";

export default function RecipeCard({ r }: { r: Recipe }) {
  const [msg, setMsg] = useState<string | null>(null);

  async function bookTasting() {
    setMsg("Booking…");
    try {
      const res = await fetch("/api/book-tasting", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ recipe_id: r.id, guests: 2 })
      });
      const json = await res.json();
      setMsg(json.ok ? `✔ ${json.confirmation} • $${json.estimate_usd}` : `✖ ${json.error}`);
    } catch (e: any) {
      setMsg(`✖ ${e.message || "network_error"}`);
    }
  }

  const { push } = useToasts();
// on success
push("ok", `Booked! ${json.confirmation} • $${json.estimate_usd}`);
// on error
push("err", `Failed: ${json.error || "unknown_error"}`);

  return (
    <article style={card}>
      <header style={{ marginBottom: 8 }}>
        <h4 style={{ margin: 0 }}>{r.name}</h4>
        <small style={{ color: "#6b7280" }}>USVI • {r.prep_minutes} min</small>
      </header>

      <p style={{ margin: "6px 0 8px", color: "#374151" }}>
        ${r.price_usd.toFixed(2)} • {r.restaurant}
      </p>

      <ul style={miniList}>
        {r.ingredients.slice(0, 5).map((ing) => <li key={ing}>{ing}</li>)}
        {r.ingredients.length > 5 && <li>+{r.ingredients.length - 5} more</li>}
      </ul>

      <footer style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={bookTasting} style={pill}>Book Tasting</button>
        <button style={pill} onClick={() => alert("Added to cart!")}>Add to Cart</button>
        {msg && <span style={{ fontSize: 12, color: "#065f46" }}>{msg}</span>}
      </footer>
    </article>
  );
}

const card: React.CSSProperties = {
  width: 320,
  minWidth: 320,
  scrollSnapAlign: "start",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 12,
  background: "#fff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

const miniList: React.CSSProperties = {
  listStyle: "disc",
  paddingLeft: 18,
  margin: "0 0 10px",
  color: "#374151",
};

const pill: React.CSSProperties = {
  border: "1px solid #d1d5db",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#f9fafb",
  cursor: "pointer",
  fontSize: 13,
};