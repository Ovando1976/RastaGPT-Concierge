"use client";
import NextImage from "next/image";
import { useState } from "react";
import { Card, Button } from "./ui";
import type { Recipe } from "../types";
import { useToasts } from "./Toast";

export default function RecipeCard({ r }: { r: Recipe }) {
  const [msg, setMsg] = useState<string | null>(null);
  const { push } = useToasts();

  async function bookTasting() {
    setMsg("Booking…");
    try {
      const res = await fetch("/api/book-tasting", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ recipe_id: r.id, guests: 2 }),
      });
      const json = await res.json();
      if (json?.ok) {
        setMsg(`✔ ${json.confirmation} • $${json.estimate_usd}`);
        push("ok", `Booked! ${json.confirmation} • $${json.estimate_usd}`);
      } else {
        setMsg(`✖ ${json?.error || "unknown_error"}`);
        push("err", `Failed: ${json?.error || "unknown_error"}`);
      }
    } catch (e: any) {
      setMsg(`✖ ${e.message || "network_error"}`);
      push("err", `Failed: ${e.message || "network_error"}`);
    }
  }

  return (
    <Card>
      {r.imageUrl && (
        <div className="thumb">
          <NextImage
            src={r.imageUrl}
            alt={r.name}
            fill
            sizes="(max-width: 768px) 92vw, 340px"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>
      )}

      <header>
        <h4>{r.name}</h4>
        <small>USVI • {r.prep_minutes} min</small>
      </header>

      <p style={{ margin: "6px 0 8px" }}>${r.price_usd.toFixed(2)} • {r.restaurant}</p>
      <ul style={{ margin: "0 0 10px 18px", padding: 0 }}>
        {r.ingredients.slice(0, 5).map((ing) => <li key={ing}>{ing}</li>)}
        {r.ingredients.length > 5 && <li>+{r.ingredients.length - 5} more</li>}
      </ul>

      <div className="row">
        <Button onClick={bookTasting}>Book Tasting</Button>
        <Button variant="outline" onClick={() => alert("Added to cart!")}>Add to Cart</Button>
        {msg && <span style={{ fontSize: 12, color: "#10b981" }}>{msg}</span>}
      </div>
    </Card>
  );
}