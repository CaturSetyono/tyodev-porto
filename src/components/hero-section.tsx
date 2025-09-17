"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

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
      <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-8 items-center min-h-screen md:p-20 md:pt-32">
        
        {/* Left Content */}
        <div className="space-y-6 ">
          <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">
            Hi, I’m{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text">
              Catur Setyono
            </span>
          </h1>
          <h2 className="text-2xl font-medium text-white/80">
            Web Developer | Frontend Specialist
          </h2>

          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            I build fast, responsive, and visually engaging websites using{" "}
            <span className="text-cyan-300 font-semibold">modern
            technologies</span> and <span className="text-teal-300 font-semibold">clean code</span> to deliver high-quality user experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-2">
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg">
              View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 pt-6">
            <Button size="icon" variant="ghost" className="text-white/70 hover:text-cyan-400">
              <Github className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-white/70 hover:text-cyan-400">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-white/70 hover:text-cyan-400">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right Content - Professional Profile */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg hover:shadow-cyan-900/30 transition-all duration-500">
            
            {/* Profile Image */}
            <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-lg mx-auto">
              <img
                src="/profile-catur.jpg"
                alt="Catur Setyono"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name & Title */}
            <div className="text-center mt-6">
              <h3 className="text-2xl font-semibold text-white">Catur Setyono</h3>
              <p className="text-cyan-300 text-sm">Web Developer</p>
            </div>

            {/* Tech Stack */}
            <div className="flex gap-2 justify-center mt-4">
              <span className="px-3 py-1 text-xs text-white bg-cyan-500/10 border border-cyan-400/20 rounded-full">
                React
              </span>
              <span className="px-3 py-1 text-xs text-white bg-indigo-500/10 border border-indigo-400/20 rounded-full">
                Next.js
              </span>
              <span className="px-3 py-1 text-xs text-white bg-teal-500/10 border border-teal-400/20 rounded-full">
                Tailwind
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
