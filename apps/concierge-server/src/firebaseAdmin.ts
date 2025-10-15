import * as admin from "firebase-admin";

if (!admin.apps.length) {
  // Use ADC in Render/Cloud (recommended) or set GOOGLE_APPLICATION_CREDENTIALS
  admin.initializeApp();
}

export const adminDb = admin.firestore();