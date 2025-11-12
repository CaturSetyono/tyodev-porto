import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// Konfigurasi Gemini
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

// Konfigurasi OpenAI
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiClient = openaiApiKey
  ? new OpenAI({
      apiKey: openaiApiKey,
      baseURL: "https://openrouter.ai/api/v1",
    })
  : null;

export type AIProvider = "gemini" | "openai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Context tentang portfolio untuk memberikan respons yang relevan
const portfolioContext = `
Kamu adalah asisten AI untuk portfolio website Tyo Dev. Berikut informasi tentang pemilik portfolio:

Nama: Tyo Dev (Catur Setyono)
Profesi: Full-Stack Developer & Mobile App Developer
Keahlian: 
- Frontend: React, Next.js, Vue.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, Python, PHP
- Mobile: React Native, Flutter
- Database: MySQL, PostgreSQL, MongoDB
- Cloud: AWS, Google Cloud, Vercel
- Tools: Git, Docker, Figma

Pengalaman:
- 1+ tahun pengembangan web 
- Spesialisasi dalam pembuatan aplikasi e-commerce, dashboard admin, dan aplikasi mobile
- Pernah menangani proyek untuk UMKM dan startup
- Berpengalaman dalam optimasi performa dan SEO

Jawab pertanyaan dengan ramah, informatif, dan fokus pada keahlian dan pengalaman yang relevan dengan pertanyaan. Gunakan bahasa Indonesia yang santai tapi profesional.
`;

export async function chatWithGemini(messages: ChatMessage[]): Promise<string> {
  if (!genAI) {
    throw new Error("Gemini API key tidak tersedia");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Convert messages ke format yang sesuai dengan Gemini
    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) {
      throw new Error("No message provided");
    }

    const prompt = `${portfolioContext}\n\nPertanyaan: ${lastMessage.content}`;

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error with Gemini API:", error);
    throw new Error("Gemini API tidak tersedia atau terjadi kesalahan");
  }
}

export async function chatWithOpenAI(messages: ChatMessage[]): Promise<string> {
  if (!openaiClient) {
    throw new Error("OpenAI API key tidak tersedia");
  }

  try {
    // Tambahkan system message dengan context portfolio
    const systemMessage = {
      role: "system" as const,
      content: portfolioContext,
    };

    const response = await openaiClient.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    return (
      response.choices[0]?.message?.content ||
      "Maaf, tidak ada respons yang tersedia."
    );
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("OpenAI API tidak tersedia atau terjadi kesalahan");
  }
}

export async function chatWithAI(
  messages: ChatMessage[],
  provider: AIProvider = "gemini"
): Promise<string> {
  // Fallback response when APIs are not configured
  const fallbackResponse = `Terima kasih atas pertanyaan Anda tentang portfolio saya. 
    Saya adalah Catur Setyono, seorang Full-Stack Developer dengan keahlian dalam React, Next.js, TypeScript, dan berbagai teknologi modern lainnya. 
    Silakan hubungi saya langsung melalui email atau LinkedIn untuk informasi lebih detail.`;

  try {
    switch (provider) {
      case "gemini":
        return await chatWithGemini(messages);
      case "openai":
        return await chatWithOpenAI(messages);
      default:
        return fallbackResponse;
    }
  } catch (error) {
    console.warn("AI API not configured, using fallback response:", error);
    return fallbackResponse;
  }
}
