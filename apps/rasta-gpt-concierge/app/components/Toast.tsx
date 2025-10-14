"use client";
import { useEffect, useState } from "react";

type T = { id: number; msg: string; kind: "ok"|"err" };
let pushToast: (t: Omit<T,"id">) => void;

export function useToasts() {
  const [_, setTick] = useState(0);
  useEffect(() => { setTick((x) => x + 1); }, []);
  return { push: (kind: T["kind"], msg: string) => pushToast?.({ kind, msg }) };
}

export default function ToastHost() {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    pushToast = (t) => {
      const id = Date.now();
      setItems((it) => [...it, { id, ...t }]);
      setTimeout(() => setItems((it) => it.filter((x) => x.id !== id)), 3500);
    };
  }, []);
  return (
    <div style={{
      position: "fixed", right: 16, bottom: 16, display: "flex",
      flexDirection: "column", gap: 8, zIndex: 50,
    }}>
      {items.map((t) => (
        <div key={t.id} style={{
          background: t.kind === "ok" ? "#ecfdf5" : "#fef2f2",
          border: `1px solid ${t.kind === "ok" ? "#10b981" : "#ef4444"}`,
          color: "#111827", padding: "10px 12px", borderRadius: 10,
          boxShadow: "0 3px 8px rgba(0,0,0,0.08)"
        }}>{t.msg}</div>
      ))}
    </div>
  );
}