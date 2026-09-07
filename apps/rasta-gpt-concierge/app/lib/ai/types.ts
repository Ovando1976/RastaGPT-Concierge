export const AI_MODES = ["general", "roots", "creator", "business", "reasoning"] as const;

export type AIMode = (typeof AI_MODES)[number];

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  conversationId?: string;
  message: string;
  mode?: AIMode;
  history?: ChatHistoryItem[];
  web?: boolean;
};

export type ModelPlan = {
  model: string;
  maxOutputTokens: number;
  reasoningEffort?: "low" | "medium" | "high";
  allowWeb: boolean;
  maxToolCalls: number;
};
