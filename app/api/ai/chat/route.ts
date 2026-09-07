import { POST as chatPost } from "../../../../apps/rasta-gpt-concierge/app/api/ai/chat/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const POST = chatPost;
