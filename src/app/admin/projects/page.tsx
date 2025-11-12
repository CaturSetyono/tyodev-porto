"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  StarIcon,
  EyeIcon,
  CodeBracketIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import type { Project, ProjectForm } from "@/types/database";

const initialFormData: ProjectForm = {
  title: "",
  description: "",
  image_url: "",
  demo_url: "",
  github_url: "",
  technologies: [],
  featured: false,
  status: "active",
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectForm>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/portfolio/projects");
      const data = await response.json();

      if (response.ok) {
        setProjects(data);
      } else {
        console.error("Failed to fetch projects:", data.error);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setEditingProject(null);
    setShowForm(false);
    setIsSubmitting(false);
  }, []);

  const handleEdit = useCallback((project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || "",
      image_url: project.image_url || "",
      demo_url: project.demo_url || "",
      github_url: project.github_url || "",
      technologies: project.technologies || [],
      featured: project.featured,
      status: project.status,
    });
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("Are you sure you want to delete this project?")) return;

      try {
        const response = await fetch(`/api/portfolio/projects/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchProjects();
        } else {
          const error = await response.json();
          alert("Failed to delete project: " + error.error);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    },
    [fetchProjects]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const method = editingProject ? "PUT" : "POST";
        const url = editingProject
          ? `/api/portfolio/projects/${editingProject.id}`
          : "/api/portfolio/projects";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await fetchProjects();
          resetForm();
        } else {
          const error = await response.json();
          alert("Failed to save project: " + error.error);
        }
      } catch (error) {
        console.error("Error saving project:", error);
        alert("Failed to save project");
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingProject, formData, fetchProjects, resetForm]
  );

  const handleTechnologyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const techs = e.target.value
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);
      setFormData((prev) => ({ ...prev, technologies: techs }));
    },
    []
  );

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured),
    [projects]
  );
  const regularProjects = useMemo(
    () => projects.filter((p) => !p.featured),
    [projects]
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/admin");
          return;
        }
        await fetchProjects();
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router, fetchProjects]);

  if (isLoading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </AdminSidebar>
    );
  }

  return (
    <AdminSidebar>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your portfolio projects and showcase your work
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <FolderIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Projects
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {projects.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <StarIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Featured
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {featuredProjects.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-50 dark:bg-green-900 rounded-lg">
                <EyeIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {projects.filter((p) => p.status === "active").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <StarIconSolid className="h-5 w-5 text-yellow-500" />
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              All Projects ({regularProjects.length})
            </h2>
            {regularProjects.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
                <FolderIcon className="h-12 w-12 text-gray-600 dark:text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No projects yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating your first project to showcase your work.
                </p>
                <Button onClick={() => setShowForm(true)}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-input rounded-md bg-background text-foreground h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      image_url: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        demo_url: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        github_url: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies.join(", ")}
                  onChange={handleTechnologyChange}
                  placeholder="React, TypeScript, Node.js"
                  className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as
                          | "active"
                          | "draft"
                          | "archived",
                      }))
                    }
                    className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          featured: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-foreground">
                      Featured Project
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingProject
                    ? "Update Project"
                    : "Create Project"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminSidebar>
  );
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      {/* Project Image */}
      {project.image_url && (
        <div className="w-full h-32 bg-muted rounded-lg mb-4 overflow-hidden">
          <Image
            src={project.image_url}
            alt={project.title}
            width={300}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Project Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground line-clamp-1">
            {project.title}
          </h3>
          {project.featured && (
            <StarIconSolid className="h-4 w-4 text-yellow-500 flex-shrink-0 ml-2" />
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="mb-4">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            project.status === "active"
              ? "bg-green-50 text-green-700 border border-green-200"
              : project.status === "draft"
              ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
              : "bg-gray-50 text-gray-700 border border-gray-200"
          }`}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      {/* Links */}
      <div className="flex gap-2 mb-4">
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
          >
            <EyeIcon className="h-3 w-3" />
            Demo
          </a>
        )}
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
          >
            <CodeBracketIcon className="h-3 w-3" />
            Code
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(project)}
          className="flex-1"
        >
          <PencilIcon className="h-3 w-3 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(Number(project.id))}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <TrashIcon className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
