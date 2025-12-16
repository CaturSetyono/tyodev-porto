"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GentleBackground } from "@/components/ui/gentle-background";
import gsap from "gsap";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cardRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    });

    // Parallax effect for inner content
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: x * 1.5,
        y: y * 1.5,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

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
            {/* Left Section - Content */}
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
                  <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0 shadow-md dark:shadow-none">
                    View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-transparent"
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
            <div
              ref={containerRef}
              className="bg-transparent p-8 md:p-12 flex flex-col justify-center items-center perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={cardRef}
                className="relative w-64 h-64 mx-auto"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Placeholder for profile image with modern design */}
                <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 rounded-2xl flex items-center justify-center border border-slate-600/30 backdrop-blur-sm shadow-2xl">
                  {/* Professional icon or initials */}
                  <div
                    ref={contentRef}
                    className="text-6xl font-bold text-cyan-400/80"
                  >
                    CS
                  </div>
                </div>
                {/* Subtle decorative elements */}
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400/50 rounded-full animate-pulse"
                  style={{ transform: "translateZ(20px)" }}
                />
                <div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-400/50 rounded-full animate-pulse"
                  style={{
                    animationDelay: "1s",
                    transform: "translateZ(20px)",
                  }}
                />

                {/* Floating elements for more 3D feel */}
                <div
                  className="absolute -z-10 -top-6 -right-6 w-12 h-12 bg-cyan-400/30 rounded-full blur-xl"
                  style={{ transform: "translateZ(-20px)" }}
                />
                <div
                  className="absolute -z-10 -bottom-6 -left-6 w-16 h-16 bg-indigo-400/30 rounded-full blur-xl"
                  style={{ transform: "translateZ(-20px)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GentleBackground />
    </section>
  );
}
