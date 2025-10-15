async function bookTasting(): Promise<void> {
  setMsg("Booking…");
  try {
    const res = await fetch("/api/book-tasting", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ recipe_id: r.id, guests: 2 }),
    });

    type BookTastingResponse = {
      ok?: boolean;
      confirmation?: string;
      estimate_usd?: number;
      error?: string;
    };

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