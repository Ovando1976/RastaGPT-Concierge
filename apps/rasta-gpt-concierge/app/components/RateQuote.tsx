"use client";
import { useEffect, useMemo, useState } from "react";
import { getAllRates, getRateByPair, createRideRequest } from "../lib/firestore";
import { useUser } from "./AuthProvider"; // from earlier auth step (optional)

type Option = { value: string; label: string };

export default function RateQuote() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pax, setPax] = useState(2);
  const [rate, setRate] = useState<{ onePerson: number; twoPlus: number } | null>(null);
  const [optsFrom, setOptsFrom] = useState<Option[]>([]);
  const [optsTo, setOptsTo] = useState<Option[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const { user } = useUser?.() ?? { user: null };

  useEffect(() => {
    // hydrate dropdowns with unique from/to values
    getAllRates().then((rates) => {
      const fromSet = new Set<string>(), toSet = new Set<string>();
      for (const r of rates) { fromSet.add(r.from); toSet.add(r.to); }
      setOptsFrom(Array.from(fromSet).sort().map(v => ({ value: v, label: v })));
      setOptsTo(Array.from(toSet).sort().map(v => ({ value: v, label: v })));
    });
  }, []);

  async function quote() {
    setNote("Finding route…");
    const r = await getRateByPair(from, to);
    if (!r) { setRate(null); setNote("No published route for that pair."); return; }
    setRate({ onePerson: r.onePerson, twoPlus: r.twoPlus });
    setNote(null);
  }

  const estimate = useMemo(() => {
    if (!rate) return null;
    if (pax <= 1) return rate.onePerson;
    return rate.twoPlus; // official tables usually quote group fare for 2+
  }, [rate, pax]);

  async function requestRide() {
    if (!user) { setNote("Please sign in to request a ride."); return; }
    if (!estimate) { setNote("Quote a route first."); return; }
    setNote("Creating request…");
    await createRideRequest(user.uid, {
      from, to, pax, island: inferIsland(from, to),
      estimateUSD: estimate
    });
    setNote("✔ Ride request created.");
  }

  return (
    <section style={{
      marginTop: 16, padding: 12, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fff"
    }}>
      <h3 style={{ margin: "0 0 8px" }}>🚕 Official Taxi Rate</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <select value={from} onChange={e => setFrom(e.target.value)} style={sel}>
          <option value="">From</option>
          {optsFrom.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select value={to} onChange={e => setTo(e.target.value)} style={sel}>
          <option value="">To</option>
          {optsTo.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <input type="number" min={1} max={6} value={pax} onChange={e => setPax(Number(e.target.value))}
          style={{ ...sel, width: 100 }} />
        <button onClick={quote} style={btn}>Quote</button>
        {estimate != null && <span style={{ marginLeft: 8 }}><b>${estimate.toFixed(2)}</b> {pax} pax</span>}
        <button onClick={requestRide} style={{ ...btn, opacity: estimate ? 1 : 0.6 }}>Request Ride</button>
      </div>
      {note && <p style={{ color: "#6b7280", marginTop: 8 }}>{note}</p>}
    </section>
  );
}

function inferIsland(a: string, b: string) {
  // quick heuristic by place name—customize with your own mapping
  const t = (a + " " + b).toLowerCase();
  if (/(charlotte|magens|cyril|st\.?\s*thomas)/.test(t)) return "St. Thomas";
  if (/(cruz|st\.?\s*john)/.test(t)) return "St. John";
  if (/(stx|st\.?\s*croix|teague)/.test(t)) return "St. Croix";
  return "USVI";
}

const sel: React.CSSProperties = { padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb" };
const btn: React.CSSProperties = { padding: "8px 10px", borderRadius: 10, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer" };