"use client";
import { useRef } from "react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ title?: string; itemWidth?: number }>;

export default function Carousel({ title, itemWidth = 320, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: -1 | 1) => ref.current?.scrollBy({ left: dir * itemWidth, behavior: "smooth" });

  return (
    <section style={{ marginTop: 24 }}>
      {title && <h3 style={{ fontSize: 22, margin: "0 0 12px" }}>{title}</h3>}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => scrollBy(-1)} aria-label="Prev"
          style={btnStyle}>‹</button>
        <div ref={ref} style={railStyle}>
          {children}
        </div>
        <button onClick={() => scrollBy(1)} aria-label="Next"
          style={btnStyle}>›</button>
      </div>
    </section>
  );
}

const railStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  padding: "8px 4px",
};

const btnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 20,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
  lineHeight: "36px",
  fontSize: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.06)"
};