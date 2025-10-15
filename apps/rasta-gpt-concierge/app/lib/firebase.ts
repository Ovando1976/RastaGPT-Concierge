"use client";

import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const isClient = typeof window !== "undefined";

function buildFirebaseOptions(): FirebaseOptions {
  const base: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  };
  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
  return measurementId ? { ...base, measurementId } : base;
}

let cachedApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!isClient) throw new Error("getFirebaseApp() must be called in a client component");
  if (!cachedApp) cachedApp = getApps().length ? getApps()[0]! : initializeApp(buildFirebaseOptions());
  return cachedApp;
}

export const getFirebaseAuth = (): Auth => {
  if (!isClient) throw new Error("getFirebaseAuth() must be called in a client component");
  return getAuth(getFirebaseApp());
};
export const getFirebaseDb  = (): Firestore => {
  if (!isClient) throw new Error("getFirebaseDb() must be called in a client component");
  return getFirestore(getFirebaseApp());
};