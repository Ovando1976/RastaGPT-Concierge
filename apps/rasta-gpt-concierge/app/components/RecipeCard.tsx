"use client";

import NextImage from "next/image";
import { useCallback, useState } from "react";
import { Card, Button } from "./ui";
import type { Recipe } from "../types";
import { useToasts } from "./Toast";

type BookTastingResponse = {
  ok?: boolean;
  confirmation?: string;
  estimate_usd?: number;
  error?: string;
};

type Props = { r: Recipe };

export default function RecipeCard({ r }: Props) {
  const { push } = useToasts();
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const bookTasting = useCallback(async (): Promise<void> => {
    if (pending) return;
    setPending(true);
    setMsg("Booking…");
    try {
      const res = await fetch("/api/book-tasting", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ recipe_id: r.id, guests: 2 }),
      });

      const data = (await res.json()) as BookTastingResponse;

      if (data?.ok) {
        const note = `✔ ${data.confirmation} • $${data.estimate_usd}`;
        setMsg(note);
        push("ok", `Booked! ${data.confirmation} • $${data.estimate_usd}`);
      } else {
        const err = data?.error || "unknown_error";
        setMsg(`✖ ${err}`);
        push("err", `Failed: ${err}`);
      }
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : "network_error";
      setMsg(`✖ ${err}`);
      push("err", `Failed: ${err}`);
    } finally {
      setPending(false);
    }
  }, [pending, r.id, push]);

  return (
    <Card>
      {r.imageUrl ? (
        <div className="thumb" style={{ position: "relative", width: "100%", height: 180 }}>
          <NextImage
            src={r.imageUrl}
            alt={r.name}
            fill
            sizes="(max-width: 768px) 92vw, 340px"
            style={{ objectFit: "cover", borderRadius: 12 }}
            priority={false}
          />
        </div>
      ) : null}

      <header style={{ marginTop: r.imageUrl ? 10 : 0 }}>
        <h4 style={{ margin: 0 }}>{r.name}</h4>
        <small style={{ color: "#9ca3af" }}>
          {r.cuisine ?? "Caribbean"} • {r.prep_minutes} min
        </small>
      </header>

      <p style={{ margin: "8px 0 10px" }}>
        {typeof r.price_usd === "number" ? `$${r.price_usd.toFixed(2)}` : "$—"} •{" "}
        {r.restaurant || "—"}
      </p>

      <ul style={{ margin: "0 0 10px 18px", padding: 0 }}>
        {r.ingredients.slice(0, 5).map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
        {r.ingredients.length > 5 && <li>+{r.ingredients.length - 5} more</li>}
      </ul>

      <div className="row" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button onClick={bookTasting} disabled={pending}>
          {pending ? "Booking…" : "Book Tasting"}
        </Button>
        <Button variant="outline" onClick={() => alert("Added to cart!")}>
          Add to Cart
        </Button>
        {msg && (
          <span
            aria-live="polite"
            style={{ fontSize: 12, color: msg.startsWith("✔") ? "#10b981" : "#ef4444" }}
          >
            {msg}
          </span>
        )}
      </div>
    </Card>
  );
}