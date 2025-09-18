"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-slate-900" />;

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
    >
      <div className="container mx-auto px-6 py-16 max-w-6xl md:pt-32">
      <div className="bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Section - Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Hi, I'm <span className="text-cyan-400">Catur Setyono</span>
                </h1>
                <p className="text-lg text-slate-300 font-medium">Web Developer | Frontend Specialist</p>
              </div>

              <p className="text-slate-300 leading-relaxed">
                I build fast, responsive, and visually engaging websites using{" "}
                <span className="text-cyan-400">modern technologies</span> and{" "}
                <span className="text-cyan-400">good code</span> to deliver high-quality user experiences.
              </p>

              <div className="flex gap-3 pt-2">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>
              </div>

              <div className="flex gap-3 pt-4">
                <Button size="icon" variant="ghost" className="text-slate-400 hover:text-cyan-400">
                  <Github className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-slate-400 hover:text-cyan-400">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-slate-400 hover:text-cyan-400">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section - Image/Visual */}
          <div className="bg-slate-800/30 p-8 md:p-12 flex flex-col justify-center items-center">
            <div className="w-48 h-48 bg-slate-700 rounded-full mb-6 flex items-center justify-center border-2 border-cyan-400/30">
              <img
                src="/professional-developer-portrait.png"
                alt="Catur Setyono"
                className="w-44 h-44 rounded-full object-cover"
              />
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-white">Catur Setyono</h3>
              <p className="text-cyan-400 text-sm font-medium">Web Developer</p>

              <div className="grid grid-cols-2 gap-2 max-w-xs mt-4">
                <span className="px-3 py-2 text-sm text-slate-300 bg-slate-700/50 rounded-lg border border-slate-600">
                  React
                </span>
                <span className="px-3 py-2 text-sm text-slate-300 bg-slate-700/50 rounded-lg border border-slate-600">
                  Next.js
                </span>
                <span className="px-3 py-2 text-sm text-slate-300 bg-slate-700/50 rounded-lg border border-slate-600">
                  Tailwind
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <BackgroundBeams />
    </section>
  );
  
}
