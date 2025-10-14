"use client";

import type { EventItem } from "../types";
import { useState } from "react";
import { useToasts } from "./Toast";

function formatISODate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

export default function EventCard({ e }: { e: EventItem }) {
  const [note, setNote] = useState<string | null>(null);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${e.location}, ${e.island}`
  )}`;

  async function callDriver() {
    setNote("Requesting ride…");
    try {
      const res = await fetch("/api/request-ride", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ to: e.title, pax: 2, island: e.island, when: "ASAP" }),
      });
      const json = await res.json();
      setNote(json.ok ? `✔ ${json.confirmation} • $${json.fare_estimate_usd}` : `✖ ${json.error}`);
    } catch (err: any) {
      setNote(`✖ ${err.message || "network_error"}`);
    }
  }

  return (
    <article style={card}>
      <header style={{ marginBottom: 8 }}>
        <h4 style={{ margin: 0 }}>{e.title}</h4>
        <small style={{ color: "#6b7280" }}>{e.type} • {e.island}</small>
      </header>

      <p style={{ margin: "6px 0 8px", color: "#374151" }}>
        {formatISODate(e.date)} • {e.location}
      </p>
      <p style={{ margin: "6px 0 8px", color: "#374151" }}>${e.price_usd.toFixed(2)}</p>

      <footer style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...pill, textDecoration: "none", display: "inline-block" }}
        >
          Get Directions
        </a>
        <button style={pill} onClick={callDriver}>Call Driver</button>
        <button style={pill} onClick={() => alert("Ticket flow coming soon")}>Book Tickets</button>
        {note && <span style={{ fontSize: 12, color: "#065f46" }}>{note}</span>}
      </footer>
    </article>
  );
}

const card = {
  width: 320,
  minWidth: 320,
  scrollSnapAlign: "start",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 12,
  background: "#fff",
} as const;

const pill = {
  border: "1px solid #d1d5db",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#f9fafb",
  cursor: "pointer",
  fontSize: 13,
} as const;