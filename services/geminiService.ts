const WORKER_URL = "https://taxintegrity-chat-worker.samanyu-karanam.workers.dev/";
export function createChatSession() {
  // keep compatibility with your UI (not used anymore)
  return {};
}

export async function sendMessageToGemini(_chat: any, message: string): Promise<string> {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(`Chat API failed: ${resp.status} ${txt}`);
  }

  const data = (await resp.json()) as { text?: string };
  return data.text ?? "No response";
}
