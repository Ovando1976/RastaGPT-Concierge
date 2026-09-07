import { createSign } from "node:crypto";

type FirestoreValue =
  | { nullValue: null }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { timestampValue: string }
  | { stringValue: string }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
  createTime?: string;
  updateTime?: string;
};

let cachedGoogleToken: { token: string; expiresAtMs: number } | null = null;

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
}

function projectId(): string {
  return process.env.FIREBASE_PROJECT_ID?.trim()
    || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim()
    || requiredEnv("FIREBASE_PROJECT_ID");
}

function databaseName(): string {
  return `projects/${projectId()}/databases/(default)`;
}

function encodePath(path: string): string {
  return path.split("/").filter(Boolean).map(encodeURIComponent).join("/");
}

function documentName(path: string): string {
  return `${databaseName()}/documents/${path}`;
}

function base64Url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getGoogleAccessToken(): Promise<string> {
  if (cachedGoogleToken && cachedGoogleToken.expiresAtMs > Date.now() + 60_000) {
    return cachedGoogleToken.token;
  }

  const clientEmail = requiredEnv("FIREBASE_CLIENT_EMAIL");
  const privateKey = requiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);

  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));

  const unsigned = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();

  const assertion = `${unsigned}.${base64Url(signer.sign(privateKey))}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Firebase service-account authorization failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const data = await response.json() as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Firebase service-account authorization returned no access token.");

  cachedGoogleToken = {
    token: data.access_token,
    expiresAtMs: Date.now() + Math.max(300, data.expires_in ?? 3600) * 1000,
  };
  return data.access_token;
}

async function firestoreFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getGoogleAccessToken();
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");

  return fetch(`https://firestore.googleapis.com/v1/${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

export type VerifiedFirebaseUser = {
  uid: string;
  email?: string | undefined;
  displayName?: string | undefined;
};

export async function verifyFirebaseIdToken(idToken: string): Promise<VerifiedFirebaseUser> {
  const apiKey = requiredEnv("NEXT_PUBLIC_FIREBASE_API_KEY");
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    },
  );

  if (!response.ok) throw new Error("Invalid or expired Firebase authentication token.");

  const data = await response.json() as {
    users?: Array<{ localId?: string; email?: string; displayName?: string }>;
  };
  const user = data.users?.[0];
  if (!user?.localId) throw new Error("Firebase token did not resolve to a user.");

  return {
    uid: user.localId,
    email: user.email,
    displayName: user.displayName,
  };
}

export function toFirestoreValue(value: unknown): FirestoreValue {
  if (value === null || value === undefined) return { nullValue: null };
  if (value instanceof Date) return { timestampValue: value.toISOString() };

  switch (typeof value) {
    case "string":
      return { stringValue: value };
    case "boolean":
      return { booleanValue: value };
    case "number":
      return Number.isInteger(value)
        ? { integerValue: String(value) }
        : { doubleValue: value };
    case "object":
      if (Array.isArray(value)) {
        return { arrayValue: { values: value.map(toFirestoreValue) } };
      }
      return {
        mapValue: {
          fields: Object.fromEntries(
            Object.entries(value as Record<string, unknown>).map(([key, nested]) => [key, toFirestoreValue(nested)]),
          ),
        },
      };
    default:
      return { stringValue: String(value) };
  }
}

export function fromFirestoreValue(value: FirestoreValue | undefined): unknown {
  if (!value) return undefined;
  if ("nullValue" in value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) return (value.arrayValue.values ?? []).map(fromFirestoreValue);
  if ("mapValue" in value) {
    return Object.fromEntries(
      Object.entries(value.mapValue.fields ?? {}).map(([key, nested]) => [key, fromFirestoreValue(nested)]),
    );
  }
  return undefined;
}

export function decodeDocument(document: FirestoreDocument): Record<string, unknown> {
  const decoded = Object.fromEntries(
    Object.entries(document.fields ?? {}).map(([key, value]) => [key, fromFirestoreValue(value)]),
  );
  return { id: document.name.split("/").pop(), ...decoded };
}

