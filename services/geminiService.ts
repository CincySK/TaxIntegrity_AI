// services/geminiService.ts

export async function sendMessageToGemini(message: string): Promise<string> {
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

  /**
   * Expected worker response format:
   * {
   *   text: "...answer...",
   *   citations: [...],
   *   retrieved: number
   * }
   */
  return data.text ?? "No response from AI.";
}
