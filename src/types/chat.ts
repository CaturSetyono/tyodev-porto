export interface ChatMessage {
  from: "user" | "bot";
  text: string;
  timestamp?: Date;
}

export interface ApiChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type AIProvider = "gemini" | "openai";

export interface ChatResponse {
  message: string;
  provider: AIProvider;
}

export interface ChatError {
  error: string;
}
