import "server-only";

import { getDocument, setDocument } from "../server/firebase-rest";

export async function persistUserMessage(input: {
  conversationId: string;
  requestId: string;
  userId: string;
  mode: string;
  content: string;
}): Promise<void> {
  const existing = await getDocument(`conversations/${input.conversationId}`);
  if (existing?.ownerId && existing.ownerId !== input.userId) {
    throw new Error("Conversation access denied.");
  }

  const now = new Date();
  await Promise.all([
    setDocument(`conversations/${input.conversationId}`, {
      ownerId: input.userId,
      title: typeof existing?.title === "string"
        ? existing.title
        : input.content.slice(0, 80),
      mode: input.mode,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      visibility: "private",
      status: "active",
    }),
    setDocument(`messages/${input.requestId}_user`, {
      ownerId: input.userId,
      conversationId: input.conversationId,
      requestId: input.requestId,
      role: "user",
      content: input.content,
      createdAt: now,
      visibility: "private",
      status: "active",
    }),
  ]);
}

export async function persistAssistantMessage(input: {
  conversationId: string;
  requestId: string;
  userId: string;
  model: string;
  mode: string;
  content: string;
  citationIds: string[];
  estimatedCostUsd: number;
}): Promise<void> {
  const now = new Date();
  await Promise.all([
    setDocument(`messages/${input.requestId}_assistant`, {
      ownerId: input.userId,
      conversationId: input.conversationId,
      requestId: input.requestId,
      role: "assistant",
      content: input.content,
      model: input.model,
      mode: input.mode,
      citationIds: input.citationIds,
      estimatedCostUsd: input.estimatedCostUsd,
      createdAt: now,
      visibility: "private",
      status: "active",
    }),
    (async () => {
      const existing = await getDocument(`conversations/${input.conversationId}`);
      await setDocument(`conversations/${input.conversationId}`, {
        ownerId: input.userId,
        title: typeof existing?.title === "string" ? existing.title : "RastaGPT conversation",
        mode: input.mode,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
        visibility: "private",
        status: "active",
      });
    })(),
  ]);
}
