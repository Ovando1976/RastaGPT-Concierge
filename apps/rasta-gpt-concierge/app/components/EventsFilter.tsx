"use client";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";

const kinds = ["", "festival", "concert", "regatta", "culinary"];
const islands = ["", "St. Thomas", "St. John", "St. Croix"];

export default function EventsFilter() {
  const [kind, setKind] = useState("");
  const [island, setIsland] = useState("");
  const [month, setMonth] = useState<number | "">("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (kind) qs.set("kind", kind);
      if (island) qs.set("island", island);
      if (month) qs.set("month", String(month));
      const res = await fetch(`/api/events?${qs.toString()}`, { cache: "no-store" });
      const json = await res.json();
      setItems(json.items || []);
    } finally { setLoading(false); }
  }

  useEffect(() => { run(); }, []); // initial

  return (
    <section style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <select value={kind} onChange={(e) => setKind(e.target.value)} style={sel}>{
          kinds.map(k => <option key={k} value={k}>{k || "All types"}</option>)
        }</select>
        <select value={island} onChange={(e) => setIsland(e.target.value)} style={sel}>{
          islands.map(i => <option key={i} value={i}>{i || "All islands"}</option>)
        }</select>
        <input type="number" min={1} max={12} placeholder="Month"
          value={month} onChange={(e) => setMonth(e.target.value ? Number(e.target.value) : "")}
          style={{ ...sel, width: 110 }} />
        <button onClick={run} style={btn}>Filter</button>
        {loading && <span style={{ color: "#6b7280", fontSize: 12 }}>Loading…</span>}
      </div>

      <div style={{ display: "flex", gap: 16, overflowX: "auto", marginTop: 12 }}>
        {items.map((e) => <EventCard key={e.id} e={e} />)}
      </div>
    </section>
  );
}

const sel: React.CSSProperties = { padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb" };
const btn: React.CSSProperties = { padding: "8px 12px", borderRadius: 10, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer" };