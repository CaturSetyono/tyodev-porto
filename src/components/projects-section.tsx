"use client";

import React, { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/project-card";

const ProjectsSection = React.memo(function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "E-Commerce Platform",
        description:
          "Platform e-commerce modern dengan fitur lengkap, payment gateway, dan admin dashboard yang powerful.",
        image: "/placeholder.svg?height=300&width=400",
        category: "fullstack",
        technologies: ["Next.js", "TypeScript", "Prisma", "Stripe"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
      },
      {
        id: 2,
        title: "Task Management App",
        description:
          "Aplikasi manajemen tugas dengan real-time collaboration, drag & drop, dan notifikasi push.",
        image: "/placeholder.svg?height=300&width=400",
        category: "frontend",
        technologies: ["React", "Socket.io", "Framer Motion", "Tailwind"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        id: 3,
        title: "AI Content Generator",
        description:
          "Platform AI untuk generate konten marketing dengan berbagai template dan customization options.",
        image: "/placeholder.svg?height=300&width=400",
        category: "fullstack",
        technologies: ["Next.js", "OpenAI API", "PostgreSQL", "Stripe"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
      },
      {
        id: 4,
        title: "Portfolio Website",
        description:
          "Website portfolio interaktif dengan animasi smooth dan design yang unik untuk personal branding.",
        image: "/placeholder.svg?height=300&width=400",
        category: "frontend",
        technologies: ["Next.js", "Framer Motion", "Tailwind", "GSAP"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        id: 5,
        title: "Restaurant POS System",
        description:
          "Sistem Point of Sale untuk restoran dengan inventory management dan reporting analytics.",
        image: "/placeholder.svg?height=300&width=400",
        category: "fullstack",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        id: 6,
        title: "Social Media Dashboard",
        description:
          "Dashboard analytics untuk social media dengan data visualization dan automated reporting.",
        image: "/placeholder.svg?height=300&width=400",
        category: "frontend",
        technologies: ["Vue.js", "Chart.js", "Tailwind", "API Integration"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
    ],
    []
  );

  const filters = useMemo(
    () => [
      { key: "all", label: "All Projects" },
      { key: "featured", label: "Featured" },
      { key: "fullstack", label: "Full Stack" },
      { key: "frontend", label: "Frontend" },
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "featured") return project.featured;
      return project.category === activeFilter;
    });
  }, [activeFilter, projects]);

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30 mb-6">
            <span className="text-cyan-300 text-sm font-medium">My Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Berikut adalah beberapa project terbaik yang telah saya kerjakan
            dengan passion dan dedikasi tinggi
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 text-white"
                  : "bg-slate-700/30 text-white/70 hover:text-white hover:bg-slate-700/50 border border-slate-600/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 hover:from-cyan-700/80 hover:to-indigo-700/80 text-white border-0 group"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
});
export default ProjectsSection;
