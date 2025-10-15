"use client";
import NextImage from "next/image";
import { Card } from "./ui";
import type { Beach } from "../types";

export default function BeachCard({ b }: { b: Beach }) {
  const riskColor =
    b.rip_risk === "Low" ? "#10b981" :
    b.rip_risk === "Moderate" ? "#f59e0b" : "#ef4444";

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${b.name}, ${b.island}`
  )}`;

  return (
    <Card>
      {b.imageUrl && (
        <div className="thumb">
          <NextImage
            src={b.imageUrl}
            alt={b.name}
            fill
            sizes="(max-width: 768px) 92vw, 340px"
            style={{ objectFit: "cover" }}
            placeholder="empty"
          />
        </div>
      )}

      <header>
        <h4>{b.name}</h4>
        <small>{b.island}</small>
      </header>

      <p style={{ margin: "6px 0 8px" }}>
        Water {b.water_temp_f}°F • Surf {b.surf_ft.toFixed(1)}ft
      </p>
      <p style={{ margin: "6px 0 8px" }}>
        Rip Risk: <b style={{ color: riskColor }}>{b.rip_risk}</b>
      </p>

      <ul style={{ margin: "0 0 10px 18px", padding: 0 }}>
        {b.amenities.slice(0, 4).map((x) => <li key={x}>{x}</li>)}
      </ul>

      <div className="row">
        <a className="btn btn-outline" href={mapsHref} target="_blank" rel="noopener noreferrer">
          Get Directions
        </a>
      </div>
    </Card>
  );
}