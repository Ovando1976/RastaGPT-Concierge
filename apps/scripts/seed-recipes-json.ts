#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";
import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Init Admin SDK (ADC via GOOGLE_APPLICATION_CREDENTIALS or Codespaces secret)
if (getApps().length === 0) {
  initializeApp({
    // If GOOGLE_APPLICATION_CREDENTIALS is set, applicationDefault() will pick it up.
    credential: applicationDefault(),
  });
}

const db = getFirestore();

type Doc = Record<string, any>;

async function main() {
  const jsonPath = process.argv[2] || "data/recipes.json";
  const abs = path.resolve(process.cwd(), jsonPath);
  const raw = fs.readFileSync(abs, "utf8");
  const arr = JSON.parse(raw) as Doc[];

  let count = 0;
  for (const doc of arr) {
    const slug = doc.slug?.trim?.();
    if (!slug || !doc.name) continue;

    // server timestamps
    if (!doc.createdAt) doc.createdAt = FieldValue.serverTimestamp();
    doc.updatedAt = FieldValue.serverTimestamp();

    await db.collection("recipes").doc(slug).set(doc, { merge: true });
    count++;
  }

  console.log(`✅ Seed complete: ${count} recipes`);
}

main().catch((e) => {
  console.error("❌ Seeder failed:", e);
  process.exit(1);
});