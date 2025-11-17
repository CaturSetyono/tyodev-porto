"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/project-card";
import type { Project } from "@/types/database";

interface ProcessedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
}

const ProjectsSection = React.memo(function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/portfolio/projects");
        if (response.ok) {
          const result = await response.json();
          // API returns { data: [...] } structure
          const projectsData = Array.isArray(result)
            ? result
            : result.data || [];

          // Convert API data to component format
          const processedProjects: ProcessedProject[] = (
            projectsData as Project[]
          ).map((project: Project) => ({
            id: project.id,
            title: project.title,
            description: project.description || "",
            image: "/api/placeholder/400/300", // Default placeholder image
            category: "web", // Default category since not in database
            featured: project.featured || false,
            tags: Array.isArray(project.technologies)
              ? project.technologies
              : [],
            technologies: Array.isArray(project.technologies)
              ? project.technologies
              : [],
            githubUrl: project.github_url || "",
            liveUrl: project.demo_url || "",
            year: project.created_at
              ? new Date(project.created_at).getFullYear().toString()
              : "2024",
          }));

          setProjects(processedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        // Fallback to empty array or default projects if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "featured", label: "Featured" },
    { key: "web", label: "Web App" },
    { key: "mobile", label: "Mobile" },
    { key: "api", label: "API/Backend" },
  ];

  const filteredProjects = useMemo(() => {
    if (isLoading) return [];

    return projects.filter((project) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "featured") return project.featured;
      return project.category === activeFilter;
    });
  }, [activeFilter, projects, isLoading]);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-slate-800/50 rounded-xl overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-slate-700" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-slate-700 rounded w-3/4" />
            <div className="h-4 bg-slate-700 rounded w-full" />
            <div className="h-4 bg-slate-700 rounded w-2/3" />
            <div className="flex gap-2">
              <div className="h-6 bg-slate-700 rounded w-16" />
              <div className="h-6 bg-slate-700 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

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
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={index} // Use index as number for ProjectCard component
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                featured={project.featured}
                liveUrl={project.liveUrl || ""}
                githubUrl={project.githubUrl || ""}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-white/60 text-lg mb-4">
              {activeFilter === "all"
                ? "Belum ada project yang tersedia"
                : `Belum ada project dengan kategori "${activeFilter}"`}
            </div>
            <Button
              onClick={() => setActiveFilter("all")}
              variant="outline"
              className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
            >
              Lihat Semua Project
            </Button>
          </div>
        )}

        {/* View All Projects Button */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 hover:from-cyan-700/80 hover:to-indigo-700/80 text-white border-0 group"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

export default ProjectsSection;