export async function getDocument(
  path: string,
  transaction?: string,
): Promise<Record<string, unknown> | null> {
  const suffix = transaction ? `?transaction=${encodeURIComponent(transaction)}` : "";
  const response = await firestoreFetch(
    `${databaseName()}/documents/${encodePath(path)}${suffix}`,
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Firestore read failed (${response.status}): ${(await response.text()).slice(0, 300)}`);
  }

  return decodeDocument(await response.json() as FirestoreDocument);
}

export async function setDocument(path: string, data: Record<string, unknown>): Promise<void> {
  const fields = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, toFirestoreValue(value)]),
  );

  const response = await firestoreFetch(
    `${databaseName()}/documents/${encodePath(path)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ fields }),
    },
  );

  if (!response.ok) {
    throw new Error(`Firestore write failed (${response.status}): ${(await response.text()).slice(0, 300)}`);
  }
}

export type FirestoreWrite = Record<string, unknown>;

export function incrementWrite(
  path: string,
  baseFields: Record<string, unknown>,
  increments: Record<string, number>,
): FirestoreWrite {
  const fields = Object.fromEntries(
    Object.entries(baseFields).map(([key, value]) => [key, toFirestoreValue(value)]),
  );

  return {
    update: {
      name: documentName(path),
      fields,
    },
    updateMask: {
      fieldPaths: Object.keys(fields),
    },
    updateTransforms: [
      ...Object.entries(increments).map(([fieldPath, amount]) => ({
        fieldPath,
        increment: toFirestoreValue(amount),
      })),
      { fieldPath: "updatedAt", setToServerValue: "REQUEST_TIME" },
    ],
  };
}

export function updateWrite(path: string, data: Record<string, unknown>): FirestoreWrite {
  const fields = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, toFirestoreValue(value)]),
  );

  return {
    update: {
      name: documentName(path),
      fields,
    },
    updateMask: {
      fieldPaths: Object.keys(fields),
    },
  };
}

export async function beginTransaction(): Promise<string> {
  const response = await firestoreFetch(
    `${databaseName()}/documents:beginTransaction`,
    {
      method: "POST",
      body: JSON.stringify({ options: { readWrite: {} } }),
    },
  );

  if (!response.ok) {
    throw new Error(`Firestore transaction start failed (${response.status}): ${(await response.text()).slice(0, 300)}`);
  }

  const data = await response.json() as { transaction?: string };
  if (!data.transaction) throw new Error("Firestore transaction start returned no transaction identifier.");
  return data.transaction;
}

export async function rollbackTransaction(transaction: string): Promise<void> {
  const response = await firestoreFetch(
    `${databaseName()}/documents:rollback`,
    {
      method: "POST",
      body: JSON.stringify({ transaction }),
    },
  );

  if (!response.ok) {
    throw new Error(`Firestore transaction rollback failed (${response.status}): ${(await response.text()).slice(0, 300)}`);
  }
}

export async function commitWrites(
  writes: FirestoreWrite[],
  transaction?: string,
): Promise<void> {
  if (!writes.length) return;

  const response = await firestoreFetch(
    `${databaseName()}/documents:commit`,
    {
      method: "POST",
      body: JSON.stringify(transaction ? { writes, transaction } : { writes }),
    },
  );

  if (!response.ok) {
    throw new Error(`Firestore commit failed (${response.status}): ${(await response.text()).slice(0, 500)}`);
  }
}

export async function runStructuredQuery(
  structuredQuery: Record<string, unknown>,
): Promise<Record<string, unknown>[]> {
  const response = await firestoreFetch(
    `${databaseName()}/documents:runQuery`,
    {
      method: "POST",
      body: JSON.stringify({ structuredQuery }),
    },
  );

  if (!response.ok) {
    throw new Error(`Firestore query failed (${response.status}): ${(await response.text()).slice(0, 500)}`);
  }

  const rows = await response.json() as Array<{ document?: FirestoreDocument }>;
  return rows.flatMap((row) => row.document ? [decodeDocument(row.document)] : []);
}
