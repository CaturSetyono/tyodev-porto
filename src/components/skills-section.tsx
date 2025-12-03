"use client";

import React, { useState } from "react";

const SkillsSection = React.memo(function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const skillCategories = {
    frontend: {
      title: "Frontend",
      skills: [
        { name: "React", level: 95, color: "from-blue-400 to-blue-600" },
        { name: "Next.js", level: 92, color: "from-gray-400 to-gray-600" },
        { name: "TypeScript", level: 88, color: "from-blue-500 to-blue-700" },
        { name: "Tailwind CSS", level: 94, color: "from-cyan-400 to-cyan-600" },
        { name: "Vue.js", level: 78, color: "from-green-400 to-green-600" },
        {
          name: "Framer Motion",
          level: 85,
          color: "from-purple-400 to-purple-600",
        },
      ],
    },
    backend: {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 90, color: "from-green-500 to-green-700" },
        { name: "Python", level: 85, color: "from-yellow-400 to-yellow-600" },
        { name: "PostgreSQL", level: 88, color: "from-blue-600 to-blue-800" },
        { name: "MongoDB", level: 82, color: "from-green-600 to-green-800" },
        { name: "Express.js", level: 87, color: "from-gray-500 to-gray-700" },
        { name: "GraphQL", level: 75, color: "from-pink-400 to-pink-600" },
      ],
    },
    tools: {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 93, color: "from-orange-400 to-orange-600" },
        { name: "Docker", level: 80, color: "from-blue-500 to-blue-700" },
        { name: "AWS", level: 75, color: "from-yellow-500 to-orange-500" },
        { name: "Figma", level: 88, color: "from-purple-500 to-pink-500" },
        { name: "Vercel", level: 90, color: "from-gray-600 to-gray-800" },
        { name: "Firebase", level: 85, color: "from-yellow-400 to-red-500" },
      ],
    },
  };

  return (
    <section
      id="skills"
      className="py-20 bg-slate-800 relative overflow-hidden"
    >
      {/* Background Pattern - Softer */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:50px_50px]" />
      </div>

      {/* Background Blobs - Consistent with other sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30 mb-6">
            <span className="text-cyan-300 text-sm font-medium">My Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technologies I{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
              Master
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Berikut adalah teknologi dan tools yang saya kuasai untuk membangun
            aplikasi modern
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-2 border border-slate-600/30">
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 text-white"
                    : "text-white/70 hover:text-white hover:bg-slate-600/50"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories[
            activeCategory as keyof typeof skillCategories
          ].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {skill.name}
                </h3>
                <span className="text-white/60 text-sm">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-slate-600/50 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{
                    width: `${skill.level}%`,
                  }}
                />
              </div>

              {/* Skill Level Indicator */}
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Tertarik untuk berkolaborasi?
            </h3>
            <p className="text-white/70 mb-6">
              Mari diskusikan project Anda dan bagaimana saya bisa membantu
              mewujudkannya
            </p>
            <button className="bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 hover:from-cyan-700/80 hover:to-indigo-700/80 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
              Make it Happen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
export default SkillsSection;
