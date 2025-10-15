#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";
import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (getApps().length === 0) initializeApp({ credential: applicationDefault() });
const db = getFirestore();

const WEB_PUBLIC = path.resolve("apps/rasta-gpt-concierge/public");
const OUT_DIR = path.join(WEB_PUBLIC, "images", "recipes");

function titleCase(s: string) {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function svg(title: string) {
  // dark gradient card with centered title
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1020"/>
      <stop offset="100%" stop-color="#0e1427"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
  <text x="600" y="340" text-anchor="middle" font-family="Inter, system-ui, -apple-system" font-size="64" fill="#e5f2ff">
    ${title}
  </text>
  <text x="600" y="410" text-anchor="middle" font-family="Inter, system-ui, -apple-system" font-size="28" fill="#9bbcdf">
    Placeholder image
  </text>
</svg>`;
}

async function main() {
  const snap = await db.collection("recipes").get();
  let created = 0;

  for (const d of snap.docs) {
    const r = d.data() as any;
    const url = (r.imageUrl || "").trim();
    if (!url || !url.startsWith("/images/recipes/")) continue;

    const out = path.join(OUT_DIR, url.replace("/images/recipes/", "").replace(/\.\w+$/, ".svg"));
    const fileDir = path.dirname(out);
    if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });

    const jpg = path.join(WEB_PUBLIC, url.replace(/^\/+/, ""));
    if (fs.existsSync(jpg)) continue; // already have a real image

    if (!fs.existsSync(out)) {
      fs.writeFileSync(out, svg(titleCase(r.name)));
      console.log(`🪄 Created placeholder: ${out}`);
      created++;
    }
  }
  console.log(`Done. ${created} placeholder(s) created.`);
}
main().catch(e => { console.error(e); process.exit(1); });