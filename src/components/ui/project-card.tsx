import React from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
  index: number;
}

const ProjectCard = React.memo(function ProjectCard({
  title,
  description,
  image,
  technologies,
  featured,
  index,
}: ProjectCardProps) {
  return (
    <div
      className="group bg-slate-700/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={192}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyayK5XV2JjBJHzE3pJ8cCGJPWfH0DHAG7J8hdYONy7/wDMF/VLNhY+RKJw/UdGgPt8MvBp8IXcA3TFEwDqKB4+HLhOJV+Zb/fP2Fn3+gQAe1jfALR7KMbpTf2KPQMI2wd5+HVGdNLQpyN7AO/V"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Project Links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button
            size="icon"
            className="bg-slate-800/70 backdrop-blur-sm hover:bg-slate-700/70 border-0"
          >
            <ExternalLink className="h-4 w-4 text-white" />
          </Button>
          <Button
            size="icon"
            className="bg-slate-800/70 backdrop-blur-sm hover:bg-slate-700/70 border-0"
          >
            <Github className="h-4 w-4 text-white" />
          </Button>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-slate-600/50 text-white/80 text-xs rounded-full border border-slate-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Project Button */}
        <Button className="w-full bg-gradient-to-r from-cyan-600/30 to-indigo-600/30 hover:from-cyan-600/80 hover:to-indigo-600/80 text-white border border-cyan-500/30 hover:border-transparent transition-all duration-300 group/btn">
          View Project
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
});

export default ProjectCard;
