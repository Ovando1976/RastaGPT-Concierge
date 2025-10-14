export const runtime = "nodejs";

export async function POST(req: Request) {
  const { to, pax = 1, island = "St. Thomas", when = "ASAP" } = await req.json();
  if (!to) return Response.json({ ok: false, error: "missing_destination" }, { status: 400 });

  const base = 12; const perPax = 4.5; const surge = when === "ASAP" ? 1.0 : 0.9;
  const fare = +((base + perPax * Math.max(0, pax - 1)) * surge).toFixed(2);
  const code = `RG${(1000 + Math.floor(Math.random() * 9000))}`;

  return Response.json({
    ok: true, to, pax, island, when, fare_estimate_usd: fare, confirmation: code,
    driver: { name: "Island Driver", phone: "+1-340-555-1212" }
  });
}