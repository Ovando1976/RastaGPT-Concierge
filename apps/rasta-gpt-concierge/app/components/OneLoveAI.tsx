"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { useUser } from "./AuthProvider";
import styles from "./OneLoveAI.module.css";

type Mode = "general" | "roots" | "creator" | "business" | "reasoning";
type Message = { id: string; role: "user" | "assistant"; content: string };

type Citation = {
  id: string;
  title: string;
  url?: string;
  classification?: string;
};

const MODES: Array<{ id: Mode; label: string }> = [
  { id: "general", label: "General" },
  { id: "roots", label: "Roots" },
  { id: "creator", label: "Creator" },
  { id: "business", label: "Business" },
  { id: "reasoning", label: "Reasoning" },
];

const MODE_PLACEHOLDERS: Record<Mode, string> = {
  general: "Ask One Love AI anything…",
  roots: "Ask about Rastafari, Caribbean history, culture, or ideas…",
  creator: "Create a concept, document, campaign, story, or brand…",
  business: "Build a plan, offer, pricing strategy, or sales system…",
  reasoning: "Work through a complex decision or research problem…",
};

function newConversationId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export default function OneLoveAI() {
  const { user, loading, login } = useUser();
  const [mode, setMode] = useState<Mode>("general");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [model, setModel] = useState("");
  const [citations, setCitations] = useState<Citation[]>([]);
  const conversationId = useRef(newConversationId());

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to One Love AI. Ask, reason, create, or explore the Roots. I’ll keep cultural claims clear about what is documented, believed, interpreted, or disputed.",
    },
  ]);

  const history = useMemo(
    () => messages
      .filter((message) => message.id !== "welcome" && message.content.trim())
      .slice(-10)
      .map(({ role, content }) => ({ role, content })),
    [messages],
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || !user || sending) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: text,
    };
    const assistantId = `assistant_${Date.now()}`;

    setInput("");
    setError("");
    setCitations([]);
    setSending(true);
    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          conversationId: conversationId.current,
          message: text,
          mode,
          history,
          web: false,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(payload.error || `Request failed with status ${response.status}.`);
      }
      if (!response.body) throw new Error("The server returned no response stream.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let boundary = buffer.indexOf("\n\n");

        while (boundary >= 0) {
          const block = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          boundary = buffer.indexOf("\n\n");

          let eventName = "message";
          const dataLines: string[] = [];

          for (const line of block.split(/\r?\n/)) {
            if (line.startsWith("event:")) eventName = line.slice(6).trim();
            if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
          }

          if (!dataLines.length) continue;

          let data: any;
          try {
            data = JSON.parse(dataLines.join("\n"));
          } catch {
            continue;
          }

          if (eventName === "delta" && typeof data.text === "string") {
            setMessages((current) => current.map((message) =>
              message.id === assistantId
                ? { ...message, content: message.content + data.text }
                : message,
            ));
          } else if (eventName === "meta") {
            if (typeof data.model === "string") setModel(data.model);
            if (Array.isArray(data.rootsCitations)) setCitations(data.rootsCitations);
          } else if (eventName === "done") {
            if (typeof data.model === "string") setModel(data.model);
            if (Array.isArray(data.rootsCitations)) setCitations(data.rootsCitations);
          } else if (eventName === "error") {
            throw new Error(data.message || "The response was interrupted.");
          }
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setMessages((current) => current.map((item) =>
        item.id === assistantId && !item.content
          ? { ...item, content: "I couldn’t complete that response. Please try again." }
          : item,
      ));
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={styles.shell} aria-label="One Love AI">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>RastaGPT Intelligence</p>
          <h2 className={styles.title}>One Love AI</h2>
          <p className={styles.subtitle}>
            Global intelligence with Caribbean consciousness — grounded, useful, and never reduced to a stereotype.
          </p>
        </div>
        <div className={styles.status}>{model || "Intelligence router ready"}</div>
      </header>

      <div className={styles.modes} aria-label="Conversation mode">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.mode} ${mode === item.id ? styles.modeActive : ""}`}
            onClick={() => setMode(item.id)}
            aria-pressed={mode === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loginBox}>Checking your secure session…</div>
      ) : !user ? (
        <div className={styles.loginBox}>
          <p>Sign in to use One Love AI. Model calls are authenticated and usage-controlled.</p>
          <button className={styles.loginButton} type="button" onClick={() => void login()}>
            Continue with Google
          </button>
        </div>
      ) : (
        <>
          <div className={styles.messages} aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${message.role === "user" ? styles.user : styles.assistant}`}
              >
                <span className={styles.label}>{message.role === "user" ? "You" : "One Love AI"}</span>
                {message.content || (sending ? "Thinking…" : "")}
                {message.role === "assistant" && message.id !== "welcome" && citations.length > 0 && (
                  <div className={styles.citations}>
                    {citations.map((citation, index) => citation.url ? (
                      <a
                        key={citation.id}
                        className={styles.citation}
                        href={citation.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        R{index + 1} · {citation.title}
                      </a>
                    ) : (
                      <span key={citation.id} className={styles.citation}>
                        R{index + 1} · {citation.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form className={styles.composer} onSubmit={submit}>
            <div className={styles.inputWrap}>
              <textarea
                className={styles.input}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={MODE_PLACEHOLDERS[mode]}
                maxLength={12_000}
                rows={2}
                disabled={sending}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <button className={styles.send} type="submit" disabled={sending || !input.trim()}>
                {sending ? "…" : "Send"}
              </button>
            </div>
            <div className={styles.footnote}>
              <span>{mode === "roots" ? "Roots mode uses reviewed knowledge when available." : "Private conversations are saved to your account."}</span>
              <span>AI spending is checked before each request.</span>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
