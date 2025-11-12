"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FolderIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  PlusIcon,
  EyeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  projects: number;
  skills: number;
  messages: number;
  experiences: number;
}

const statsConfig = [
  {
    name: "Projects",
    key: "projects" as keyof DashboardStats,
    icon: FolderIcon,
    href: "/admin/projects",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Skills",
    key: "skills" as keyof DashboardStats,
    icon: ChartBarIcon,
    href: "/admin/skills",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Messages",
    key: "messages" as keyof DashboardStats,
    icon: ChatBubbleLeftRightIcon,
    href: "/admin/messages",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Experiences",
    key: "experiences" as keyof DashboardStats,
    icon: UserIcon,
    href: "/admin/about",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
] as const;

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    messages: 0,
    experiences: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);

      const [projectsRes, skillsRes, messagesRes, experiencesRes] =
        await Promise.all([
          fetch("/api/portfolio/projects"),
          fetch("/api/portfolio/skills").catch(() => null),
          fetch("/api/messages").catch(() => null),
          fetch("/api/admin/experiences").catch(() => null),
        ]);

      const results = await Promise.allSettled([
        projectsRes?.ok ? projectsRes.json() : Promise.resolve([]),
        skillsRes?.ok ? skillsRes.json() : Promise.resolve([]),
        messagesRes?.ok ? messagesRes.json() : Promise.resolve([]),
        experiencesRes?.ok ? experiencesRes.json() : Promise.resolve([]),
      ]);

      setStats({
        projects:
          results[0].status === "fulfilled" ? results[0].value.length || 0 : 0,
        skills:
          results[1].status === "fulfilled" ? results[1].value.length || 0 : 0,
        messages:
          results[2].status === "fulfilled" ? results[2].value.length || 0 : 0,
        experiences:
          results[3].status === "fulfilled" ? results[3].value.length || 0 : 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/admin");
          return;
        }
        await fetchStats();
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router, fetchStats]);

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
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Overview of your portfolio content and activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stats[stat.key]}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={stat.href}>
                    <Button variant="outline" size="sm" className="w-full">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View {stat.name}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/admin/hero">
              <Button variant="outline" className="w-full" size="lg">
                <UserIcon className="h-4 w-4 mr-2" />
                Edit Hero
              </Button>
            </Link>
            <Link href="/admin/projects">
              <Button className="w-full" size="lg">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </Link>
            <Link href="/admin/skills">
              <Button variant="outline" className="w-full" size="lg">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </Link>
            <Link href="/admin/about">
              <Button variant="outline" className="w-full" size="lg">
                <UserIcon className="h-4 w-4 mr-2" />
                Edit About
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full" size="lg">
                <Cog6ToothIcon className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            System Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm font-medium text-green-800">
                Database Connection
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm font-medium text-blue-800">
                API Status
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="text-sm font-medium text-purple-800">
                Content Updated
              </span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                Today
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
}
