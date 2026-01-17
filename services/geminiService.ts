import { GoogleGenAI, Chat } from "@google/genai";
import { TAX_INTEGRITY_KNOWLEDGE_BASE } from '../constants';

// Initialize client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-flash-preview';

const SYSTEM_INSTRUCTION = `
You are the TaxIntegrity AI, an expert tax auditing assistant.
Your primary role is to assist auditors and users in understanding tax compliance, identifying risks, and navigating the specific guidelines of the TaxIntegrity framework.

You have access to the following KNOWLEDGE BASE (representing the TaxIntegrity website content). 
ALWAYS prioritize this information when answering queries. If the answer is not in the knowledge base, use your general knowledge but mention that it is general advice.

--- KNOWLEDGE BASE START ---
${TAX_INTEGRITY_KNOWLEDGE_BASE}
--- KNOWLEDGE BASE END ---

Guidelines for response:
1. Be professional, precise, and authoritative yet helpful.
2. Use Markdown for formatting (lists, bold text for key terms).
3. If a user asks about "High Risk" factors, strictly refer to section 3 of the knowledge base.
4. If asked about contact info, provide the email from the knowledge base.
5. Keep answers concise unless a detailed explanation is requested.
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.4, // Lower temperature for more consistent/factual answers
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    return result.text || "I processed the request but received no text output.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};