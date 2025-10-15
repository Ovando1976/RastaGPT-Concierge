// apps/.../app/lib/firebase.client.ts
"use client";
import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const isClient = typeof window !== "undefined";

function options(): FirebaseOptions {
  const base: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  };
  const m = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
  return m ? { ...base, measurementId: m } : base; // omit undefined to satisfy exactOptionalPropertyTypes
}

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!isClient) throw new Error("getFirebaseApp() must be called in a client component");
  if (!app) app = getApps()[0] ?? initializeApp(options());
  return app;
}
export const getFirebaseAuth = (): Auth => getAuth(getFirebaseApp());
export const getFirebaseDb  = (): Firestore => getFirestore(getFirebaseApp());