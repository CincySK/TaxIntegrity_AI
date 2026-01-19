// services/geminiService.ts

export interface Citation {
  tag: string;          // e.g. "#1"
  source: string;       // PDF filename
  page: number | null;  // page number if known
  score: number | null; // similarity score
}

export interface RAGResponse {
  text: string;
  citations: Citation[];
  retrieved: number;
  used_general_knowledge?: boolean;
}

export async function sendMessageToGemini(
  message: string
): Promise<RAGResponse> {
  const WORKER_URL =
    "https://taxintegrity-chat-worker.samanyu-karanam.workers.dev/";

  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Worker error ${response.status}: ${text}`);
  }

  const data = await response.json();

  // Defensive validation so UI never crashes
  return {
    text: data.text ?? "No response from AI.",
    citations: Array.isArray(data.citations) ? data.citations : [],
    retrieved: typeof data.retrieved === "number" ? data.retrieved : 0,
    used_general_knowledge: Boolean(data.used_general_knowledge),
  };
}
