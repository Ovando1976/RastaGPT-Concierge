"use client";
import NextImage from "next/image";
import { useState } from "react";
import { Card, Button } from "./ui";
import type { EventItem } from "../types";
import { useToasts } from "./Toast";

function formatISODate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

export default function EventCard({ e }: { e: EventItem }) {
  const [note, setNote] = useState<string | null>(null);
  const { push } = useToasts();

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${e.location}, ${e.island}`
  )}`;

  async function callDriver(): Promise<void> {
    setNote("Requesting ride…");
    try {
      const res = await fetch("/api/request-ride", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ to: e.title, pax: 2, island: e.island, when: "ASAP" }),
      });

      type RideResponse = {
        ok?: boolean;
        confirmation?: string;
        fare_estimate_usd?: number;
        error?: string;
      };

      const data = (await res.json()) as RideResponse;

      if (data?.ok) {
        const txt = `Driver ${data.confirmation} • $${data.fare_estimate_usd}`;
        setNote(`✔ ${txt}`);
        push("ok", txt);
      } else {
        setNote(`✖ ${data?.error || "unknown_error"}`);
        push("err", `Failed: ${data?.error || "unknown_error"}`);
      }
    } catch (err: any) {
      setNote(`✖ ${err.message || "network_error"}`);
      push("err", `Failed: ${err.message || "network_error"}`);
    }
  }

  return (
    <Card>
      {e.imageUrl && (
        <div className="thumb">
          <NextImage
            src={e.imageUrl}
            alt={e.title}
            fill
            sizes="(max-width: 768px) 92vw, 340px"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>
      )}

      <header>
        <h4>{e.title}</h4>
        <small>
          {e.type} • {e.island}
        </small>
      </header>

      <p style={{ margin: "6px 0 8px" }}>{formatISODate(e.date)} • {e.location}</p>
      <p style={{ margin: "6px 0 8px" }}>${e.price_usd.toFixed(2)}</p>

      <div className="row">
        <a className="btn btn-outline" href={mapsHref} target="_blank" rel="noopener noreferrer">
          Get Directions
        </a>
        <Button variant="outline" onClick={callDriver}>Call Driver</Button>
        <Button variant="outline" onClick={() => alert("Ticket flow coming soon")}>
          Book Tickets
        </Button>
        {note && <span style={{ fontSize: 12, color: "#10b981" }}>{note}</span>}
      </div>
    </Card>
  );
}