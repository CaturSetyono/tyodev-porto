"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { GentleBackground } from "@/components/ui/gentle-background";
import Image from "next/image";

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
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/30 overflow-hidden backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Section - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    Hi, I&apos;m{" "}
                    <span className="text-cyan-400">Catur Setyono</span>
                  </h1>
                  <p className="text-lg text-slate-300 font-medium">
                    Web Developer | Frontend Specialist
                  </p>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  I build fast, responsive, and visually engaging websites using{" "}
                  <span className="text-cyan-400">modern technologies</span> and{" "}
                  <span className="text-cyan-400">good code</span> to deliver
                  high-quality user experiences.
                </p>
                <div className="flex gap-3 pt-2">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Section - Profile Image */}
            <div className="bg-transparent p-8 md:p-12 flex flex-col justify-center items-center">
              <div className="relative w-64 h-64 mx-auto">
                {/* Placeholder for profile image with modern design */}
                <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 rounded-2xl flex items-center justify-center border border-slate-600/30 backdrop-blur-sm">
                  {/* Professional icon or initials */}
                  <div className="text-6xl font-bold text-cyan-400/80">CS</div>
                </div>
                {/* Subtle decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400/50 rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-400/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GentleBackground />
    </section>
  );
}
