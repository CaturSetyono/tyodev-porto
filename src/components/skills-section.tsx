"use client";

import React, { useState, useEffect } from "react";

import type { Skill } from "@/types/database";

const SkillsSection = React.memo(function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/portfolio/skills");
        if (response.ok) {
          const result = await response.json();
          // API returns { data: [...] } structure
          const skillsData = Array.isArray(result) ? result : result.data || [];
          setSkills(Array.isArray(skillsData) ? skillsData : []);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const skillsByCategory = skills
    .filter((skill) => skill.is_active)
    .reduce((acc, skill) => {
      const category = skill.category || "tools";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);

  // Fallback data if API fails
  const fallbackSkills: Record<
    string,
    Array<{ name: string; level: number; color: string }>
  > = {
    frontend: [
      { name: "React", level: 95, color: "from-blue-400 to-blue-600" },
      { name: "Next.js", level: 92, color: "from-gray-400 to-gray-600" },
      { name: "TypeScript", level: 88, color: "from-blue-500 to-blue-700" },
      { name: "Tailwind CSS", level: 94, color: "from-cyan-400 to-cyan-600" },
    ],
    backend: [
      { name: "Node.js", level: 90, color: "from-green-400 to-green-600" },
      { name: "Python", level: 85, color: "from-yellow-400 to-yellow-600" },
      { name: "PostgreSQL", level: 88, color: "from-blue-500 to-blue-700" },
    ],
  };

  const getSkillColor = (index: number): string => {
    const colors = [
      "from-cyan-400 to-cyan-600",
      "from-indigo-400 to-indigo-600",
      "from-blue-400 to-blue-600",
      "from-purple-400 to-purple-600",
      "from-green-400 to-green-600",
      "from-yellow-400 to-yellow-600",
    ];
    return colors[index % colors.length] || "from-gray-400 to-gray-600";
  };

  // Get skills for current active category
  const getCurrentSkills = (): Array<{
    name: string;
    level: number;
    color: string;
  }> => {
    if (isLoading) return [];

    const apiSkills = skillsByCategory[activeCategory] || [];
    if (apiSkills.length > 0) {
      return apiSkills.map((skill, index) => ({
        name: skill.name,
        level: skill.level ? skill.level * 20 : 80, // Convert 1-5 scale to percentage
        color: getSkillColor(index),
      }));
    }

    // Fallback to hardcoded data
    return fallbackSkills[activeCategory] || [];
  };

  // Available categories from API or fallback
  const availableCategories = isLoading
    ? ["frontend", "backend", "database", "tools"]
    : Object.keys(skillsByCategory).length > 0
    ? Object.keys(skillsByCategory)
    : ["frontend", "backend"];

  const categoryDisplayNames: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools & Others",
    mobile: "Mobile",
    devops: "DevOps",
  };

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30 mb-6">
            <span className="text-cyan-300 text-sm font-medium">
              Technical Skills
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Teknologi dan tools yang saya kuasai untuk mengembangkan aplikasi
            web modern, dari frontend hingga backend, database, dan deployment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg scale-105"
                    : "bg-slate-800/50 hover:bg-slate-700/50 text-white/70 hover:text-white border border-slate-700/30"
                }`}
              >
                {categoryDisplayNames[category] ||
                  category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading
              ? // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between">
                      <div className="h-4 bg-slate-700 rounded w-24 animate-pulse" />
                      <div className="h-4 bg-slate-700 rounded w-12 animate-pulse" />
                    </div>
                    <div className="h-3 bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-slate-600 rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                ))
              : getCurrentSkills().map((skill, index) => (
                  <div key={skill.name} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">
                        {skill.name}
                      </h3>
                      <span className="text-cyan-300 font-medium">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-2">
                {skills.length}+
              </div>
              <div className="text-white/60 text-sm">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-300 mb-2">5+</div>
              <div className="text-white/60 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-300 mb-2">50+</div>
              <div className="text-white/60 text-sm">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">
                24/7
              </div>
              <div className="text-white/60 text-sm">Learning Mode</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SkillsSection;
