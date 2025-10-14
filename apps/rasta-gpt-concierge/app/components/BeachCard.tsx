"use client";
import type { Beach } from "../types";

export default function BeachCard({ b }: { b: Beach }) {
  const riskColor =
    b.rip_risk === "Low" ? "#16a34a" : b.rip_risk === "Moderate" ? "#f59e0b" : "#ef4444";

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${b.name}, ${b.island}`
  )}`;

  return (
    <article style={card}>
      <header style={{ marginBottom: 8 }}>
        <h4 style={{ margin: 0 }}>{b.name}</h4>
        <small style={{ color: "#6b7280" }}>{b.island}</small>
      </header>

      <p style={{ margin: "6px 0 8px", color: "#374151" }}>
        Water {b.water_temp_f}°F • Surf {b.surf_ft.toFixed(1)}ft
      </p>
      <p style={{ margin: "6px 0 8px" }}>
        Rip Risk: <b style={{ color: riskColor }}>{b.rip_risk}</b>
      </p>

      <ul style={list}>
        {b.amenities.slice(0, 4).map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <footer style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button style={pill} onClick={() => alert("Surf & rip risk details coming soon")}>
          View Surf & Rip Risk
        </button>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...pill, textDecoration: "none", display: "inline-block" }}
        >
          Get Directions
        </a>
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

const list = {
  listStyle: "disc",
  paddingLeft: 18,
  margin: "0 0 10px",
  color: "#374151",
} as const;

const pill = {
  border: "1px solid #d1d5db",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#f9fafb",
  cursor: "pointer",
  fontSize: 13,
} as const;