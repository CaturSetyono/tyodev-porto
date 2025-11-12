"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GentleBackground } from "@/components/ui/gentle-background";
import { useHeroAnimations } from "@/hooks/useHeroAnimations";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  const {
    containerRef,
    titleRef,
    subtitleRef,
    descriptionRef,
    buttonsRef,
    socialRef,
    imageRef,
    decorativeRefs,
  } = useHeroAnimations(mounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isHovering: boolean
  ) => {
    const button = e.currentTarget;
    if (isHovering) {
      button.style.transform = "translateY(-2px)";
    } else {
      button.style.transform = "translateY(0)";
    }
  };

  const handleIconHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isHovering: boolean
  ) => {
    const icon = e.currentTarget;
    if (isHovering) {
      icon.style.transform = "scale(1.1) rotate(5deg)";
    } else {
      icon.style.transform = "scale(1) rotate(0deg)";
    }
  };

  if (!mounted) return <div className="min-h-screen bg-slate-900" />;

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
      ref={containerRef}
    >
      <div className="container mx-auto px-6 py-16 max-w-6xl md:pt-42">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/30 overflow-hidden backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Section - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1
                    ref={titleRef}
                    className="text-3xl md:text-4xl font-bold text-white leading-tight"
                  >
                    Hi, I&apos;m{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
                      Catur Setyono
                    </span>
                  </h1>
                  <p
                    ref={subtitleRef}
                    className="text-lg text-slate-300 font-medium"
                  >
                    Web Developer | Frontend Specialist
                  </p>
                </div>
                <p
                  ref={descriptionRef}
                  className="text-slate-300 leading-relaxed"
                >
                  I build fast, responsive, and visually engaging websites using{" "}
                  <span className="text-cyan-400">modern technologies</span> and{" "}
                  <span className="text-cyan-400">good code</span> to deliver
                  high-quality user experiences.
                </p>
                <div ref={buttonsRef} className="flex gap-3 pt-2">
                  <Button
                    className="bg-cyan-500 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/25 text-white transition-colors duration-300 group"
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false)}
                  >
                    View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:border-cyan-400 hover:text-cyan-300 hover:shadow-lg hover:shadow-slate-700/50 transition-colors duration-300 group"
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false)}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </div>
                <div ref={socialRef} className="flex gap-3 pt-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20 transition-colors duration-300 group"
                    onMouseEnter={(e) => handleIconHover(e, true)}
                    onMouseLeave={(e) => handleIconHover(e, false)}
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20 transition-colors duration-300 group"
                    onMouseEnter={(e) => handleIconHover(e, true)}
                    onMouseLeave={(e) => handleIconHover(e, false)}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20 transition-colors duration-300 group"
                    onMouseEnter={(e) => handleIconHover(e, true)}
                    onMouseLeave={(e) => handleIconHover(e, false)}
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Section - Profile Image */}
            <div className="bg-transparent p-8 md:p-12 flex flex-col justify-center items-center">
              <div
                ref={imageRef}
                className="relative w-64 h-64 mx-auto cursor-pointer"
              >
                {/* Profile Image with hover effects */}
                <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-600/30 backdrop-blur-sm relative">
                  <Image
                    src="/img-profil.jpg"
                    alt="Catur Setyono - Web Developer"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-indigo-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Animated decorative elements */}
                <div
                  ref={(el) => {
                    if (el && decorativeRefs.current) decorativeRefs.current[0] = el;
                  }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400/50 rounded-full animate-pulse"
                />
                <div
                  ref={(el) => {
                    if (el && decorativeRefs.current) decorativeRefs.current[1] = el;
                  }}
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-400/50 rounded-full animate-pulse"
                />

                {/* Additional floating elements */}
                <div
                  ref={(el) => {
                    if (el && decorativeRefs.current) decorativeRefs.current[2] = el;
                  }}
                  className="absolute top-1/4 -left-4 w-2 h-2 bg-cyan-300/40 rounded-full"
                />
                <div
                  ref={(el) => {
                    if (el && decorativeRefs.current) decorativeRefs.current[3] = el;
                  }}
                  className="absolute bottom-1/4 -right-4 w-2 h-2 bg-indigo-300/40 rounded-full"
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