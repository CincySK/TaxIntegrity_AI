import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Cpu } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "../types";
import { sendMessageToGemini } from "../services/geminiService";

type RAGCitation = {
  tag: string;
  source: string;
  page: number | null;
  score: number;
};

type RAGResponse = {
  text: string;
  citations?: RAGCitation[];
  retrieved?: number;
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content:
        "## Atlas AI Online \n\nI am connected to the **TaxIntegrity** secure evidence index.\n\nI can assist with:\n* Audit risk verification\n* Expense substantiation rules\n* Integrity protocol compliance\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function formatRagAnswer(data: RAGResponse): string {
    const answer = data?.text?.trim() || "No response from AI.";

    const cites = (data.citations || [])
      .filter((c) => c && c.tag)
      .slice(0, 8);

    if (cites.length === 0) return answer;

    const citationLines = cites.map((c) => {
      const page = c.page == null ? "?" : c.page;
      return `- ${c.tag} **${c.source}** (p. ${page})`;
    });

    return `${answer}\n\n---\n### Sources\n${citationLines.join("\n")}`;
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // NEW: one-argument call, returns JSON
      const result = (await sendMessageToGemini(userMsg.content)) as RAGResponse;

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: formatRagAnswer(result), // convert JSON => markdown string
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content:
          "I encountered an error connecting to the AI service. Please ensure the Worker URL is correct and the Worker is online.\n\n" +
          (error?.message ? `**Details:** ${error.message}` : ""),
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-950 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-900/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <header className="px-8 py-5 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl z-20 sticky top-0 flex items-center justify-between shadow-lg shadow-black/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-brand-500/10 rounded-xl border border-brand-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Cpu className="text-brand-400" size={22} />
            </div>
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
              Atlas Sentinel
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 pl-[54px]">
            TaxIntegrity Evidence Mode
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
          <span className="text-xs font-medium text-slate-400">System Online</span>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 z-10 relative scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-5 max-w-4xl mx-auto group ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                msg.role === "user"
                  ? "bg-slate-800 border border-slate-700 text-slate-400"
                  : "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-brand-900/30"
              }`}
            >
              {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
            </div>

            {/* Bubble */}
            <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`px-6 py-5 rounded-2xl max-w-2xl leading-relaxed shadow-xl transition-all ${
                  msg.role === "user"
                    ? "bg-slate-800 text-slate-200 border border-slate-700 rounded-tr-sm"
                    : msg.isError
                    ? "bg-red-950/40 border border-red-500/30 text-red-200 rounded-tl-sm"
                    : "bg-slate-900/80 border border-brand-500/20 text-slate-200 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                }`}
              >
                {msg.role === "model" && !msg.isError ? (
                  <div className="prose prose-sm md:prose-base max-w-none prose-invert prose-p:text-slate-300 prose-headings:text-brand-300 prose-strong:text-white prose-a:text-brand-400">
                    <ReactMarkdown
                      components={{
                        p: (props) => <p className="mb-3 last:mb-0" {...props} />,
                        ul: (props) => (
                          <ul className="list-disc ml-4 mb-3 space-y-1 text-slate-300" {...props} />
                        ),
                        li: (props) => <li {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>

              <span className="text-[10px] text-slate-600 mt-2 px-1 font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                {msg.role === "model" ? "AI Generated" : "You"} •{" "}
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-start gap-5 max-w-4xl mx-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-lg shadow-brand-900/20">
              <Sparkles size={18} className="text-brand-200 animate-spin-slow" />
            </div>
            <div className="flex gap-1.5 items-center h-12 px-4 rounded-2xl bg-slate-900/50 border border-brand-500/10">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 z-20">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-brand-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Sentinel AI about audit risks, penalties, or compliance..."
            className="w-full bg-slate-900/90 text-white placeholder-slate-500 rounded-2xl pl-6 pr-16 py-5 border border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 focus:outline-none resize-none h-[72px] shadow-2xl transition-all relative z-10 scrollbar-hide"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-3 bottom-3 aspect-square bg-brand-600 hover:bg-brand-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-brand-900/20 z-20 group-focus-within:bg-brand-500"
          >
            <Send size={20} className={isLoading ? "opacity-0" : "opacity-100"} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-4 tracking-wide">
          TAX INTEGRITY SECURE ENVIRONMENT • CONFIDENTIAL
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
