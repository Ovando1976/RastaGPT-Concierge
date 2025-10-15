// apps/rasta-gpt-concierge/app/lib/firebase.client.ts
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

const isBrowser = typeof window !== "undefined";

let cachedApp: FirebaseApp | null = null;
let cachedAuth: Auth | null = null;
let cachedDb: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!isBrowser) return {} as FirebaseApp; // <-- server-safe no-op
  const { initializeApp, getApps } = require("firebase/app") as typeof import("firebase/app");
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    ...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && {
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }),
  };
  cachedApp = cachedApp ?? (getApps()[0] ?? initializeApp(opts));
  return cachedApp;
}

export function getFirebaseAuth(): Auth {
  if (!isBrowser) return {} as Auth; // <-- server-safe no-op
  const { getAuth } = require("firebase/auth") as typeof import("firebase/auth");
  cachedAuth = cachedAuth ?? getAuth(getFirebaseApp());
  return cachedAuth;
}

export function getFirebaseDb(): Firestore {
  if (!isBrowser) return {} as Firestore; // <-- server-safe no-op
  const { getFirestore } = require("firebase/firestore") as typeof import("firebase/firestore");
  cachedDb = cachedDb ?? getFirestore(getFirebaseApp());
  return cachedDb;
}