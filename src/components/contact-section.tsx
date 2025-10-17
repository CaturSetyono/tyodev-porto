import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Send, User, Bot } from "lucide-react";
import React, { useState, useCallback } from "react";
import type {
  ChatMessage,
  AIProvider,
  ChatResponse,
  ChatError,
} from "@/types/chat";

const ContactSection = React.memo(function ContactSection() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "bot",
      text: "👋 Halo! Silakan tanyakan apa saja tentang saya atau portofolio ini.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState<AIProvider>("gemini");

  const handleSend = useCallback(async () => {
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = { from: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      // Prepare messages for API call
      const chatMessages = messages
        .filter((msg) => msg.from !== "bot" || !msg.text.includes("👋 Halo!")) // Remove initial greeting
        .map((msg) => ({
          role:
            msg.from === "user" ? ("user" as const) : ("assistant" as const),
          content: msg.text,
        }));

      // Add current question
      chatMessages.push({
        role: "user" as const,
        content: question,
      });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: chatMessages,
          provider: aiProvider,
        }),
      });

      const data: ChatResponse | ChatError = await response.json();

      if (!response.ok) {
        throw new Error(
          "error" in data ? data.error : "Gagal mendapatkan respons"
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: (data as ChatResponse).message,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [question, messages, isLoading, aiProvider]);

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-indigo-950 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30 mb-6">
            <span className="text-cyan-300 text-sm font-medium">
              Hubungi Saya
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-6">
            Mari Berdiskusi dan Berkolaborasi
          </h2>

          <p className="text-white/70 text-lg mb-10">
            Punya proyek menarik atau ingin bekerja sama? Saya selalu terbuka
            untuk diskusi dan kolaborasi pada proyek-proyek yang menantang.
          </p>

          {/* Tombol Kontak */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <Button className="flex items-center gap-2" size="lg">
              <Mail className="w-5 h-5" />
              Email Saya
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-white/20 hover:bg-white/10"
              size="lg"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-white/20 hover:bg-white/10"
              size="lg"
            >
              <Github className="w-5 h-5" />
              GitHub
            </Button>
          </div>

          {/* Chatbot */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 max-w-2xl mx-auto shadow-lg">
            {/* AI Provider Selector */}
            <div className="flex justify-center mb-4">
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setAiProvider("gemini")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    aiProvider === "gemini"
                      ? "bg-cyan-500/30 text-cyan-300 shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Gemini AI
                </button>
                <button
                  onClick={() => setAiProvider("openai")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    aiProvider === "openai"
                      ? "bg-cyan-500/30 text-cyan-300 shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  OpenAI
                </button>
              </div>
            </div>
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto space-y-4 mb-6 scrollbar-thin scrollbar-thumb-white/20">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  } animate-fadeIn`}
                >
                  {msg.from === "bot" && (
                    <div className="flex-shrink-0 w-9 h-9 bg-cyan-500/20 border border-cyan-400/50 rounded-full flex items-center justify-center">
                      <Bot size={18} className="text-cyan-300" />
                    </div>
                  )}
                  <div
                    className={`px-5 py-3 rounded-xl max-w-[75%] text-base leading-relaxed ${
                      msg.from === "bot"
                        ? "bg-cyan-500/20 text-cyan-100 text-left"
                        : "bg-indigo-500/40 text-white text-right"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.from === "user" && (
                    <div className="flex-shrink-0 w-9 h-9 bg-indigo-500/40 border border-indigo-400/50 rounded-full flex items-center justify-center">
                      <User size={18} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start animate-fadeIn">
                  <div className="flex-shrink-0 w-9 h-9 bg-cyan-500/20 border border-cyan-400/50 rounded-full flex items-center justify-center">
                    <Bot size={18} className="text-cyan-300" />
                  </div>
                  <div className="px-5 py-3 rounded-xl bg-cyan-500/20 text-cyan-100 text-left">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm">Sedang mengetik...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Tanyakan sesuatu tentang saya..."
                className="w-full px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !question.trim()}
                className="px-5 py-3 text-lg flex items-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} /> {isLoading ? "Mengirim..." : "Kirim"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animasi */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
});
export default ContactSection;
