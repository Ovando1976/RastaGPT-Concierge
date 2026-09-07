import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "rastagpt-intelligence-gateway",
    configured: {
      openai: Boolean(process.env.OPENAI_API_KEY),
      firebaseAdmin: Boolean(
        process.env.FIREBASE_CLIENT_EMAIL
        && process.env.FIREBASE_PRIVATE_KEY
        && (process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
      ),
      userDailyBudget: Boolean(process.env.RASTAGPT_USER_DAILY_COST_USD),
      platformMonthlyBudget: Boolean(process.env.RASTAGPT_PLATFORM_MONTHLY_COST_USD),
      webSearch: process.env.RASTAGPT_ALLOW_WEB_SEARCH === "true",
    },
    models: {
      fast: process.env.OPENAI_FAST_MODEL || "gpt-5.6-luna",
      balanced: process.env.OPENAI_BALANCED_MODEL || "gpt-5.6-terra",
      reasoning: process.env.OPENAI_REASONING_MODEL || "gpt-5.6-sol",
    },
  });
}
