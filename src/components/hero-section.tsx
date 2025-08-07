"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-cyan-950 via-indigo-900 to-violet-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <div
          className="absolute w-64 h-64 bg-cyan-500/30 rounded-full blur-xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${
              mousePosition.y * 0.3
            }px)`,
            top: "10%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-2xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${
              mousePosition.y * -0.2
            }px)`,
            top: "50%",
            right: "10%",
          }}
        />
        <div
          className="absolute w-48 h-48 bg-teal-500/25 rounded-full blur-lg transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${
              mousePosition.y * 0.5
            }px)`,
            bottom: "20%",
            left: "30%",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Light Rays Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-1/2 h-[70vh] bg-gradient-to-b from-cyan-400/30 via-transparent to-transparent blur-3xl transform -rotate-12"></div>
          <div className="absolute top-0 right-1/3 w-1/3 h-[60vh] bg-gradient-to-b from-indigo-500/20 via-transparent to-transparent blur-3xl transform rotate-12"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-xl shadow-cyan-900/10">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 animate-pulse" />
              <span className="text-white/80 text-sm font-medium">
                Available for work
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <div className="relative">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  <span className="block">Creative</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
                    Developer
                  </span>
                </h1>
                {/* Decorative Line */}
                <div className="absolute -right-4 top-1/2 w-16 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full transform -translate-y-1/2 hidden lg:block" />
              </div>

              <p className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed">
                Saya menciptakan pengalaman digital yang memukau dengan
                menggabungkan{" "}
                <span className="text-cyan-300 font-semibold">
                  desain inovatif
                </span>{" "}
                dan{" "}
                <span className="text-teal-300 font-semibold">
                  teknologi terdepan
                </span>
                .
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-cyan-300">
                  50+
                </div>
                <div className="text-white/70 text-sm">Projects</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-indigo-300">
                  3+
                </div>
                <div className="text-white/70 text-sm">Years Exp</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-teal-300">
                  100%
                </div>
                <div className="text-white/70 text-sm">Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white border-0 group transition-all duration-300 shadow-lg shadow-cyan-900/30"
              >
                Lihat Portfolio
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent transition-all duration-300 shadow-lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-cyan-400/80 hover:text-cyan-300 hover:bg-white/10 transition-all duration-300 shadow-md"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-indigo-400/80 hover:text-indigo-300 hover:bg-white/10 transition-all duration-300 shadow-md"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-teal-400/80 hover:text-teal-300 hover:bg-white/10 transition-all duration-300 shadow-md"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex justify-center">
            {/* Main Profile Card */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-sm w-full shadow-2xl shadow-cyan-900/20 hover:shadow-indigo-900/30 transition-all duration-500">
              {/* Profile Image */}
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-2xl mb-6 relative overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=192&width=192"
                  alt="Profile"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/50 to-transparent" />
              </div>

              {/* Name and Title */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Your Name</h3>
                <p className="text-white/70">Full Stack Developer</p>
              </div>

              {/* Floating Tech Stack */}
              <div className="absolute -top-3 -left-3 bg-cyan-500/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-cyan-400/30 animate-bounce shadow-lg">
                <span className="text-white text-xs font-medium">React</span>
              </div>
              <div
                className="absolute -top-3 -right-3 bg-indigo-500/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-indigo-400/30 animate-bounce shadow-lg"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="text-white text-xs font-medium">Next.js</span>
              </div>
              <div
                className="absolute -bottom-3 -left-3 bg-teal-500/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-teal-400/30 animate-bounce shadow-lg"
                style={{ animationDelay: "1s" }}
              >
                <span className="text-white text-xs font-medium">
                  TypeScript
                </span>
              </div>
              <div
                className="absolute -bottom-3 -right-3 bg-blue-500/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-blue-400/30 animate-bounce shadow-lg"
                style={{ animationDelay: "1.5s" }}
              >
                <span className="text-white text-xs font-medium">Tailwind</span>
              </div>
            </div>

            {/* Decorative Circles */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-cyan-500/20 rounded-full -z-10 animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-indigo-500/15 rounded-full -z-10 animate-spin"
              style={{
                animationDuration: "30s",
                animationDirection: "reverse",
              }}
            />

            {/* Additional glowing orbs */}
            <div className="absolute top-[20%] right-[30%] w-4 h-4 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>
            <div
              className="absolute top-[60%] left-[25%] w-3 h-3 bg-indigo-400 rounded-full blur-sm animate-pulse"
              style={{ animationDelay: "0.7s" }}
            ></div>
            <div
              className="absolute bottom-[25%] right-[35%] w-5 h-5 bg-teal-400 rounded-full blur-sm animate-pulse"
              style={{ animationDelay: "1.3s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
