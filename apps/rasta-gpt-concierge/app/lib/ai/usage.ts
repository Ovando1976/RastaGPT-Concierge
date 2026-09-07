import {
  beginTransaction,
  commitWrites,
  getDocument,
  incrementWrite,
  rollbackTransaction,
  updateWrite,
} from "../server/firebase-rest";
import type { ModelPlan } from "./types";

type Usage = {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
};

type Reservation = {
  requestId: string;
  userId: string;
  conversationId: string;
  mode: string;
  model: string;
  reservedCostUsd: number;
  userMeterPath: string;
  platformMeterPath: string;
};

const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  "gpt-5.6-luna": { input: 0.20, output: 1.20 },
  "gpt-5.6-terra": { input: 2.00, output: 12.00 },
  "gpt-5.6-sol": { input: 4.00, output: 20.00 },
  "gpt-5.6": { input: 4.00, output: 20.00 },
};

const MAX_RESERVATION_RETRIES = 4;

export class BudgetExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BudgetExceededError";
  }
}

function explicitLimit(name: string, developmentFallback: number): number {
  const raw = process.env[name];
  if (!raw?.trim()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Refusing AI spend: ${name} must be explicitly configured in production.`);
    }
    return developmentFallback;
  }

  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive dollar amount.`);
  }
  return value;
}

function dateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function monthKey(date = new Date()): string {
  return date.toISOString().slice(0, 7);
}

function numberField(document: Record<string, unknown> | null, key: string): number {
  const value = document?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function priceFor(model: string): { input: number; output: number } {
  return MODEL_PRICING[model] ?? { input: 4.00, output: 20.00 };
}

function roundUsd(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function isRetryableTransactionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return error.message.includes("(409)")
    || error.message.includes("ABORTED")
    || error.message.includes("FAILED_PRECONDITION");
}

function retryDelay(attempt: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 25 * 2 ** attempt));
}

export function estimateReservationUsd(
  plan: ModelPlan,
  inputCharacters: number,
): number {
  const price = priceFor(plan.model);
  const estimatedInputTokens = Math.min(80_000, Math.ceil(inputCharacters / 3.5));
  const estimated =
    (estimatedInputTokens / 1_000_000) * price.input
    + (plan.maxOutputTokens / 1_000_000) * price.output;

  return roundUsd(Math.max(0.002, estimated * 1.2));
}

export function estimateActualCostUsd(model: string, usage?: Usage): number {
  if (!usage) return 0;
  const price = priceFor(model);
  return roundUsd(
    ((usage.input_tokens ?? 0) / 1_000_000) * price.input
    + ((usage.output_tokens ?? 0) / 1_000_000) * price.output,
  );
}

export async function reserveUsage(input: {
  requestId: string;
  userId: string;
  conversationId: string;
  mode: string;
  model: string;
  reservedCostUsd: number;
}): Promise<Reservation> {
  const userLimit = explicitLimit("RASTAGPT_USER_DAILY_COST_USD", 0.50);
  const platformLimit = explicitLimit("RASTAGPT_PLATFORM_MONTHLY_COST_USD", 25);
  const day = dateKey();
  const month = monthKey();
  const userMeterPath = `usageMeters/${input.userId}_${day}`;
  const platformMeterPath = `platformUsage/${month}`;
  const ledgerPath = `usageLedger/${input.requestId}`;

  for (let attempt = 0; attempt < MAX_RESERVATION_RETRIES; attempt += 1) {
    const transaction = await beginTransaction();

    try {
      const [userMeter, platformMeter] = await Promise.all([
        getDocument(userMeterPath, transaction),
        getDocument(platformMeterPath, transaction),
      ]);

      const userSpend =
        numberField(userMeter, "actualCostUsd")
        + numberField(userMeter, "reservedCostUsd");
      const platformSpend =
        numberField(platformMeter, "actualCostUsd")
        + numberField(platformMeter, "reservedCostUsd");

      if (userSpend + input.reservedCostUsd > userLimit) {
        await rollbackTransaction(transaction).catch(() => undefined);
        throw new BudgetExceededError(
          "Your daily AI allowance has been reached. No model request was sent.",
        );
      }

      if (platformSpend + input.reservedCostUsd > platformLimit) {
        await rollbackTransaction(transaction).catch(() => undefined);
        throw new BudgetExceededError(
          "RastaGPT's platform AI budget has been reached. No model request was sent.",
        );
      }

      const now = new Date();
      await commitWrites([
        incrementWrite(
          userMeterPath,
          { userId: input.userId, day, scope: "user-daily" },
          { reservedCostUsd: input.reservedCostUsd, requestCount: 1 },
        ),
        incrementWrite(
          platformMeterPath,
          { month, scope: "platform-monthly" },
          { reservedCostUsd: input.reservedCostUsd, requestCount: 1 },
        ),
        updateWrite(ledgerPath, {
          requestId: input.requestId,
          userId: input.userId,
          conversationId: input.conversationId,
          mode: input.mode,
          provider: "openai",
          model: input.model,
          status: "reserved",
          reservedCostUsd: input.reservedCostUsd,
          estimatedCostUsd: 0,
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
          createdAt: now,
          updatedAt: now,
        }),
      ], transaction);

      return { ...input, userMeterPath, platformMeterPath };
    } catch (error) {
      if (error instanceof BudgetExceededError) throw error;

      await rollbackTransaction(transaction).catch(() => undefined);
      if (attempt < MAX_RESERVATION_RETRIES - 1 && isRetryableTransactionError(error)) {
        await retryDelay(attempt);
        continue;
      }
      throw error;
    }
  }

  throw new Error("Unable to reserve AI usage after repeated transaction conflicts.");
}

export async function completeUsage(
  reservation: Reservation,
  usage: Usage | undefined,
): Promise<number> {
  const actualCostUsd = estimateActualCostUsd(reservation.model, usage);
  const now = new Date();

  await commitWrites([
    incrementWrite(
      reservation.userMeterPath,
      { userId: reservation.userId, day: dateKey(), scope: "user-daily" },
      {
        reservedCostUsd: -reservation.reservedCostUsd,
        actualCostUsd,
      },
    ),
    incrementWrite(
      reservation.platformMeterPath,
      { month: monthKey(), scope: "platform-monthly" },
      {
        reservedCostUsd: -reservation.reservedCostUsd,
        actualCostUsd,
      },
    ),
    updateWrite(`usageLedger/${reservation.requestId}`, {
      status: "success",
      estimatedCostUsd: actualCostUsd,
      inputTokens: usage?.input_tokens ?? 0,
      outputTokens: usage?.output_tokens ?? 0,
      totalTokens: usage?.total_tokens ?? 0,
      updatedAt: now,
    }),
  ]);

  return actualCostUsd;
}

export async function releaseUsage(
  reservation: Reservation,
  reason: string,
): Promise<void> {
  const now = new Date();

  await commitWrites([
    incrementWrite(
      reservation.userMeterPath,
      { userId: reservation.userId, day: dateKey(), scope: "user-daily" },
      { reservedCostUsd: -reservation.reservedCostUsd },
    ),
    incrementWrite(
      reservation.platformMeterPath,
      { month: monthKey(), scope: "platform-monthly" },
      { reservedCostUsd: -reservation.reservedCostUsd },
    ),
    updateWrite(`usageLedger/${reservation.requestId}`, {
      status: "error",
      error: reason.slice(0, 500),
      updatedAt: now,
    }),
  ]);
}
