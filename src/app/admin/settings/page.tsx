"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";

interface SiteSettings {
  site_title?: string;
  site_description?: string;
  site_keywords?: string;
  google_analytics_id?: string;
  maintenance_mode?: string;
}

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue, watch } = useForm<SiteSettings>();
  const maintenanceMode = watch("maintenance_mode");

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        const authResponse = await fetch("/api/auth/me");
        if (!authResponse.ok) {
          router.push("/admin");
          return;
        }

        // Load existing settings
        const settingsResponse = await fetch("/api/admin/settings");
        if (settingsResponse.ok) {
          const settings = await settingsResponse.json();

          // Convert array of settings to object
          const settingsObj: SiteSettings = {};
          settings.forEach((setting: { key: string; value: string }) => {
            settingsObj[setting.key as keyof SiteSettings] = setting.value;
          });

          Object.keys(settingsObj).forEach((key) => {
            setValue(
              key as keyof SiteSettings,
              settingsObj[key as keyof SiteSettings]
            );
          });
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [router, setValue]);

  const onSubmit = async (data: SiteSettings) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

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
      <div className="p-6 max-w-4xl mx-auto">
        <div className="border-b border-border pb-6 mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Cog6ToothIcon className="h-8 w-8" />
            Site Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure your website settings and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* SEO Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              SEO Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="site_title"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Site Title
                </label>
                <input
                  id="site_title"
                  type="text"
                  {...register("site_title")}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your Portfolio"
                />
              </div>

              <div>
                <label
                  htmlFor="site_description"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Site Description
                </label>
                <textarea
                  id="site_description"
                  rows={3}
                  {...register("site_description")}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Brief description of your portfolio website"
                />
              </div>

              <div>
                <label
                  htmlFor="site_keywords"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  SEO Keywords
                </label>
                <input
                  id="site_keywords"
                  type="text"
                  {...register("site_keywords")}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="developer, portfolio, web development"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate keywords with commas
                </p>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Analytics
            </h2>

            <div>
              <label
                htmlFor="google_analytics_id"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Google Analytics ID
              </label>
              <input
                id="google_analytics_id"
                type="text"
                {...register("google_analytics_id")}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="GA-XXXXXXXXX-X"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Optional: Add your Google Analytics tracking ID
              </p>
            </div>
          </div>

          {/* Site Maintenance */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Site Maintenance
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Maintenance Mode
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      {...register("maintenance_mode")}
                      value="false"
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Disabled - Site is live</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      {...register("maintenance_mode")}
                      value="true"
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm">
                      Enabled - Show maintenance page
                    </span>
                  </label>
                </div>

                {maintenanceMode === "true" && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Warning:</strong> When maintenance mode is
                          enabled, visitors will see a maintenance page instead
                          of your portfolio.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </div>
    </AdminSidebar>
  );
}
