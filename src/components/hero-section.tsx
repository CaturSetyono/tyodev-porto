"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { GentleBackground } from "@/components/ui/gentle-background";
// IMPORT KOMPONEN 3D YANG BARU
import ThreeScene from "@/components/ThreeScene";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-900" />;

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900"
    >
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-6xl md:pt-32">
        <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/30 overflow-hidden backdrop-blur-sm shadow-lg dark:shadow-none">
          <div className="grid md:grid-cols-2 gap-0">

            {/* --- LEFT SECTION (TEXT) --- */}
            {/* Bagian ini tidak saya ubah, sama persis seperti kodemu */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                    Hi, I&apos;m{" "}
                    <span className="text-cyan-600 dark:text-cyan-400">
                      Catur Setyono
                    </span>
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                    Web Developer | Frontend Specialist
                  </p>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  I build fast, responsive, and visually engaging websites using{" "}
                  <span className="text-cyan-600 dark:text-cyan-400">
                    modern technologies
                  </span>{" "}
                  and{" "}
                  <span className="text-cyan-600 dark:text-cyan-400">
                    good code
                  </span>{" "}
                  to deliver high-quality user experiences.
                </p>
                <div className="flex gap-3 pt-2">
                  <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:cursor-pointer hover:to-indigo-600 text-white border-0 shadow-md dark:shadow-none">
                    <a href="#projects" className="flex items-center">
                      View Portfolio <ArrowRight className="ml-2 h-4 w-4 " />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 bg-transparent"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </div>
                <div className="flex gap-3 pt-4">
                  <a href="https://github.com/CaturSetyono" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-cyan-400">
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-cyan-400">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href="mailto:caturetyono542@gmail.com">
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-cyan-400">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* --- RIGHT SECTION (3D ANIMATION) --- */}
            <div className="relative bg-transparent min-h-[400px] flex items-center justify-center overflow-hidden">

              {/* 1. Komponen 3D Kita */}
              <ThreeScene />

              {/* 2. Background Glow Effects (Pemanis di belakang bola) */}
              {/* Kita gunakan absolute agar dia diam di belakang Canvas */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
                <div className="w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl absolute -translate-x-10 -translate-y-10" />
                <div className="w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl absolute translate-x-10 translate-y-10" />
              </div>

            </div>
          </div>
        </div>
      </div>
      <GentleBackground />
    </section>
  );
}