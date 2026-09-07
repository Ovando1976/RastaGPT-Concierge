import { runStructuredQuery } from "../server/firebase-rest";

export type RootsCitation = {
  id: string;
  title: string;
  url?: string | undefined;
  classification?: string | undefined;
  verification?: string | undefined;
};

export type RootsRetrieval = {
  context: string;
  citations: RootsCitation[];
};

function queryKeyword(input: string): string | null {
  const stop = new Set([
    "about", "after", "before", "could", "from", "have", "into", "their", "there",
    "these", "they", "this", "what", "when", "where", "which", "with", "would",
    "rastafari", "rasta", "please", "tell", "explain",
  ]);

  const tokens = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 4 && !stop.has(token));

  return tokens[0] ?? null;
}

function stringField(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export async function retrieveRootsKnowledge(message: string): Promise<RootsRetrieval> {
  const keyword = queryKeyword(message);
  if (!keyword) return { context: "", citations: [] };

  try {
    const rows = await runStructuredQuery({
      from: [{ collectionId: "knowledgeChunks" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "keywords" },
          op: "ARRAY_CONTAINS",
          value: { stringValue: keyword },
        },
      },
      limit: 6,
    });

    const reviewed = rows.filter((row) => {
      const status = stringField(row, "verification");
      return !status || status === "verified" || status === "reviewed";
    });

    const citations: RootsCitation[] = [];
    const passages: string[] = [];

    for (const [index, row] of reviewed.entries()) {
      const text = stringField(row, "text") || stringField(row, "content");
      if (!text) continue;

      const sourceTitle = stringField(row, "sourceTitle") || stringField(row, "title") || `Roots source ${index + 1}`;
      const id = String(row.id || `roots-${index + 1}`);
      const label = `R${citations.length + 1}`;

      citations.push({
        id,
        title: sourceTitle,
        url: stringField(row, "sourceUrl") || stringField(row, "url"),
        classification: stringField(row, "classification"),
        verification: stringField(row, "verification"),
      });

      passages.push(
        `[${label}] ${sourceTitle}\n`
        + `${stringField(row, "classification") ? `Classification: ${stringField(row, "classification")}\n` : ""}`
        + `${text.slice(0, 4_000)}`,
      );
    }

    return {
      context: passages.join("\n\n"),
      citations,
    };
  } catch (error) {
    console.error("Roots retrieval failed", error);
    return { context: "", citations: [] };
  }
}
