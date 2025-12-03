"use client";

import React, { useState } from "react";
import { Code, Palette, Rocket, Users } from "lucide-react";

const AboutSection = React.memo(function AboutSection() {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Menulis kode yang bersih, maintainable, dan scalable dengan best practices terkini.",
    },
    {
      icon: Palette,
      title: "Creative Design",
      description:
        "Menggabungkan estetika modern dengan user experience yang intuitif dan engaging.",
    },
    {
      icon: Rocket,
      title: "Performance",
      description:
        "Optimasi performa aplikasi untuk loading time yang cepat dan smooth experience.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Bekerja sama dengan tim untuk menciptakan solusi digital yang impactful.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden"
    >
      {/* Background Elements - Softer */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                <span className="text-cyan-300 text-sm font-medium">
                  About Me
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Passionate Developer with{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
                  Creative Vision
                </span>
              </h2>

              <p className="text-lg text-white/70 leading-relaxed">
                Saya adalah seorang full-stack developer yang passionate dalam
                menciptakan pengalaman digital yang luar biasa. Dengan
                pengalaman 3+ tahun, saya telah membantu berbagai klien
                mewujudkan visi mereka menjadi aplikasi web yang powerful dan
                user-friendly.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                <div className="text-3xl font-bold text-cyan-300 mb-2">50+</div>
                <div className="text-white/60">Projects Completed</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                <div className="text-3xl font-bold text-indigo-300 mb-2">
                  25+
                </div>
                <div className="text-white/60">Happy Clients</div>
              </div>
            </div>

            {/* Skills Progress */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Core Skills</h3>
              <div className="space-y-3">
                {[
                  {
                    skill: "Frontend Development",
                    level: 95,
                    color: "from-cyan-500 to-teal-500",
                  },
                  {
                    skill: "Backend Development",
                    level: 88,
                    color: "from-indigo-500 to-cyan-500",
                  },
                  {
                    skill: "UI/UX Design",
                    level: 82,
                    color: "from-teal-500 to-cyan-500",
                  },
                  {
                    skill: "Mobile Development",
                    level: 75,
                    color: "from-indigo-600 to-blue-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">{item.skill}</span>
                      <span className="text-cyan-300">{item.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={index}
                    className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                      activeCard === index
                        ? "bg-slate-800/70 border-cyan-500/50 shadow-lg"
                        : "bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50"
                    }`}
                    onMouseEnter={() => setActiveCard(index)}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                        activeCard === index
                          ? "bg-gradient-to-r from-cyan-500/80 to-indigo-500/80"
                          : "bg-slate-700/50"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Decorative Elements - Softer */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border border-cyan-500/20 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
});
export default AboutSection;
