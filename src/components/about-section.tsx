"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = React.memo(function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: 50, label: "Projects Crafted" },
    { value: 10, label: "Happy Clients" },
  ];

  const features = [
    { title: "Build Fastest", desc: "Kecepatan eksekusi tingkat tinggi tanpa kompromi pada kualitas." },
    { title: "Creative Design", desc: "Estetika visual modern yang bersih dan UX yang sangat natural." },
    { title: "Performance", desc: "Performa animasi web tingkat tinggi dengan frame rate maksimal." },
  ];

  // Custom hook for counting numbers safely in React to avoid hydration/DOM mismatch errors
  const [counts, setCounts] = React.useState([0, 0]);
  const hasCounted = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Master TImeline for Scrollytelling
      // We pin the entire section. The user scrolls, but the screen stays fixed while elements animate in.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%", // User has to scroll 2.5x the screen height to complete the animation
          pin: true,
          scrub: 1, // Smooth scrubbing taking 1 second to catch up to the scrollbar
        }
      });

      // 1. Initially, everything is hidden via CSS (opacity-0, translate-y-24)
      // First, reveal the "Passionate Developer" text slowly from the void
      tl.to(".title-part-1", {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out"
      })
        // 2. Reveal "with Creative Vision" 
        .to(".title-part-2", {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power2.out"
        }, "-=1") // Overlap by 1 second

        // 3. Add a slight pause (empty scrolling) to let the user admire the text
        .to({}, { duration: 1 })

        // 4. Move the entire header block UP to make room for the content below
        .to(".header-block", {
          y: -50,
          scale: 0.95,
          opacity: 0.8,
          duration: 2,
          ease: "power2.inOut"
        })

        // 5. Simultaneously draw the divider line
        .to(".draw-line", {
          scaleX: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.inOut"
        }, "<") // "<" means start at the same time as the previous animation

        // 6. Fade up the main content grid (Description & Features)
        .to(".content-grid", {
          y: 0,
          opacity: 1,
          duration: 3,
          ease: "power2.out"
        }, "-=1")

      // 7. Trigger React State Counter on Scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top -50%",
        onEnter: () => {
          if (!hasCounted.current) {
            hasCounted.current = true;

            // Animate both counters
            stats.forEach((stat, index) => {
              let startTimestamp: number | null = null;
              const duration = 2000; // 2 seconds

              const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // easeOutQuart
                const easeProgress = 1 - Math.pow(1 - progress, 4);

                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.floor(easeProgress * stat.value);
                  return newCounts;
                });

                if (progress < 1) {
                  window.requestAnimationFrame(step);
                }
              };

              window.requestAnimationFrame(step);
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-slate-50 dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10 w-full">

        {/* Header Block */}
        <div className="header-block mb-12 md:mb-20 origin-center">
          <div className="overflow-hidden pb-2">
            <h2 className="title-part-1 opacity-0 translate-y-24 text-5xl md:text-7xl font-light text-slate-800 dark:text-slate-100 tracking-tight">
              Passionate Developer
            </h2>
          </div>
          <div className="overflow-hidden pb-4">
            <h2 className="title-part-2 opacity-0 translate-y-24 text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
              with <span className="text-cyan-600 dark:text-cyan-400">Creative Vision.</span>
            </h2>
          </div>
        </div>

        {/* Clean Divider Line */}
        <div className="draw-line w-full h-px bg-slate-200 dark:bg-slate-800 mb-12 md:mb-20 scale-x-0 opacity-0 origin-left" />

        {/* Content Grid */}
        <div className="content-grid opacity-0 translate-y-32 grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">

          {/* Left Column: Description & Stats */}
          <div className="lg:col-span-7 space-y-12">
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              Saya adalah seorang <strong className="font-semibold text-slate-900 dark:text-white">full-stack developer</strong> yang mendedikasikan waktu untuk menciptakan pengalaman digital yang bersih dan luar biasa. Saya fokus pada arsitektur modern untuk menghasilkan aplikasi web yang cepat, responsif, dan elegan.
            </p>

            <div className="flex flex-wrap gap-12 pt-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className="text-5xl font-bold text-slate-900 dark:text-white tracking-tighter"
                    >
                      {counts[idx]}
                    </span>
                    <span className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">+</span>
                  </div>
                  <p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Feature List */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-10 mt-8 lg:mt-0">
            {features.map((item, idx) => (
              <div key={idx} className="group">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {item.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed pl-4 border-l border-slate-200 dark:border-slate-800 group-hover:border-cyan-200 dark:group-hover:border-cyan-800 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
});

export default AboutSection;
