"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { GentleBackground } from "@/components/ui/gentle-background";
import { useHeroAnimations } from "@/hooks/useHeroAnimations";
import type { HeroSection as HeroSectionType } from "@/types/database";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [heroData, setHeroData] = useState<HeroSectionType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    // Fetch hero section data from API
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/portfolio/hero");
        if (response.ok) {
          const result = await response.json();
          setHeroData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
        // Set fallback data if API fails
        setHeroData({
          id: "fallback",
          greeting: "Hi, I'm",
          name: "Catur Setyono",
          title: "Web Developer | Frontend Specialist",
          description:
            "I build fast, responsive, and visually engaging websites using modern technologies and good code to deliver high-quality user experiences.",
          cta_text: "View Portfolio",
          cta_url: "#projects",
          updated_at: new Date().toISOString(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isHovering: boolean
  ) => {
    const button = e.currentTarget;
    button.style.transition = "transform 0.2s ease";
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
    icon.style.transition = "transform 0.2s ease";
    if (isHovering) {
      icon.style.transform = "scale(1.1) rotate(5deg)";
    } else {
      icon.style.transform = "scale(1) rotate(0deg)";
    }
  };

  // Handle CV download
  const handleDownloadCV = async () => {
    try {
      // Use CV URL from hero data (mapped to cta_url field)
      const cvUrl = heroData?.cta_url;
      if (cvUrl) {
        // Validate URL to prevent XSS
        try {
          const url = new URL(cvUrl);
          // Only allow http/https protocols
          if (url.protocol === "http:" || url.protocol === "https:") {
            window.open(cvUrl, "_blank");
            return;
          }
        } catch (error) {
          console.error("Invalid CV URL:", error);
          toast.error("Invalid CV URL format");
          return;
        }
      }

      // Fallback: show message if no CV uploaded
      toast.error(
        "CV belum tersedia. Silakan hubungi admin untuk mengunggah CV."
      );
    } catch (error) {
      console.error("Failed to download CV:", error);
      toast.error("Gagal mengunduh CV");
    }
  };

  // Handle social media clicks
  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      github: "https://github.com/CaturSetyono",
      linkedin: "https://linkedin.com/in/catursetyono",
      email: "mailto:catur@example.com",
    };

    const url = socialLinks[platform as keyof typeof socialLinks];
    if (url) {
      if (url.startsWith("mailto:")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }
  };

  if (!mounted) return <div className="min-h-screen bg-slate-900" />;

  // Show loading state
  if (isLoading) {
    return (
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
      >
        <div className="container mx-auto px-6 py-16 max-w-6xl md:pt-42 relative z-10">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/30 overflow-hidden backdrop-blur-sm relative z-10">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-6 animate-pulse">
                  <div className="space-y-3">
                    <div className="h-12 bg-slate-700/50 rounded-lg w-3/4" />
                    <div className="h-6 bg-slate-700/50 rounded-lg w-1/2" />
                  </div>
                  <div className="h-20 bg-slate-700/50 rounded-lg" />
                  <div className="flex gap-3">
                    <div className="h-10 bg-slate-700/50 rounded-lg w-32" />
                    <div className="h-10 bg-slate-700/50 rounded-lg w-32" />
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center items-center">
                <div className="w-64 h-64 bg-slate-700/50 rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <GentleBackground />
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
      ref={containerRef}
    >
      <div className="container mx-auto px-6 py-16 max-w-6xl md:pt-42 relative z-10">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/30 overflow-hidden backdrop-blur-sm relative z-10">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Section - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1
                    ref={titleRef}
                    className="text-3xl md:text-4xl font-bold text-white leading-tight"
                  >
                    {heroData?.greeting || "Hi, I'm"}{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
                      {heroData?.name || "Catur Setyono"}
                    </span>
                  </h1>
                  <p
                    ref={subtitleRef}
                    className="text-lg text-slate-300 font-medium"
                  >
                    {heroData?.subtitle ||
                      heroData?.title ||
                      "Web Developer | Frontend Specialist"}
                  </p>
                </div>
                <p
                  ref={descriptionRef}
                  className="text-slate-300 leading-relaxed"
                >
                  {heroData?.description ||
                    "I build fast, responsive, and visually engaging websites using modern technologies and good code to deliver high-quality user experiences."}
                </p>
                <div ref={buttonsRef} className="flex gap-3 pt-2 relative z-20">
                  <Button
                    className="bg-cyan-500 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/25 text-white transition-all duration-300 group relative z-30 cursor-pointer"
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false)}
                    onClick={() => {
                      const projectsSection =
                        document.getElementById("projects");
                      if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    View My Work{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:border-cyan-400 hover:text-cyan-300 hover:shadow-lg hover:shadow-slate-700/50 transition-all duration-300 group relative z-30 cursor-pointer"
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false)}
                    onClick={handleDownloadCV}
                  >
                    <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />{" "}
                    Download CV
                  </Button>
                </div>
                <div ref={socialRef} className="flex gap-3 pt-4 relative z-20">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 group relative z-30 cursor-pointer"
                    onMouseEnter={(e) => handleIconHover(e, true)}
                    onMouseLeave={(e) => handleIconHover(e, false)}
                    onClick={() => handleSocialClick("github")}
                    aria-label="Visit GitHub profile"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 group relative z-30 cursor-pointer"
                    onMouseEnter={(e) => handleIconHover(e, true)}
                    onMouseLeave={(e) => handleIconHover(e, false)}
                    onClick={() => handleSocialClick("linkedin")}
                    aria-label="Visit LinkedIn profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 group relative z-30 cursor-pointer"
                    onMouseEnter={(e) => handleIconHover(e, true)}
                    onMouseLeave={(e) => handleIconHover(e, false)}
                    onClick={() => handleSocialClick("email")}
                    aria-label="Send email"
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
                className="relative w-64 h-64 mx-auto cursor-pointer z-20"
              >
                {/* Profile Image with hover effects */}
                <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-600/30 backdrop-blur-sm relative">
                  <Image
                    src={heroData?.profile_image_url || "/img-profil.jpg"}
                    alt={`${heroData?.name || "Catur Setyono"} - Web Developer`}
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
                    if (el && decorativeRefs.current)
                      decorativeRefs.current[0] = el;
                  }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400/50 rounded-full animate-pulse"
                />
                <div
                  ref={(el) => {
                    if (el && decorativeRefs.current)
                      decorativeRefs.current[1] = el;
                  }}
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-400/50 rounded-full animate-pulse"
                />

                {/* Additional floating elements */}
                <div
                  ref={(el) => {
                    if (el && decorativeRefs.current)
                      decorativeRefs.current[2] = el;
                  }}
                  className="absolute top-1/4 -left-4 w-2 h-2 bg-cyan-300/40 rounded-full"
                />
                <div
                  ref={(el) => {
                    if (el && decorativeRefs.current)
                      decorativeRefs.current[3] = el;
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
