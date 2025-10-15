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
      setMsg(`✔ ${data.confirmation} • $${data.estimate_usd}`);
      push("ok", `Booked! ${data.confirmation} • $${data.estimate_usd}`);
    } else {
      setMsg(`✖ ${data?.error || "unknown_error"}`);
      push("err", `Failed: ${data?.error || "unknown_error"}`);
    }
  } catch (e: any) {
    setMsg(`✖ ${e.message || "network_error"}`);
    push("err", `Failed: ${e.message || "network_error"}`);
  }
}