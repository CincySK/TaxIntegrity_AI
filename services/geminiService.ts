// services/geminiService.ts

export async function sendMessageToGemini(message: string): Promise<any> {
  const WORKER_URL =
    "https://taxintegrity-chat-worker.samanyu-karanam.workers.dev/";

  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Worker error ${response.status}: ${text}`);
  }

  return await response.json();
}
