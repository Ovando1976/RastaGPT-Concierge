"use client";

import { useEffect, useState } from "react";

type Probe = { connected: boolean; tools: string[]; error?: string | null };

export default function McpStatus() {
  const [probe, setProbe] = useState<Probe | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/mcp/health", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled) setProbe({ connected: !!json.connected, tools: json.tools ?? [], error: json.error ?? null });
      } catch {
        if (!cancelled) setProbe({ connected: false, tools: [], error: "network_error" });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const connected = !!probe?.connected;
  const bg = connected ? "#ecfdf5" : "#fff1f2";
  const border = connected ? "#10b981" : "#f43f5e";
  const dot = connected ? "#10b981" : "#f43f5e";
  const label = connected ? "Live MCP Connected" : "MCP Disconnected";
  const tools = probe?.tools?.slice(0, 6) ?? [];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      border: `1px solid ${border}`,
      background: bg,
      borderRadius: 10,
      marginBottom: 16
    }}>
      <span style={{
        width: 10, height: 10, borderRadius: 10, background: dot,
        boxShadow: `0 0 0 3px ${bg}`
      }} />
      <strong style={{ fontWeight: 600 }}>{label}</strong>
      {tools.length > 0 && (
        <span style={{ color: "#374151" }}>
          • tools: {tools.join(", ")}
        </span>
      )}
      {!connected && probe?.error && (
        <span style={{ color: "#6b7280" }}> • {probe.error}</span>
      )}
    </div>
  );
}