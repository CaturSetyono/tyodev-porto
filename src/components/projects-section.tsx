"use client";

import { useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
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
  ];

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "featured", label: "Featured" },
    { key: "fullstack", label: "Full Stack" },
    { key: "frontend", label: "Frontend" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return project.featured;
    return project.category === activeFilter;
  });

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-cyan-950 to-indigo-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/8 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Project Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Button
                    size="icon"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                  </Button>
                  <Button
                    size="icon"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
                  >
                    <Github className="h-4 w-4 text-white" />
                  </Button>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <Button className="w-full bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 hover:from-cyan-600 hover:to-indigo-600 text-white border border-cyan-500/30 hover:border-transparent transition-all duration-300 group/btn shadow-md hover:shadow-lg">
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white border-0 group shadow-lg shadow-cyan-900/20"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
