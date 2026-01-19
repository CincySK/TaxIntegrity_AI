// services/geminiService.ts
// This now talks ONLY to the Cloudflare RAG worker (ChatGPT powered)

export interface RAGResponse {
  text: string;
  citations?: {
    tag: string;
    source: string;
    page: number | null;
    score: number;
  }[];
  retrieved?: number;
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

  return response.json();
}
