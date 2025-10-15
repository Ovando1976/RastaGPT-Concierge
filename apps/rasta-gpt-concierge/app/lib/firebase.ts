"use client";

import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Build the options WITHOUT undefined props (important when exactOptionalPropertyTypes is enabled)
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
  // Only spread the property if it’s present; avoids `string | undefined` error
  return measurementId ? { ...base, measurementId } : base;
}

let cachedApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!cachedApp) {
    const config = buildFirebaseOptions();
    cachedApp = getApps().length ? getApps()[0]! : initializeApp(config);
  }
  return cachedApp;
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}