import { useState } from "react";
import { sendMessageToGemini, RAGResponse } from "../services/geminiService";
import { ChatMessage } from "../types";

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask a question about U.S. taxes, audits, or the tax gap. I will answer using official evidence.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const ragResponse: RAGResponse = await sendMessageToGemini(
        userMessage.content
      );

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: ragResponse.text || "No response generated.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ An error occurred while contacting the AI service. Please try again.",
        },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 text-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-3xl px-4 py-3 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-brand-600 text-white"
                : "mr-auto bg-slate-800 text-slate-100"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-slate-800 text-slate-400 px-4 py-3 rounded-xl">
            Thinking…
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 p-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a tax question…"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-brand-600 hover:bg-brand-500 px-5 py-2 rounded-lg font-medium disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
