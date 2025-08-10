import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Send, User, Bot } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Halo! Silakan tanyakan apa saja tentang saya atau portofolio ini." }
  ]);

  const handleSend = () => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: question }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Terima kasih sudah bertanya! Saya akan segera menjawab pertanyaan Anda." }
      ]);
    }, 600);

    setQuestion("");
  };

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
            <span className="text-cyan-300 text-sm font-medium">Hubungi Saya</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-6">
            Mari Berdiskusi dan Berkolaborasi
          </h2>

          <p className="text-white/70 text-lg mb-10">
            Punya proyek menarik atau ingin bekerja sama? Saya selalu terbuka untuk diskusi
            dan kolaborasi pada proyek-proyek yang menantang.
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
                className="px-5 py-3 text-lg flex items-center gap-2 w-full sm:w-auto"
              >
                <Send size={20} /> Kirim
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
}
