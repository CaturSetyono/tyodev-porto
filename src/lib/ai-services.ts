import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Konfigurasi Gemini
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

// Konfigurasi Grok (menggunakan OpenAI SDK)
const grokApiKey = process.env.GROK_API_KEY;
const grokClient = grokApiKey ? new OpenAI({
  apiKey: grokApiKey,
  baseURL: 'https://api.x.ai/v1',
}) : null;

export type AIProvider = 'gemini' | 'grok';

export interface ChatMessage {
  role: 'user' | 'assistant';
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
- 3+ tahun pengembangan web dan mobile
- Spesialisasi dalam pembuatan aplikasi e-commerce, dashboard admin, dan aplikasi mobile
- Pernah menangani proyek untuk UMKM dan startup
- Berpengalaman dalam optimasi performa dan SEO

Jawab pertanyaan dengan ramah, informatif, dan fokus pada keahlian dan pengalaman yang relevan dengan pertanyaan. Gunakan bahasa Indonesia yang santai tapi profesional.
`;

export async function chatWithGemini(messages: ChatMessage[]): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API key tidak tersedia');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Convert messages ke format yang sesuai dengan Gemini
    const chatHistory = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    const prompt = `${portfolioContext}\n\nPertanyaan: ${lastMessage.content}`;

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error with Gemini API:', error);
    throw new Error('Gagal mendapatkan respons dari Gemini');
  }
}

export async function chatWithGrok(messages: ChatMessage[]): Promise<string> {
  if (!grokClient) {
    throw new Error('Grok API key tidak tersedia');
  }

  try {
    // Tambahkan system message dengan context portfolio
    const systemMessage = {
      role: 'system' as const,
      content: portfolioContext,
    };

    const response = await grokClient.chat.completions.create({
      model: 'grok-beta',
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'Maaf, tidak ada respons yang tersedia.';
  } catch (error) {
    console.error('Error with Grok API:', error);
    throw new Error('Gagal mendapatkan respons dari Grok');
  }
}

export async function chatWithAI(
  messages: ChatMessage[], 
  provider: AIProvider = 'gemini'
): Promise<string> {
  switch (provider) {
    case 'gemini':
      return await chatWithGemini(messages);
    case 'grok':
      return await chatWithGrok(messages);
    default:
      throw new Error('Provider AI tidak valid');
  }
}