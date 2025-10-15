#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";
import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (getApps().length === 0) initializeApp({ credential: applicationDefault() });

const db = getFirestore();

// adjust if your web app path differs
const WEB_PUBLIC = path.resolve("apps/rasta-gpt-concierge/public");
const RECIPES_DIR = path.join(WEB_PUBLIC, "images", "recipes");

function exists(p: string) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

async function main() {
  const snap = await db.collection("recipes").get();
  const rows = snap.docs.map(d => d.data() as any);

  const missing: string[] = [];
  for (const r of rows) {
    const url = (r.imageUrl || "").trim();
    if (!url || !url.startsWith("/images/recipes/")) {
      console.log(`❗ ${r.slug}: imageUrl missing or not under /images/recipes`);
      missing.push(r.slug);
      continue;
    }
    const file = path.join(WEB_PUBLIC, url.replace(/^\/+/, ""));
    if (!exists(file)) {
      console.log(`❌ Missing file for ${r.slug}: ${file}`);
      missing.push(r.slug);
    } else {
      console.log(`✅ ${r.slug}`);
    }
  }

  console.log(`\nResult: ${rows.length} recipes checked, ${missing.length} missing images.`);
  if (missing.length) {
    console.log("Missing slugs:", missing.join(", "));
  }
}
main().catch(e => { console.error(e); process.exit(1); });