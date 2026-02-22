"use client";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram , Twitter } from "lucide-react";
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
      <div className="relative z-10 container mx-auto px-6 py-12 md:py-24 max-w-6xl">
        <div className="bg-white/60 dark:bg-slate-900/40 rounded-3xl border border-white/50 dark:border-slate-700/50 backdrop-blur-xl shadow-2xl dark:shadow-slate-900/50">
          <div className="grid md:grid-cols-2 gap-0 md:gap-8">

            {/* --- LEFT SECTION (TEXT) --- */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                    Hi, I&apos;m{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400">
                      Catur Setyono
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium tracking-wide">
                    Web Developer | Frontend Specialist
                  </p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg max-w-lg">
                  I build fast, responsive, and visually engaging websites using{" "}
                  <span className="font-semibold text-cyan-700 dark:text-cyan-400">
                    modern technologies
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-cyan-700 dark:text-cyan-400">
                    best practices
                  </span>{" "}
                  to deliver high-quality user experiences.
                </p>

               

                <div className="flex items-center gap-4 pt-6 text-slate-400">
                  <span className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">Connect</span>
                  <div className="h-px w-8 bg-slate-300 dark:bg-slate-700"></div>
                  <div className="flex gap-2">
                    <a href="https://github.com/CaturSetyono" target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="rounded-full hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Github className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href="https://www.linkedin.com/in/catursetyono/" target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="rounded-full hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="rounded-full hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <Instagram className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="rounded-full hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT SECTION (3D ANIMATION) --- */}
            <div className="relative bg-transparent min-h-[500px] flex items-center justify-center overflow-hidden">

              {/* 1. Komponen 3D Kita */}
              <ThreeScene />

              {/* 2. Background Glow Effects (Pemanis di belakang bola) */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
                <div className="w-80 h-80 bg-cyan-400/30 rounded-full blur-[100px] absolute -translate-x-12 -translate-y-12 opacity-50 mix-blend-screen" />
                <div className="w-80 h-80 bg-indigo-500/30 rounded-full blur-[100px] absolute translate-x-12 translate-y-12 opacity-50 mix-blend-screen" />
              </div>

            </div>
          </div>
        </div>
      </div>
      <GentleBackground />
    </section>
  );
}