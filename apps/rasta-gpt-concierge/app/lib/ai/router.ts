import "server-only";

import type { AIMode, ModelPlan } from "./types";

const MAX_MESSAGE_CHARS = 12_000;
const MAX_HISTORY_ITEMS = 10;
const MAX_HISTORY_CHARS = 30_000;

export function isAIMode(value: unknown): value is AIMode {
  return value === "general"
    || value === "roots"
    || value === "creator"
    || value === "business"
    || value === "reasoning";
}

export function validateMessage(message: unknown): string {
  if (typeof message !== "string") throw new Error("Message must be text.");
  const trimmed = message.trim();
  if (!trimmed) throw new Error("Message cannot be empty.");
  if (trimmed.length > MAX_MESSAGE_CHARS) {
    throw new Error(`Message exceeds the ${MAX_MESSAGE_CHARS.toLocaleString()} character limit.`);
  }
  return trimmed;
}

export function sanitizeHistory(
  history: unknown,
): Array<{ role: "user" | "assistant"; content: string }> {
  if (!Array.isArray(history)) return [];

  const sanitized = history
    .filter((item): item is { role: "user" | "assistant"; content: string } => {
      return Boolean(
        item
        && (item.role === "user" || item.role === "assistant")
        && typeof item.content === "string"
        && item.content.trim(),
      );
    })
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => ({ role: item.role, content: item.content.trim().slice(0, 8_000) }));

  let total = 0;
  const bounded: typeof sanitized = [];
  for (const item of sanitized.reverse()) {
    if (total + item.content.length > MAX_HISTORY_CHARS) break;
    bounded.push(item);
    total += item.content.length;
  }
  return bounded.reverse();
}

export function routeModel(mode: AIMode, requestedWeb: boolean): ModelPlan {
  const allowWebGlobally = process.env.RASTAGPT_ALLOW_WEB_SEARCH === "true";
  const allowWeb = requestedWeb && allowWebGlobally;

  switch (mode) {
    case "reasoning":
      return {
        model: process.env.OPENAI_REASONING_MODEL || "gpt-5.6-sol",
        maxOutputTokens: 3_072,
        reasoningEffort: "medium",
        allowWeb,
      };
    case "roots":
    case "creator":
    case "business":
      return {
        model: process.env.OPENAI_BALANCED_MODEL || "gpt-5.6-terra",
        maxOutputTokens: 2_400,
        allowWeb,
      };
    default:
      return {
        model: process.env.OPENAI_FAST_MODEL || "gpt-5.6-luna",
        maxOutputTokens: 1_800,
        allowWeb,
      };
  }
}
