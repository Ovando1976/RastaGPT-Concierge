"use client";
import { PropsWithChildren, useRef } from "react";
import { Button } from "./ui";

export default function Carousel({ title, children }: PropsWithChildren<{ title?: string }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: -1 | 1) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <section style={{ marginTop: 24 }}>
      {title && <h3 style={{ margin: "0 0 10px" }}>{title}</h3>}
      <div className="row">
        <button className="arrow" aria-label="Prev" onClick={() => scrollBy(-1)}>‹</button>
        <div ref={ref} className="rail">{children}</div>
        <button className="arrow" aria-label="Next" onClick={() => scrollBy(1)}>›</button>
      </div>
    </section>
  );
}