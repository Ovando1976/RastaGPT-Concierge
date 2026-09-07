import { createHash, randomUUID } from "node:crypto";
import { NextRequest } from "next/server";

import { buildInstructions } from "../../../lib/ai/prompts";
import { persistAssistantMessage, persistUserMessage } from "../../../lib/ai/persistence";
import {
  isAIMode,
  routeModel,
  sanitizeHistory,
  validateMessage,
} from "../../../lib/ai/router";
import type { ChatRequest } from "../../../lib/ai/types";
import {
  BudgetExceededError,
  completeUsage,
  estimateReservationUsd,
  releaseUsage,
  reserveUsage,
} from "../../../lib/ai/usage";
import { retrieveRootsKnowledge } from "../../../lib/roots/retrieve";
import { verifyFirebaseIdToken } from "../../../lib/server/firebase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function bearerToken(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7).trim() || null;
}

function safeConversationId(value: unknown): string {
  if (typeof value !== "string") return randomUUID();
  const normalized = value.trim();
  return /^[a-zA-Z0-9_-]{8,100}$/.test(normalized) ? normalized : randomUUID();
}

function safetyIdentifier(userId: string): string {
  return createHash("sha256").update(`rastagpt:${userId}`).digest("hex").slice(0, 64);
}

function sse(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

type OpenAIUsage = {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
};

type CompletedEvent = {
  type?: string;
  response?: {
    status?: string;
    usage?: OpenAIUsage;
  };
};

export async function POST(request: NextRequest) {
  const token = bearerToken(request);
  if (!token) return jsonError("Authentication required.", 401);

  let user;
  try {
    user = await verifyFirebaseIdToken(token);
  } catch {
    return jsonError("Authentication is invalid or expired.", 401);
  }

  let body: ChatRequest;
  try {
    body = await request.json() as ChatRequest;
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  let message: string;
  try {
    message = validateMessage(body.message);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Invalid message.", 400);
  }

  const mode = isAIMode(body.mode) ? body.mode : "general";
  const history = sanitizeHistory(body.history);
  const conversationId = safeConversationId(body.conversationId);
  const requestId = randomUUID();
  const plan = routeModel(mode, body.web === true);

  const roots = mode === "roots"
    ? await retrieveRootsKnowledge(message)
    : { context: "", citations: [] };

  const inputCharacters =
    message.length
    + history.reduce((sum, item) => sum + item.content.length, 0)
    + roots.context.length;
  const reservedCostUsd = estimateReservationUsd(plan, inputCharacters);

  let reservation;
  try {
    reservation = await reserveUsage({
      requestId,
      userId: user.uid,
      conversationId,
      mode,
      model: plan.model,
      reservedCostUsd,
    });
  } catch (error) {
    if (error instanceof BudgetExceededError) return jsonError(error.message, 429);
    console.error("AI usage reservation failed", error);
    return jsonError("AI usage controls are unavailable, so no model request was sent.", 503);
  }

  try {
    await persistUserMessage({
      conversationId,
      requestId,
      userId: user.uid,
      mode,
      content: message,
    });
  } catch (error) {
    await releaseUsage(reservation, "Conversation persistence failed before model call.").catch(console.error);
    console.error("Conversation persistence failed", error);
    return jsonError("Conversation storage is unavailable, so no model request was sent.", 503);
  }

  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  if (!openAiKey) {
    await releaseUsage(reservation, "OPENAI_API_KEY is not configured.").catch(console.error);
    return jsonError("RastaGPT's AI provider is not configured.", 503);
  }

  const openAiInput = [
    ...history,
    { role: "user" as const, content: message },
  ];

  const upstreamBody: Record<string, unknown> = {
    model: plan.model,
    instructions: buildInstructions(mode, roots.context),
    input: openAiInput,
    stream: true,
    store: false,
    max_output_tokens: plan.maxOutputTokens,
    safety_identifier: safetyIdentifier(user.uid),
    metadata: {
      request_id: requestId,
      conversation_id: conversationId,
      mode,
    },
  };

  if (plan.reasoningEffort) {
    upstreamBody.reasoning = { effort: plan.reasoningEffort };
  }
  if (plan.allowWeb) {
    upstreamBody.tools = [{ type: "web_search" }];
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        authorization: `Bearer ${openAiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(upstreamBody),
      cache: "no-store",
      signal: request.signal,
    });
  } catch (error) {
    await releaseUsage(reservation, "OpenAI request could not be started.").catch(console.error);
    console.error("OpenAI request failed to start", error);
    return jsonError("The AI provider could not be reached.", 502);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text();
    await releaseUsage(
      reservation,
      `OpenAI rejected request (${upstream.status}): ${detail.slice(0, 250)}`,
    ).catch(console.error);
    console.error("OpenAI response error", upstream.status, detail.slice(0, 500));
    return jsonError("The AI provider rejected the request.", 502);
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      let finalized = false;

      controller.enqueue(sse("meta", {
        requestId,
        conversationId,
        mode,
        model: plan.model,
        rootsCitations: roots.citations,
      }));

      const finalizeSuccess = async (usage?: OpenAIUsage) => {
        if (finalized) return;
        finalized = true;

        const estimatedCostUsd = await completeUsage(reservation, usage);
        await persistAssistantMessage({
          conversationId,
          requestId,
          userId: user.uid,
          model: plan.model,
          mode,
          content: assistantText,
          citationIds: roots.citations.map((citation) => citation.id),
          estimatedCostUsd,
        });

        controller.enqueue(sse("done", {
          requestId,
          conversationId,
          model: plan.model,
          usage: usage ?? null,
          estimatedCostUsd,
          rootsCitations: roots.citations,
        }));
      };

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let boundary = buffer.indexOf("\n\n");
          while (boundary >= 0) {
            const block = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 2);
            boundary = buffer.indexOf("\n\n");

            const dataLines = block
              .split(/\r?\n/)
              .filter((line) => line.startsWith("data:"))
              .map((line) => line.slice(5).trim());

            if (!dataLines.length) continue;
            const raw = dataLines.join("\n");
            if (!raw || raw === "[DONE]") continue;

            let event: CompletedEvent & { delta?: string; error?: { message?: string } };
            try {
              event = JSON.parse(raw);
            } catch {
              continue;
            }

            if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
              assistantText += event.delta;
              controller.enqueue(sse("delta", { text: event.delta }));
            } else if (event.type === "response.completed") {
              await finalizeSuccess(event.response?.usage);
            } else if (
              event.type === "response.failed"
              || event.type === "response.incomplete"
              || event.type === "error"
            ) {
              throw new Error(event.error?.message || `OpenAI stream ended with ${event.type}.`);
            }
          }
        }

        if (!finalized) {
          if (assistantText.trim()) {
            await finalizeSuccess();
          } else {
            throw new Error("OpenAI stream ended without a completed response.");
          }
        }
      } catch (error) {
        const messageText = error instanceof Error ? error.message : "AI stream failed.";
        if (!finalized) {
          await releaseUsage(reservation, messageText).catch(console.error);
        }
        console.error("AI stream error", error);
        try {
          controller.enqueue(sse("error", { message: "The response was interrupted. Please try again." }));
        } catch {
          // Client may already have disconnected.
        }
      } finally {
        try {
          controller.close();
        } catch {
          // Stream may already be closed by the client.
        }
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    },
  });
}
